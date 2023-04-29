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
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import AsyncStorage from "@react-native-async-storage/async-storage";
import A_Loader from "../../components/Atoms/A_Loader";
import O_Header from "../../components/Organisms/O_Header";
import O_Card from "../../components/Organisms/O_Card";
import O_BottomSheet from "../../components/Organisms/O_BottomSheet";
import useAuth from "../../contexts/newAuthContext/useAuth";
import { consumer } from "../../constants";
import M_Card from "../../components/Molecules/M_Card";
import A_Button from "../../components/Atoms/A_Button";

const SingleGameWrapper = styled.View`
  background-color: ${({ theme }) => theme.appBg};
  height: 100%;
  color: white;
`;

export default function CreateMonstersScreen(props: {
  route: any;
  navigation: any;
}) {
  // constants_and_states
  const { route, navigation } = props;
  const params = route.params || {};
  const { code = {} } = params;
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = React.useState<any>([]);
  const [effectsData, setEffectsData] = React.useState<any>([]);
  const [initiative, setInitiative] = useState("");
  const { user } = useAuth();
  const [playerEffects, setPlayerEffects] = useState({});
  const [empty, setEmpty] = useState(false);
  const [initialState, setInitialState] = useState({
    playerName: "",
    lang: "",
    ins: "",
    perc: "",
    inv: "",
    username: "",
    imagestring: "",
  });
  const [player, setPlayer] = useState({
    playerName: "",
    lang: "",
    ins: "",
    perc: "",
    inv: "",
    username: "",
    imagestring: "",
  });

  const monsterList = () => {
    return data.monsters?.map((player: any, i: any) => {
      return (
        <O_Card
          type="monster"
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
          handleInitiativeChange={(int: any) => {
            setInitiative(int);
            console.log("UR INITIATIVE" + initiative);
          }}
          initiative={initiative}
          initiativeVal={player.initiative}
          hp={player.hp}
          arm={player.initiative}
          // data={effectsData}
          code={code}
          playerEffects={playerEffects}
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

  // main_functions
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

  const handlePostPlayerClick = () => {
    if ((player.ins || player.inv || player.perc || player.playerName) == "") {
      setEmpty(true);
      console.log("smth is wrong");
    } else {
      axios
        .post("http://localhost:3000/api/v1/games/" + code + "/players", {
          player: {
            name: player.playerName,
            language: player.lang,
            inv: player.inv,
            ins: player.ins,
            perc: player.perc,
            username: player.username,
            imagestring: player.imagestring,
          },
        })
        .then(function (response) {
          console.log("Done post");
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(() => {
          handleGetPlayers();
          setPlayer(initialState);
        });
    }
  };

  const [gameData, setGameData] = useState<any[]>([]);

  function handleGetPlayers() {
    axios
      .get("http://localhost:3000/api/v1/games/" + code + "/players")
      .then(({ data }) => {
        setGameData(data);
      })
      .catch((error) => console.error(error))
      .finally(() => {
        console.log("Done get");
        console.log(gameData);
      });
  }

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
        left="Назад"
        center="Добавление врагов"
        handleLeftPress={handlePresentModalPress}
        turn={data.fight ? `${data.turn} раунд` : ""}
      />
      <SingleGameWrapper>
        <ScrollView>
          {monsterList()}
          <M_Card type="NpcCreation" />
          <A_Button handleButtonClick={handlePostPlayerClick} offsetBottom={8}>
            Сохранить игрока
          </A_Button>
          <A_Button
            bright
            offsetBottom={107}
            handleButtonClick={() => navigation.push("SGame", { code: code })}
          >
            Начать игру
          </A_Button>
          <FlexBox style={{ height: 200 }}></FlexBox>
        </ScrollView>

        <O_BottomSheet
          mainHeader="Вы уверены?"
          subHeader="У вас есть несохраненные данные, а вы уже собираетесь покинуть страницу."
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          handleButtonClick={handleCloseModalPress}
          twoButtons={true}
        />
      </SingleGameWrapper>
    </>
  );
}
