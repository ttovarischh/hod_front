import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import styled from "styled-components/native";
import axios from "axios";
import { FlexBox, HeaderText, TitleText } from "../../common";
import Error from "../Errors/Error";
import { StackActions } from "@react-navigation/native";
import A_QrCode from "../../components/A_QrCode";
import A_Icon from "../../components/A_Icon";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import AsyncStorage from "@react-native-async-storage/async-storage";
import A_Loader from "../../components/A_Loader";
import A_Header from "../../components/A_Header";
import O_Card from "../../components/O_Card";
import O_BottomSheet from "../../components/O_BottomSheet";
import { apiUrl } from "../const";
import A_Input from "../../components/A_Input";
import A_Button from "../../components/A_Button";

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

const SingleGameWrapper = styled.View`
  background-color: ${({ theme }) => theme.appBg};
  height: 100%;
  color: white;
`;

const GameButton = styled.TouchableOpacity`
  display: flex;
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

const CardWrapper = styled(FlexBox)`
  background-color: ${({ theme }) => theme.card.bg};
  width: 100%;
  margin-bottom: 8px;
  border-radius: 20px;
  padding: 15px;
`;

const PlayersWrapper = styled(FlexBox)`
  background-color: #151516;
  border-radius: 12px;
  padding: 14px;
  width: 100%;
