import React, { useState, useEffect, useContext } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  Button,
} from "react-native";
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
  NoteText,
  NavBarText,
} from "../../common";
import Svg, { Path } from "react-native-svg";
import { TouchableOpacity } from "react-native";
import { Item } from "react-native-paper/lib/typescript/components/List/List";
import Error from "../Errors/Error";
import { StackActions } from "@react-navigation/native";
import { NavigationContext } from "@react-navigation/native";
import O_GameFooter from "../../components/O_GameFooter";
import A_Button from "../../components/A_Button";
import A_QrCode from "../../components/A_QrCode";
import { Card } from "react-native-paper";
import A_Icon from "../../components/A_Icon";
// import BottomSheet from "@gorhom/bottom-sheet";
import { useRef, useMemo, useCallback } from "react";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { getItem } from "../../contexts/async-storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TextInput } from "react-native";
import { apiUrl } from "../const";
import A_Loader from "../../components/A_Loader";
import { NavText } from "../../common";
import A_Header from "../../components/A_Header";
import { BlurView } from "expo-blur";

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
  // min-height: 57px;
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
  // padding-top: 70px;
`;

const CustomHeaderWrapper = styled(FlexBox)`
  background-color: black;
  height: 108px;
  color: white;
  width: 100%;
  justify-content: flex-end;
`;

const CustomHeaderInnerWrapper = styled(FlexBox)`
  height: 60px;
  width: 100%;
  color: blue;
  direction: row;
  justify-content: space-between;
  align-items: baseline;
  align-content: center;
  padding-left: 12px;
  padding-right: 12px;
`;

const BottomSheetButton = styled.TouchableOpacity`
  background-color: #f0ff00;
  width: 100%;
  height: 125px;
  border-radius: 20px;
`;

const SingleEffectHeaderWrapper = styled(FlexBox)`
  position: relative;
  width: 100%;
  height: 350px;
  padding: 13px 13px 19px 13px;
`;

const Middle = styled(FlexBox)`
  flex-wrap: no-wrap;
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

const BackButton = styled.TouchableOpacity`
  width: 50px;
  height: 50px;
  background: #cfcfcf;
  border-radius: 100%;
  padding-right: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DescrWrapper = styled(FlexBox)`
  position: relative;
  width: 100%;
  height: 100%;
  background: #cfcfcf;
  padding: 20px 13px 19px 13px;
  border-top-right-radius: 12px;
  border-top-left-radius: 12px;
`;

const Img = styled.Image`
  position: absolute;
  opacity: 0.5;
  width: 100%;
  height: 400px;
  min-width: 390px;
  border-top-right-radius: 12px;
  border-top-left-radius: 12px;
`;

const ModalBlur = styled(FlexBox)`
  position: absolute;
  background: rgba(31, 31, 31, 0.5);
  // opacity: 0.8;
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
  background-color: ${({ theme }) => theme.bottomBar.bg};
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
        <SmallText style={{ textAlign: "center", marginBottom: 48 }}>
          Код присоединения
        </SmallText>
        <A_QrCode value={value} getRef={(c: any) => setProductQRref(c)} />
        <HeaderText style={{ marginTop: 20, marginBottom: 40 }}>
          {code}
        </HeaderText>
        <A_Button solid disabled={false} handleButtonClick={handleCloseCLick}>
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

  // {data.players?.map((player: any, i: any) => (

  const list = () => {
    return data.players?.map((player: any, i: any) => {
      let langs = player.language.split(" ");
      return (
        <CardWrapper direction="column">
          <UpperRow justifyContent="space-between" offsetBottom="6">
            <LittleText>{player.name}</LittleText>
            <Breadcrumb>nadyakit</Breadcrumb>
          </UpperRow>
          <CardRow>
            <LittleText>Состояния</LittleText>
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
              <BigText>{player.inv}</BigText>
            </CifWrapper>
            <CifWrapper justifyContent="center">
              <FlexBox offsetRight="8">
                <A_Icon iconName="eye" fill="#EDF2DC" />
              </FlexBox>
              <BigText>{player.ins}</BigText>
            </CifWrapper>
            <CifWrapper justifyContent="center">
              <FlexBox offsetRight="8">
                <A_Icon iconName="eye" fill="#EDF2DC" />
              </FlexBox>
              <BigText>{player.perc}</BigText>
            </CifWrapper>
          </FlexBox>
          <CardRow>
            <LittleText>Языки</LittleText>
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
              <A_Icon iconName="clock" fill="white"></A_Icon>
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
                          <TitleText style={{ color: "#B04141" }}>
                            {monster.name}
                          </TitleText>
                          <PlayersWrapper
                            offsetBottom="15"
                            offsetTop="14"
                            justifyContent="center"
                          >
                            <FlexBox
                              justifyContent="center"
                              alignItems="center"
                            >
                              <A_Icon iconName="heart" fill="white" />
                              <HeaderText style={{ marginLeft: 8 }}>
                                {monster.hp}
                              </HeaderText>
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
                  <HeaderText style={{ textAlign: "center" }}>
                    Пригласить друзей
                  </HeaderText>
                  <NavBarText
                    style={{
                      textAlign: "center",
                      color: "#545454",
                      marginTop: 18,
                    }}
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
                    <HeaderText
                      style={{ textAlign: "center", marginBottom: 16 }}
                    >
                      {code}
                    </HeaderText>
                    <A_QrCode
                      value={value}
                      getRef={(c: any) => setProductQRref(c)}
                    />
                  </CodeQrWrapper>
                </QrWrapper>
                <BottomSheetButton onPress={handleCloseModalPress}>
                  <HeaderText
                    style={{
                      fontSize: 24,
                      textAlign: "center",
                      color: "#000000",
                      lineHeight: 125,
                    }}
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
    // backgroundColor: "1C1C1E",
  },
  // contentContainer: {
  //   flex: 1,
  //   alignItems: "center",
  // },
  bs: {
    backgroundColor: "red",
    // borderTopLeftRadius: 20,
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
    position: 'absolute',
    width: "100%",
    backgroundColor: "transparent",
    height: 116,
    bottom: 0,
    zIndex: 10000,
  },
  blurContainer: {
    width: 130,
    height: 68,
    borderRadius: 50,
    // backgroundColor: "#313131",
    // opacity: 0.8,
    marginLeft: "auto",
    marginRight: "auto",
  }
});

export default SingleGameScreen;
