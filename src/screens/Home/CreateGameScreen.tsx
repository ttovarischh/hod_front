import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { FlexBox } from "../../common";
import styled from "styled-components/native";
import axios from "axios";
import A_Loader from "../../components/A_Loader";
import A_Button from "../../components/A_Button";
import A_Header from "../../components/A_Header";
import M_Card from "../../components/M_Card";
import { StackActions } from "@react-navigation/native";
import { apiUrl } from "../const";

const HomeScreenWrapper = styled.View`
  background-color: ${({ theme }) => theme.appBg};
  height: 100%;
  min-height: 100%;
  color: white;
  padding-left: 12px;
  padding-right: 12px;
`;

export default function CreateGameScreen(props: {
  route: any;
  navigation: any;
}) {
  const { route, navigation } = props;
  const params = route.params || {};
  const scrollViewRef = useRef<ScrollView>(null);
  const [empty, setEmpty] = useState(false);
  const dateTime = new Date().toJSON();
  const [code, setCode] = useState("NQ482");
  const [gameData, setGameData] = useState<any[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [initialState, setInitialState] = useState({
    playerName: "",
    lang: "",
    ins: "",
    perc: "",
    inv: "",
    username: "",
  });
  const [player, setPlayer] = useState({
    playerName: "",
    lang: "",
    ins: "",
    perc: "",
    inv: "",
    username: "",
  });

  const handleType = (key: any, value: any) => {
    console.log(player);
    setEmpty(false);
    setPlayer((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleClear = (key: any, value: any) => {
    setPlayer(initialState);
  };

  useEffect(() => {
    console.log("Game's ready");
    axios
      .post(apiUrl + "/games", {
        game: {
          name: dateTime,
        },
      })
      .then(function (response) {
        console.log(response.data.code);
        setCode(response.data.code);
        console.log(code);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(() => setLoading(false));
  }, []);

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

  const createdPlayersList = () => {
    return gameData.map((player: any) => {
      let langs = player.language.split(" ");
      return (
        <>
          <M_Card
            type="ch_creation_show"
            key={player.id}
            trueVal1={player.name}
            trueVal2={player.username}
            trueVal3={player.ins}
            trueVal4={player.inv}
            trueVal5={player.perc}
          >
            {langs.map((sublang: any) => (
              <FlexBox offsetRight="8" offsetBottom="8">
                <View style={styles.container}>
                  <Text style={{ fontSize: 18, color: "#EDF2DC" }}>
                    {sublang}
                  </Text>
                </View>
              </FlexBox>
            ))}
          </M_Card>
        </>
      );
    });
  };

  return (
    <>
      {isLoading ? (
        <A_Loader></A_Loader>
      ) : (
        <>
          <A_Header
            left="Отмена"
            center="Персонажи"
            handleLeftPress={() => navigation.dispatch(StackActions.popToTop())}
          />
          <ScrollView
            style={{ flex: 1 }}
            bounces={false}
            ref={scrollViewRef}
            onContentSizeChange={() =>
              scrollViewRef.current?.scrollToEnd({ animated: true })
            }
          >
            <HomeScreenWrapper>
              <>
                <FlexBox direction="column">{createdPlayersList()}</FlexBox>
                <M_Card
                  type="ch_creation"
                  handleFirstInputChange={(text: any) =>
                    handleType("playerName", text)
                  }
                  handleSecondInputChange={(text: any) =>
                    handleType("ins", text)
                  }
                  handleThirdInputChange={(text: any) =>
                    handleType("inv", text)
                  }
                  handleFourthInputChange={(text: any) =>
                    handleType("perc", text)
                  }
                  handleFifthInputChange={(text: any) =>
                    handleType("lang", text)
                  }
                  handleSixthInputChange={(text: any) =>
                    handleType("username", text)
                  }
                  handleClear={handleClear}
                  val1={player.playerName}
                  val2={player.ins}
                  val3={player.inv}
                  val4={player.perc}
                  val5={player.lang}
                  val6={player.username}
                  err1={empty && player.playerName == ""}
                  err2={empty && player.ins == ""}
                  err3={empty && player.inv == ""}
                  err4={empty && player.perc == ""}
                ></M_Card>
                <A_Button
                  handleButtonClick={handlePostPlayerClick}
                  offsetBottom={8}
                >
                  Сохранить игрока
                </A_Button>
                <A_Button
                  bright
                  offsetBottom={107}
                  handleButtonClick={() =>
                    navigation.push("SGame", { code: code })
                  }
                >
                  Начать игру
                </A_Button>
              </>
            </HomeScreenWrapper>
          </ScrollView>
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignSelf: "flex-start",
    backgroundColor: "#383838",
    padding: 8,
    paddingLeft: 12,
    paddingRight: 12,
    borderRadius: 10,
    alignItems: "baseline",
  },
});