`;

export default function SingleGameScreen(props: {
  route: any;
  navigation: any;
}) {
  // constants_and_states
  const { route, navigation } = props;
  const params = route.params || {};
  const { code = {} } = params;
  const [isInc, setIsInc] = useState(false);
  const [authData, setAuthData] = useState<UserProps>();
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
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = React.useState<any>([]);
  const [initiative, setInitiative] = useState("");

  const newNew = () => {
    const new_array = data.players.sort(
      (a: any, b: any) => b.initiative - a.initiative
    );
    console.log(new_array);
    return new_array.map((player: any, i: any) => {
      let langs: any[] = [];
      if (player.language) {
        langs = player.language.split(" ");
      }
      return (
        <O_Card
          type={(data.user_id = authData?.id ? "user" : "master")}
          avatar={player.imagestring}
          name={player.name}
          username={player.username}
          inv={player.inv}
          ins={player.ins}
          perc={player.perc}
          onCardPress={() => navigation.push("PlayerConc", { player: player })}
          condition={data.fight}
          handleInitiativeChange={(int: any) => {
            setInitiative(int);
            console.log("UR INITIATIVE" + initiative);
          }}
          initiative={initiative}
          initiativeVal={player.initiative}
        >
          {langs &&
            langs.map((sublang: any) => (
              <FlexBox offsetRight="8">
                <View style={styles.tag}>
                  <Text style={{ fontSize: 18, color: "#EDF2DC" }}>
                    {sublang}
                  </Text>
                </View>
              </FlexBox>
            ))}
        </O_Card>
      );
    });
  };

  const list = () => {
    return data.players?.map((player: any, i: any) => {
      let langs: any[] = [];
      if (player.language) {
        langs = player.language.split(" ");
      }
      return (
        <O_Card
          type={(data.user_id = authData?.id ? "user" : "master")}
          avatar={player.imagestring}
          name={player.name}
          username={player.username}
          inv={player.inv}
          ins={player.ins}
          perc={player.perc}
          onCardPress={() => navigation.push("PlayerConc", { player: player })}
          condition={data.fight}
          handleInitiativeChange={(int: any) => {
            setInitiative(int);
            console.log("UR INITIATIVE" + initiative);
          }}
          initiative={initiative}
          initiativeVal={player.initiative}
        >
          {langs &&
            langs.map((sublang: any) => (
              <FlexBox offsetRight="8">
                <View style={styles.tag}>
                  <Text style={{ fontSize: 18, color: "#EDF2DC" }}>
                    {sublang}
                  </Text>
                </View>
              </FlexBox>
            ))}
        </O_Card>
      );
    });
  };

  // bottomsheet_related
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["23%", "92%"], []);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleCloseModalPress = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);

  // main_functions
  const handleInc = () => {
    setIsInc(true);
  };

  async function loadStorageData(): Promise<void> {
    try {
      const authDataSerialized = await AsyncStorage.getItem("@AuthData");
      if (authDataSerialized != null) {
        const _authData = JSON.parse(authDataSerialized);
        // console.log("This is ur storage Polina");
        // console.log(_authData);
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
        // console.log(JSON.stringify(data));
        if (data != null) {
          setData(data);
        }
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const getUpdatedInfo = () => {
    axios
      .get(`http://localhost:3000/api/v1/games/${code}`)
      .then(({ data }) => {
        // console.log(JSON.stringify(data));
        if (data != null) {
          setData(data);
        }
      })
      .catch((error) => console.error(error))
      .finally(() => {
        console.log("Updated");
      });
  };

  const handleConcClick = () => {
    if (data.fight) {
      axios
        .patch("http://localhost:3000/api/v1/games/HV534", {
          game: {
            fight: false,
          },
        })
        .then((response) => {
          // Code
        })
        .catch((error) => console.error(error))
        .finally(() => {
          getUpdatedInfo();
        });
    } else {
      axios
        .patch("http://localhost:3000/api/v1/games/HV534", {
          game: {
            fight: true,
          },
        })
        .then((response) => {
          // Code
        })
        .catch((error) => console.error(error))
        .finally(() => {
          getUpdatedInfo();
        });
    }
  };

  return (
    <>
      {isLoading ? (
        <A_Loader />
      ) : (
        <>
          <A_Header
            left="Выйти"
            center="Сессия"
            right={code}
            handleLeftPress={() => navigation.goBack()}
            handleRightPress={handlePresentModalPress}
          />
          {
            (data.user_id = authData?.id && (
              <View style={styles.bottomPart}>
                <FlexBox
                  style={{
                    paddingLeft: 12,
                    paddingRight: 12,
                  }}
                >
                  {data.fight && (
                    <GameButton onPress={() => console.log("Plus clicked")}>
                      <FlexBox
                        style={{
                          height: "100%",
                          width: "100%",
                          alignContent: "center",
                        }}
                        alignItems="center"
                        justifyContent="center"
                      >
                        <A_Icon iconName="plusBig" />
                      </FlexBox>
                    </GameButton>
                  )}
                  <GameButton onPress={handleConcClick}>
                    <FlexBox
                      style={{
                        height: "100%",
                        width: "100%",
                        alignContent: "center",
                      }}
                      alignItems="center"
                      justifyContent="center"
                    >
                      <A_Icon
                        iconName="clock"
                        fill={data.fight ? "yellow" : "white"}
                      ></A_Icon>
                    </FlexBox>
                  </GameButton>
                  {data.fight && (
                    <GameButton onPress={() => console.log("Arrow clicked")}>
                      <FlexBox
                        style={{
                          height: "100%",
                          width: "100%",
                          alignContent: "center",
                        }}
                        alignItems="center"
                        justifyContent="center"
                      >
                        <A_Icon iconName="arrow" />
                      </FlexBox>
                    </GameButton>
                  )}
                </FlexBox>
              </View>
            ))
          }
          <SingleGameWrapper>
            <ScrollView>
              {data.id ? (
                <>
                  {data.fight ? newNew() : list()}
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
                  <A_Button
                    handleButtonClick={() => console.log("Hello, world")}
                    offsetBottom={250}
                  >
                    Завершить игру
                  </A_Button>
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
            <O_BottomSheet
              mainHeader="Пригласить друзей"
              subHeader="Покажи этот QR-код своим друзьям, чтобы они могли присоединиться к игре, или воспользуйтесь кодом сессии"
              ref={bottomSheetModalRef}
              index={1}
              snapPoints={snapPoints}
              handleButtonClick={handleCloseModalPress}
            >
              <QrWrapper style={{ width: "100%" }}>
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
            </O_BottomSheet>
          </SingleGameWrapper>
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
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
  bottomPart: {
    position: "absolute",
    width: "100%",
    backgroundColor: "transparent",
    height: 116,
    bottom: 0,
    zIndex: 10000,
  },
});
