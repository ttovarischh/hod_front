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
import { FlexBox, B_Text } from "../../common";
import Error from "../Errors/Error";
import { StackActions } from "@react-navigation/native";
import A_QrCode from "../../components/Atoms/A_QrCode";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import A_Loader from "../../components/Atoms/A_Loader";
import O_Header from "../../components/Organisms/O_Header";
import O_Card from "../../components/Organisms/O_Card";
import O_BottomSheet from "../../components/Organisms/O_BottomSheet";
import useAuth from "../../contexts/newAuthContext/useAuth";
import { consumer } from "../../constants";
import O_GameFooter from "../../components/Organisms/O_GameFooter";
import { useTranslation } from "react-i18next";

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

export default function FullInitiativeScreen(props: {
  route: any;
  navigation: any;
}) {
  // constants_and_states
  const { route, navigation } = props;
  const params = route.params || {};
  const { code = {} } = params;
  const value = `http://localhost:3000/api/v1/games/${code}`;
  const [productQRref, setProductQRref] = useState();
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = React.useState<any>([]);
  const [effectsData, setEffectsData] = React.useState<any>([]);
  const { user } = useAuth();
  const [playerEffects, setPlayerEffects] = useState({});
  const [monsterEffects, setMonsterEffects] = useState({});
  const { t } = useTranslation();
  const [sortedList, setSortedList] = useState<any>([]);
  const [activePlayerIndex, setActivePlayerIndex] = useState<null | number>(
    null
  );
  const scrollViewRef = useRef<ScrollView>(null);
  const activePlayerRef = useRef<View>(null);

  const mixedList = () => {
    return sortedList.map((item: any, i: any) => {
      if (item.armor) {
        return (
          <FlexBox
            style={{
              opacity: item.active ? 1 : 0.6,
              transform: [{ scale: item.active ? 1 : 0.94 }],
              marginBottom: item.active ? -6 : -13,
              marginTop: item.active ? 6 : 0,
            }}
            ref={i === activePlayerIndex ? activePlayerRef : null}
          >
            <O_Card
              type="monster"
              avatar={item.imagestring}
              name={item.name}
              monster_id={item.id}
              username={item.username}
              inv={item.inv}
              ins={item.ins}
              perc={item.perc}
              condition={data.fight}
              thisUser={data.user_id}
              author={user?.id}
              master={user?.id === data.user_id}
              initiativeVal={item.initiative}
              hp={item.hp}
              arm={item.initiative}
              data={effectsData}
              code={code}
              monsterEffects={monsterEffects}
            />
          </FlexBox>
        );
      } else {
        let langs = [];
        if (item.language) {
          langs = item.language.split(" ");
        }
        return (
          <FlexBox
            style={{
              opacity: item.active ? 1 : 0.6,
              transform: [{ scale: item.active ? 1 : 0.94 }],
              marginBottom: item.active ? -6 : -13,
              marginTop: item.active ? 6 : 0,
            }}
            ref={i === activePlayerIndex ? activePlayerRef : null}
          >
            <O_Card
              type="noInitiative"
              fullinit
              avatar={item.imagestring}
              name={item.name}
              player_id={item.id}
              username={item.username}
              inv={item.inv}
              ins={item.ins}
              perc={item.perc}
              condition={data.fight}
              thisUser={data.user_id}
              author={user?.id}
              master={user?.id === data.user_id}
              initiativeVal={item.initiative}
              data={effectsData}
              code={code}
              playerEffects={playerEffects}
              fight={data.fight}
            >
              {langs.map((sublang: any) => (
                <FlexBox offsetRight="8" offsetBottom="8">
                  <View style={styles.tag}>
                    <Text style={{ fontSize: 18, color: "#EDF2DC" }}>
                      {sublang}
                    </Text>
                  </View>
                </FlexBox>
              ))}
            </O_Card>
          </FlexBox>
        );
      }
    });
  };

  // bottomsheet_related
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const bottomSheetModalRef2 = useRef<BottomSheetModal>(null);
  const bottomSheetModalRef3 = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["23%", "93%"], []);
  const snapPoints2 = useMemo(() => ["23%", "93%"], []);
  const snapPoints3 = useMemo(() => ["23%", "93%"], []);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleCloseModalPress = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);
  const handlePresentModalPress2 = useCallback(() => {
    bottomSheetModalRef2.current?.present();
  }, []);
  const handleCloseModalPress2 = useCallback(() => {
    bottomSheetModalRef2.current?.close();
  }, []);
  const handlePresentModalPress3 = useCallback(() => {
    bottomSheetModalRef3.current?.present();
  }, []);
  const handleCloseModalPress3 = useCallback(() => {
    bottomSheetModalRef3.current?.close();
  }, []);

  const scrollToActivePlayer = () => {
    if (scrollViewRef.current && activePlayerRef.current) {
      activePlayerRef.current.measure((x, y, width, height, pageX, pageY) => {
        // @ts-ignore
        scrollViewRef.current.scrollTo({ y: pageY, animated: true });
      });
    }
  };

  const handleFinishGame = () => {
    axios
      .patch(`http://localhost:3000/api/v1/games/${code}`, {
        game: {
          active: false,
        },
      })
      .then((response) => {})
      .catch((error) => console.error(error))
      .finally(() => {});
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/v1/games/${code}`)
      .then(({ data }) => {
        if (data != null) {
          setData(data);
          const players = data.players || [];
          const monsters = data.monsters || [];
          const combinedList = [...players, ...monsters];
          const sortedList = combinedList.sort(
            (a, b) => b.initiative - a.initiative
          );
          setSortedList(sortedList);

          const activeIndex = sortedList.findIndex(
            (item) => item.active === true
          );
          if (activeIndex >= 0) {
            setActivePlayerIndex(activeIndex);
          } else {
            const firstItem = sortedList[0];
            const patchUrl = firstItem.armor
              ? `http://localhost:3000/api/v1/games/${code}/monsters/${firstItem.id}`
              : `http://localhost:3000/api/v1/games/${code}/players/${firstItem.id}`;
            axios
              .patch(patchUrl, {
                [firstItem.armor ? "monster" : "player"]: {
                  active: true,
                },
              })
              .then((response) => {
                console.log(response);
              })
              .catch((error) => console.error(error))
              .finally(() => {
                setActivePlayerIndex(0);
              });
          }
          //
          const playerEffectsObject = data.players.reduce(
            (acc: any, player: any) => {
              acc[player.id] = player.effects;
              return acc;
            },
            {}
          );
          setPlayerEffects(playerEffectsObject);
          const monsterEffectsObject = data.monsters.reduce(
            (acc: any, monster: any) => {
              acc[monster.id] = monster.effects;
              return acc;
            },
            {}
          );
          setMonsterEffects(monsterEffectsObject);
        }
      })
      .catch((error) => console.error(error))
      .finally(() => {});
    axios
      .get(`http://localhost:3000/api/v1/effects`)
      .then(({ data }) => {
        if (data != null) {
          setEffectsData(data);
        }
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      });
    const subscription = consumer.subscriptions.create(
      { channel: "PlayereffectsChannel" },
      {
        received(data: any) {
          const { type, payload } = data;
          if (type === "ADD_EFFECT") {
            const { player_id, effect } = payload;
            setPlayerEffects((prevState: any) => {
              return {
                ...prevState,
                [player_id]: [...prevState[player_id], effect],
              };
            });
          } else if (type === "REMOVE_EFFECT") {
            const { player_id, effect } = payload;
            setPlayerEffects((prevState: any) => {
              const updatedPlayerEffects = prevState[player_id].filter(
                (e: any) => e.id !== effect.id
              );
              return {
                ...prevState,
                [player_id]: updatedPlayerEffects,
              };
            });
          }
        },
      }
    );
    const monsterSubscription = consumer.subscriptions.create(
      { channel: "MonsterEffectsChannel" },
      {
        received(data: any) {
          const { type, payload } = data;
          if (type === "ADD_EFFECT") {
            const { monster_id, effect } = payload;
            setMonsterEffects((prevState: any) => {
              return {
                ...prevState,
                [monster_id]: [...prevState[monster_id], effect],
              };
            });
          } else if (type === "REMOVE_EFFECT") {
            const { monster_id, effect } = payload;
            setMonsterEffects((prevState: any) => {
              const updatedPlayerEffects = prevState[monster_id].filter(
                (e: any) => e.id !== effect.id
              );
              return {
                ...prevState,
                [monster_id]: updatedPlayerEffects,
              };
            });
          }
        },
      }
    );
    const gameSubscription = consumer.subscriptions.create(
      { channel: "GamesChannel" },
      {
        received(data: any) {
          if (data.code === code) {
            setData(data);
            const players = data.players || [];
            const monsters = data.monsters || [];
            const combinedList = [...players, ...monsters];
            const sortedList = combinedList.sort(
              (a, b) => b.initiative - a.initiative
            );
            setSortedList(sortedList);

            const activeIndex = sortedList.findIndex(
              (item) => item.active === true
            );
            if (activeIndex >= 0) {
              setActivePlayerIndex(activeIndex);
            }
          }
        },
      }
    );
    return () => {
      subscription.unsubscribe();
      monsterSubscription.unsubscribe();
      gameSubscription.unsubscribe();
    };
  }, []);

  const handleNextPlayer = () => {
    const activePlayer = sortedList[activePlayerIndex!];
    let nextPlayerIndex = activePlayerIndex! + 1;
    if (nextPlayerIndex >= sortedList.length) {
      nextPlayerIndex = 0;
    }
    const nextPlayer = sortedList[nextPlayerIndex];
    let url = `http://localhost:3000/api/v1/games/${code}/players/${activePlayer.id}`;
    if (activePlayer.armor) {
      url = `http://localhost:3000/api/v1/games/${code}/monsters/${activePlayer.id}`;
    }
    axios
      .patch(url, {
        [activePlayer.armor ? "monster" : "player"]: {
          active: false,
        },
      })
      .then((response1) => {
        console.log(response1);
        let url = `http://localhost:3000/api/v1/games/${code}/players/${nextPlayer.id}`;
        if (nextPlayer.armor) {
          url = `http://localhost:3000/api/v1/games/${code}/monsters/${nextPlayer.id}`;
        }
        axios
          .patch(url, {
            [nextPlayer.armor ? "monster" : "player"]: {
              active: true,
            },
          })
          .then((response2) => {
            console.log(response2);
            setActivePlayerIndex(nextPlayerIndex);
            if (
              nextPlayerIndex === 0 &&
              activePlayerIndex === sortedList.length - 1
            ) {
              axios
                .patch(`http://localhost:3000/api/v1/games/${code}`, {
                  game: {
                    turn: data.turn + 1,
                  },
                })
                .then((response3) => {
                  console.log(response3);
                })
                .catch((error) => {
                  console.error(error);
                });
            }
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    if (data.turn < 1) {
      axios
        .patch(`http://localhost:3000/api/v1/games/${code}`, {
          game: {
            turn: 1,
          },
        })
        .then((response) => {})
        .catch((error) => console.error(error))
        .finally(() => {});
    }
  }, [data]);

  useEffect(() => {
    scrollToActivePlayer();
  }, [isLoading]);

  const handleConcClick = () => {
    if (data.fight) {
      axios
        .patch(`http://localhost:3000/api/v1/games/${code}`, {
          game: {
            fight: false,
          },
        })
        .then((response) => {})
        .catch((error) => console.error(error))
        .finally(() => {
          navigation.push("SGame", { code: code });
        });
    } else {
      axios
        .patch(`http://localhost:3000/api/v1/games/${code}`, {
          game: {
            fight: true,
          },
        })
        .then((response) => {})
        .catch((error) => console.error(error))
        .finally(() => {
          navigation.push("SGame", { code: code });
        });
    }
  };

  if (isLoading) {
    return <A_Loader />;
  }

  if (!data.id) {
    return (
      <Error
        errorid="404"
        handleButtonClick={() => navigation.dispatch(StackActions.popToTop())}
      ></Error>
    );
  }

  if (!data.active) {
    return (
      <Error
        errorid="505"
        handleButtonClick={() => navigation.dispatch(StackActions.popToTop())}
        code={code}
      ></Error>
    );
  }

  return (
    <>
      <O_Header
        left={t("common:leave")}
        center={`${t("common:session")} ${code}`}
        right={t("common:share")}
        handleLeftPress={handlePresentModalPress2}
        handleRightPress={handlePresentModalPress}
        turn={data.fight ? `${data.turn} ${t("common:round")}` : ""}
      />
      {data.user_id === user?.id && (
        <O_GameFooter
          fight={data.fight}
          handleConcClick={handlePresentModalPress3}
          handleNextClick={handleNextPlayer}
          plusDisabled={true}
          prevEnabled={true}
        />
      )}
      <SingleGameWrapper>
        <ScrollView ref={scrollViewRef} style={{ height: "auto" }}>
          <>
            {mixedList()}
            <FlexBox style={{ height: 250 }}></FlexBox>
          </>
        </ScrollView>
        <O_BottomSheet
          mainHeader={t("common:invite")}
          subHeader={t("common:shareQr")}
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
                <B_Text>{code}</B_Text>
              </FlexBox>
              <A_QrCode value={value} getRef={(c: any) => setProductQRref(c)} />
            </CodeQrWrapper>
          </QrWrapper>
        </O_BottomSheet>
        <O_BottomSheet
          mainHeader={t("common:danger")}
          subHeader={t("common:uAreAbout")}
          ref={bottomSheetModalRef2}
          index={1}
          snapPoints={snapPoints2}
          handleButtonClick={handleCloseModalPress2}
          twoButtons={true}
          handleSecondButtonClick={handleFinishGame}
          b={t("common:finish")}
          a={t("common:cancel")}
        />
        <O_BottomSheet
          mainHeader={t("common:uSure")}
          subHeader={t("common:leavefight")}
          ref={bottomSheetModalRef3}
          index={1}
          snapPoints={snapPoints3}
          handleButtonClick={handleCloseModalPress3}
          twoButtons={true}
          handleSecondButtonClick={handleConcClick}
          b={t("common:finishInc")}
          a={t("common:cancel")}
        />
      </SingleGameWrapper>
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
