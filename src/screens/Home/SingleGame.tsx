import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import styled from "styled-components/native";
import axios from "axios";
import { Breadcrumb } from "../../common";
import { BigText } from "../../common";
import { LittleText } from "../../common";
import {
  FlexBox,
  HeaderText,
  TitleText,
  SmallText,
  NavBarText,
} from "../../common";
import Error from "../Errors/Error";
import { StackActions } from "@react-navigation/native";
import A_Button from "../../components/A_Button";
import A_QrCode from "../../components/A_QrCode";
import A_Icon from "../../components/A_Icon";
import { useRef, useMemo, useCallback } from "react";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import AsyncStorage from "@react-native-async-storage/async-storage";
import A_Loader from "../../components/A_Loader";
import A_Header from "../../components/A_Header";

const BottomSheetContentWrapper = styled(FlexBox)`
  width: 100%;
`;

const BottomSheetTextWrapper = styled(FlexBox)`
  justify-content: center;
`;

const CodeQrWrapper = styled(FlexBox)`
  width: 100%;
  align-items: center;
  align-content: center;
  margin-top: 6%;
`;

const QrWrapper = styled(FlexBox)`
  position: relative;
  width: 100%;
  height: 404px;
`;

const UpperRow = styled(FlexBox)`
  width: 100%;
`;

const CifWrapper = styled(FlexBox)`
  width: 100%;
  background: #0e0e0e;
  border-radius: 25px;
  flex: 1;
  padding-top: 10px;
  padding-bottom: 10px;
  align-content: center;
  align-items: center;
`;

const CardRow = styled(FlexBox)`
  width: 100%;
  background: #0e0e0e;
  border-radius: 20px;
  padding: 12px;
  flex-direction: column;
`;

const SingleGameWrapper = styled.View`
  background-color: ${({ theme }) => theme.appBg};
  height: 100%;
  color: white;
`;

const BottomSheetButton = styled.TouchableOpacity`
  background-color: #f0ff00;
  width: 100%;
  height: 125px;
  border-radius: 20px;
`;

const GameButton = styled(FlexBox)`
  width: 130px;
  height: 68px;
  border-radius: 50px;
  background: #313131;
  opacity: 0.9;
  margin-left: auto;
  justify-content: center;
  align-content: center;
  margin-right: auto;
`;

const ModalBlur = styled(FlexBox)`
  position: absolute;
  background: rgba(31, 31, 31, 0.5);
  width: 100%;
  height: 100%;
  z-index: 100;
`;

const QrModalWrapper = styled(FlexBox)`
  position: absolute;
  padding: 19px;
  padding-top: 12px;
  background: red;
  width: 60%;
  border-radius: 10px;
  background-color: blue;
`;

const CardWrapper = styled(FlexBox)`
  background-color: ${({ theme }) => theme.card.bg};
  width: 100%;
  margin-bottom: 8px;
  border-radius: 20px;
  padding: 15px;
`;

const PlayerWrapper = styled(FlexBox)`
  background-color: #edf2dc;
  border-radius: 20px;
  padding: 8px 20px 8px 20px;
  min-height: 34px;
  margin-right: 4px;
  margin-bottom: 4px;
`;

const PlayersWrapper = styled(FlexBox)`
  background-color: #151516;
  border-radius: 12px;
  padding: 14px;
  width: 100%;
`;

function M_QrModal(props: { code: any; handleCloseCLick(): any }) {
  const { code, handleCloseCLick } = props;
  const value = `http://localhost:3000/api/v1/games/${code}`;
  const [productQRref, setProductQRref] = useState();

  return (
    <ModalBlur justifyContent="center" alignItems="center">
      <QrModalWrapper
        direction="column"
        justifyContent="center"
        alignItems="center"
        style={styles.shadowProp}
      >
        <FlexBox style={{ marginBottom: 48 }}>
          <SmallText>Код присоединения</SmallText>
        </FlexBox>
        <A_QrCode value={value} getRef={(c: any) => setProductQRref(c)} />
        <FlexBox style={{ marginTop: 20, marginBottom: 40 }}>
          <HeaderText>{code}</HeaderText>
        </FlexBox>
        <A_Button bright disabled={false} handleButtonClick={handleCloseCLick}>
          Продолжить
        </A_Button>
      </QrModalWrapper>
    </ModalBlur>
  );
}

