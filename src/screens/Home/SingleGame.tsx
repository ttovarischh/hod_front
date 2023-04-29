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
import { FlexBox, B_Text, D_Text } from "../../common";
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
import M_Card from "../../components/Molecules/M_Card";

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

export default function SingleGameScreen(props: {
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
  const [initiative, setInitiative] = useState("");
  const { user } = useAuth();
  const [playerEffects, setPlayerEffects] = useState({});
  const [monsterEffects, setMonsterEffects] = useState({});
  const [newInitiative, setNewInitiative] = useState<any>([]);

  const list = () => {
    return data.players?.map((player: any, i: any) => {
      let langs: any[] = [];
      if (player.language) {
        langs = player.language.split(" ");
      }
      return (
        <O_Card
          type={data.fight ? "Initiative" : "noInitiative"}
          avatar={player.imagestring}
          name={player.name}
          player_id={player.id}
          username={player.username}
          inv={player.inv}
          ins={player.ins}
          perc={player.perc}
          onCardPress={() => navigation.push("PlayerConc", { player: player })}
          condition={data.fight}
          thisUser={data.user_id}
          author={user?.id}
          master={user?.id === data.user_id}
          handleInitiativeChange={(text: any) => {
            setNewInitiative(text);
            console.log("UR INITIATIVE" + newInitiative);
          }}
          initiative={initiative}
          initiativeVal={player.initiative}
          data={effectsData}
          code={code}
          playerEffects={playerEffects}
          fight={data.fight}
          onSubmitEditing={() => onSubmitInitiativeEditing(player.id)}
          newInitiative={newInitiative}
        >
          {langs &&
            langs.map((sublang: any) => (
              <FlexBox offsetRight="8" offsetBottom="8">
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

  const monsterList = () => {
    return data.monsters?.map((player: any, i: any) => {
      return (
        <O_Card
          type="monster"
          avatar={player.imagestring}
          name={player.name}
          monster_id={player.id}
          username={player.username}
          inv={player.inv}
          ins={player.ins}
          perc={player.perc}
          onCardPress={() => navigation.push("PlayerConc", { player: player })}
          condition={data.fight}
          thisUser={data.user_id}
          author={user?.id}
          master={user?.id === data.user_id}
          handleInitiativeChange={(event: any) => {
            setNewInitiative(event.value);
            console.log("UR INITIATIVE" + newInitiative);
          }}
          initiative={initiative}
          initiativeVal={player.initiative}
          hp={player.hp}
          arm={player.initiative}
          data={effectsData}
          code={code}
          monsterEffects={monsterEffects}
        ></O_Card>
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

  const onSubmitInitiativeEditing = (playerId: any) => {
    console.log(playerId);
    console.log(newInitiative);
    axios
      .patch(`http://localhost:3000/api/v1/games/${code}/players/${playerId}`, {
        player: {
          initiative: newInitiative,
        },
      })
      .then((response) => {
        setNewInitiative(null);
      })
      .catch((error) => console.error(error))
      .finally(() => {
        getUpdatedInfo();
      });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/v1/games/${code}`)
      .then(({ data }) => {
        // console.log(JSON.stringify(data));
        if (data != null) {
          setData(data);
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
        // console.log(JSON.stringify(data));
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

    return () => {
      subscription.unsubscribe();
      monsterSubscription.unsubscribe();
    };
  }, []);

  const getUpdatedInfo = () => {
    axios
      .get(`http://localhost:3000/api/v1/games/${code}`)
      .then(({ data }) => {
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
        .patch(`http://localhost:3000/api/v1/games/${code}`, {
          game: {
            fight: false,
          },
        })
        .then((response) => {
          // setIsInc(false);
        })
        .catch((error) => console.error(error))
        .finally(() => {
          getUpdatedInfo();
        });
    } else {
      axios
        .patch(`http://localhost:3000/api/v1/games/${code}`, {
          game: {
            fight: true,
          },
        })
        .then((response) => {
          // setIsInc(true);
        })
        .catch((error) => console.error(error))
        .finally(() => {
          getUpdatedInfo();
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

  return (
    <>
      <O_Header
        left="Выйти"
        center="Сессия"
        right={code}
        handleLeftPress={() => navigation.goBack()}
        handleRightPress={handlePresentModalPress}
        turn={data.fight ? `${data.turn} раунд` : ""}
      />
      {data.user_id === user?.id && (
        <O_GameFooter
          fight={data.fight}
          handleConcClick={handleConcClick}
          handleNextClick={() =>
            navigation.push("CreateMonsters", { code: code })
          }
        />
      )}
      <SingleGameWrapper>
        <ScrollView>
          <>
            {list()}
            {monsterList()}
            <FlexBox style={{ height: 250 }}></FlexBox>
          </>
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
                <B_Text>{code}</B_Text>
              </FlexBox>
              <A_QrCode value={value} getRef={(c: any) => setProductQRref(c)} />
            </CodeQrWrapper>
          </QrWrapper>
        </O_BottomSheet>
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