function SingleGameScreen(props: { route: any; navigation: any }) {
  const { route, navigation } = props;
  const params = route.params || {};
  const { code = {} } = params;
  const [isVisible, setIsVisible] = useState(false);
  const [isInc, setIsInc] = useState(false);
  const [authData, setAuthData] = useState<UserProps>();

  const [player, setPlayer] = useState({
    playerName: "",
    lang: "",
    ins: "",
    perc: "",
    inv: "",
  });

  type UserProps = {
    email: string;
    id: number;
    username: string;
    created_at: any;
    updated_at: any;
    jti: any;
  };

  const value = `http://localhost:3000/api/v1/games/${code}`;
  const [productQRref, setProductQRref] = useState();

  const handleInc = () => {
    setIsInc(true);
  };

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = React.useState<any>([]);

  interface IGame {
    name: any;
    id: any;
    code: any;
  }

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const snapPoints = useMemo(() => ["23%", "92%"], []);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleCloseModalPress = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  async function loadStorageData(): Promise<void> {
    try {
      const authDataSerialized = await AsyncStorage.getItem("@AuthData");
      if (authDataSerialized != null) {
        const _authData = JSON.parse(authDataSerialized);
        console.log("This is ur storage Polina");
        console.log(_authData);
        setAuthData(_authData);
      } else {
        // setAuthData(null);
      }
    } catch (error) {
    } finally {
    }
  }

  useEffect(() => {
    async function prepare() {
      await loadStorageData();
    }
    prepare();
    axios
      .get(`http://localhost:3000/api/v1/games/${code}`)
      .then(({ data }) => {
        console.log(JSON.stringify(data));
        if (data != null) {
          setData(data);
        }
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  const list = () => {
    return data.players?.map((player: any, i: any) => {
      let langs = player.language.split(" ");
      return (
        <CardWrapper direction="column">
          <UpperRow justifyContent="space-between" offsetBottom="6">
            <LittleText color="white">{player.name}</LittleText>
            <Breadcrumb color="white">
              {player.username ? player.username : "no username"}
            </Breadcrumb>
          </UpperRow>
          <CardRow>
            <LittleText color="white">Состояния</LittleText>
            <FlexBox direction="row" offsetTop="9">
              <PlayerWrapper offsetRight="6">
                <A_Icon fill="#1A1A1A" iconName="plus"></A_Icon>
              </PlayerWrapper>
            </FlexBox>
          </CardRow>
          <FlexBox>
            <CifWrapper justifyContent="center">
              <FlexBox offsetRight="8">
                <A_Icon iconName="eye" fill="#EDF2DC" />
              </FlexBox>
              <BigText color="white">{player.inv}</BigText>
            </CifWrapper>
            <CifWrapper justifyContent="center">
              <FlexBox offsetRight="8">
                <A_Icon iconName="eye" fill="#EDF2DC" />
              </FlexBox>
              <BigText color="white">{player.ins}</BigText>
            </CifWrapper>
            <CifWrapper justifyContent="center">
              <FlexBox offsetRight="8">
                <A_Icon iconName="eye" fill="#EDF2DC" />
              </FlexBox>
              <BigText color="white">{player.perc}</BigText>
            </CifWrapper>
          </FlexBox>
          <CardRow>
            <LittleText color="white">Языки</LittleText>
            <FlexBox offsetTop="9">
              {langs.map((sublang: any) => (
                <FlexBox offsetRight="8">
                  <View style={styles.tag}>
                    <Text style={{ fontSize: 18, color: "#EDF2DC" }}>
                      {sublang}
                    </Text>
                  </View>
                </FlexBox>
              ))}
            </FlexBox>
          </CardRow>
        </CardWrapper>
      );
    });
  };

  return (
    <BottomSheetModalProvider>
      {isLoading ? (
        <A_Loader />
      ) : (
        <>
          <A_Header
            left="Выйти"
            center="Сессия"
            right={code}
            handleRightPress={handlePresentModalPress}
          />
          <View style={styles.bottomPart}>
            <GameButton>
              <A_Icon iconName="clock"></A_Icon>
            </GameButton>
          </View>
          <SingleGameWrapper>
            <ScrollView>
              {data.id ? (
                <>
                  {list()}

                  {isInc && (
                    <>
                      {data.monsters?.map((monster: any, i: any) => (
                        <CardWrapper direction="column">
                          <TitleText color="#B04141">{monster.name}</TitleText>
                          <PlayersWrapper
                            offsetBottom="15"
                            offsetTop="14"
                            justifyContent="center"
                          >
                            <FlexBox
                              justifyContent="center"
                              alignItems="center"
                            >
                              <A_Icon iconName="heart" />
                              <FlexBox style={{ marginLeft: 8 }}>
                                <HeaderText>{monster.hp}</HeaderText>
                              </FlexBox>
                            </FlexBox>
                          </PlayersWrapper>
                        </CardWrapper>
                      ))}
                    </>
                  )}
                </>
              ) : (
                <Error
                  errorid="404"
                  handleButtonClick={() =>
                    navigation.dispatch(StackActions.popToTop())
                  }
                ></Error>
              )}
            </ScrollView>
            <BottomSheetModal
              ref={bottomSheetModalRef}
              index={1}
              snapPoints={snapPoints}
              handleComponent={() => (
                <View style={styles.closeLineContainer}>
                  <View style={styles.closeLine}></View>
                </View>
              )}
              backgroundComponent={() => (
                <View style={styles.contentContainer} />
              )}
            >
              <BottomSheetContentWrapper style={styles.container}>
                <BottomSheetTextWrapper>
                  <HeaderText>Пригласить друзей</HeaderText>
                  <NavBarText
                    // style={{
                    //   textAlign: "center",
                    //   color: "#545454",
                    //   marginTop: 18,
                    // }}
                  >
                    Покажи этот QR-код своим друзьям, чтобы они могли
                    присоединиться к игре, или воспользуйтесь кодом сессии
                  </NavBarText>
                </BottomSheetTextWrapper>
                <QrWrapper offsetTop="50" offsetBottom="64">
                  <View style={styles.bd1}></View>
                  <View style={styles.bd2}></View>
                  <View style={styles.bd3}></View>
                  <View style={styles.bd4}></View>
                  <CodeQrWrapper justifyContent="center" direction="column">
                    <FlexBox style={{ marginBottom: 16 }}>
                      <HeaderText>{code}</HeaderText>
                    </FlexBox>
                    <A_QrCode
                      value={value}
                      getRef={(c: any) => setProductQRref(c)}
                    />
                  </CodeQrWrapper>
                </QrWrapper>
                <BottomSheetButton onPress={handleCloseModalPress}>
                  <HeaderText
                  // style={{
                  //   fontSize: 24,
                  //   textAlign: "center",
                  //   color: "#000000",
                  //   lineHeight: 125,
                  // }}
                  >
                    Готово
                  </HeaderText>
                </BottomSheetButton>
              </BottomSheetContentWrapper>
            </BottomSheetModal>
          </SingleGameWrapper>
        </>
      )}
    </BottomSheetModalProvider>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 24,
  },
  tag: {
    flexDirection: "row",
    alignSelf: "flex-start",
    backgroundColor: "#383838",
    padding: 8,
    paddingLeft: 12,
    paddingRight: 12,
    borderRadius: 10,
    alignItems: "baseline",
  },
  shadowProp: {
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  container: {
    flex: 1,
    padding: 12,
  },
  bs: {
    backgroundColor: "red",
  },
  bd1: {
    borderLeftColor: "white",
    borderLeftWidth: 1.5,
    borderTopColor: "white",
    borderTopWidth: 1.5,
    height: 28,
    width: 28,
    position: "absolute",
  },
  bd2: {
    borderRightColor: "white",
    borderRightWidth: 1.5,
    borderTopColor: "white",
    borderTopWidth: 1.5,
    height: 28,
    width: 28,
    position: "absolute",
    right: 0,
  },
  bd3: {
    borderLeftColor: "white",
    borderLeftWidth: 1.5,
    borderBottomColor: "white",
    borderBottomWidth: 1.5,
    height: 28,
    width: 28,
    position: "absolute",
    bottom: 0,
  },
  bd4: {
    borderRightColor: "white",
    borderRightWidth: 1.5,
    borderBottomColor: "white",
    borderBottomWidth: 1.5,
    height: 28,
    width: 28,
    position: "absolute",
    bottom: 0,
    right: 0,
  },
  closeLineContainer: {
    alignSelf: "center",
  },
  closeLine: {
    width: 50,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#383838",
    marginTop: 9,
  },
  contentContainer: {
    ...StyleSheet.absoluteFillObject,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: "#1C1C1E",
  },
  bottomPart: {
    position: "absolute",
    width: "100%",
    backgroundColor: "transparent",
    height: 116,
    bottom: 0,
    zIndex: 10000,
  },
});

export default SingleGameScreen;
