//@ts-nocheck
import React, { useState, useEffect, createRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  ScrollView,
  ActionSheetIOS,
} from "react-native";
import {
  FlexBox,
  HeaderText,
  TitleText,
  SmallText,
  NavBarText,
} from "../../common";
import styled from "styled-components/native";
import axios from "axios";
import { useRef } from "react";
import A_Icon from "../../components/A_Icon";
import { StackActions } from "@react-navigation/native";
import { apiUrl } from "../const";
import A_Loader from "../../components/A_Loader";

const HomeScreenWrapper = styled.View`
  background-color: ${({ theme }) => theme.appBg};
  height: 100%;
  min-height: 100%;
  color: white;
  padding-left: 14px;
  padding-right: 14px;
  padding-top: 22px;
`;

const PlayerWrapper = styled(FlexBox)`
  flex-direction: column;
  background: #1c1c1e;
  border-radius: 20px;
  padding: 12px;
  width: 100%;
  margin-bottom: 8px;
`;

const PlayerInputWrapper = styled(FlexBox)`
  width: 100%;
  height: 55px;
  max-height: 55px;
  padding-left: 16px;
  background: #0e0e0e;
  border-radius: 12px;
  flex-direction: column;
  justify-content: center;
`;

const PlayerTextareaWrapper = styled(FlexBox)`
  width: 100%;
  padding-left: 16px;
  padding-top: 14px;
  padding-bottom: 14px;
  background: #0e0e0e;
  border-radius: 12px;
  flex-direction: column;
  justify-content: center;
`;

const InputFlexbox = styled(FlexBox)`
  position: relative;
`;

const TextAreaFlexBox = styled(FlexBox)`
  position: relative;
  background: #0e0e0e;
  border-radius: 20px;
`;

const SecondPlaceholder = styled.Text`
  position: absolute;
  color: #383838;
  left: 12;
  font-size: 11px;
  line-height: 11px;
  bottom: 16px;
`;

const PlayerRealInputWrapper = styled.TextInput`
  width: 100%;
  height: 55px;
  background: #0e0e0e;
  border-radius: 12px;
  font-size: 18;
`;

const BottomSheetButton = styled.TouchableOpacity`
  background-color: #f0ff00;
  width: 100%;
  height: 125px;
  border-radius: 20px;
`;

const CustomHeaderWrapper = styled(FlexBox)`
  background-color: black;
  width: 100%;
  height: 86px;
  position: relative;
  justify-content: center;
  align-items: flex-end;
`;

const BackButton = styled.TouchableOpacity`
  width: 16px;
  height: 16px;
  margin-bottom: 2px;
  position: absolute;
  left: 16px;
  bottom: 8px;
`;

function CreateGameScreen(props: { route: any; navigation: any }) {
  const { route, navigation } = props;
  const params = route.params || {};
  const scrollViewRef = useRef();

  const [loaded, setLoaded] = useState(false);
  const dateTime = new Date().toJSON();
  const [code, setCode] = useState("ZF563");
  const [gameData, setGameData] = useState<any[]>([]);

  const [isLoading, setLoading] = useState(true);

  const [initialState, setInitialState] = useState({
    playerName: "",
    lang: "",
    ins: "",
    perc: "",
    inv: "",
  });

  const [player, setPlayer] = useState({
    playerName: "",
    lang: "",
    ins: "",
    perc: "",
    inv: "",
  });

  const handleType = (key: any, value: any) => {
    console.log(player);
    setPlayer((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  function handleClick() {
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
    axios
      .post("http://localhost:3000/api/v1/games/" + code + "/players", {
        player: {
          name: player.playerName,
          language: player.lang,
          inv: player.inv,
          ins: player.ins,
          perc: player.perc,
        },
      })
      .then(function (response) {
        console.log("Done post");
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(() => {
        handleClick();
        setPlayer(initialState);
      });
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

  const list = () => {
    return gameData.map((player: any) => {
      let langs = player.language.split(" ");
      return (
        <PlayerWrapper direction="column" key={player.id}>
          <PlayerInputWrapper offsetBottom="6">
            <NavBarText style={{ color: "#EDF2DC" }}>{player.name}</NavBarText>
          </PlayerInputWrapper>
          <PlayerInputWrapper offsetBottom="6">
            <NavBarText style={{ color: "#EDF2DC" }}>{player.ins}</NavBarText>
            <Text style={{ color: "#383838", fontSize: 11 }}>
              Проницательность
            </Text>
          </PlayerInputWrapper>
          <PlayerInputWrapper offsetBottom="6">
            <NavBarText style={{ color: "#EDF2DC" }}>{player.inv}</NavBarText>
            <Text style={{ color: "#383838", fontSize: 11 }}>
              Расследование
            </Text>
          </PlayerInputWrapper>
          <PlayerInputWrapper offsetBottom="6">
            <NavBarText style={{ color: "#EDF2DC" }}>{player.perc}</NavBarText>
            <Text style={{ color: "#383838", fontSize: 11 }}>Восприятие</Text>
          </PlayerInputWrapper>
          <PlayerTextareaWrapper>
            <NavBarText
              style={{ color: "#717171", lineHeight: 18, marginBottom: 12 }}
            >
              Языки
            </NavBarText>
            <NavBarText>
              {langs.map((sublang: any) => (
                <FlexBox offsetRight="8">
                  <View style={styles.container}>
                    <Text style={{ fontSize: 18, color: "#EDF2DC" }}>
                      {sublang}
                    </Text>
                  </View>
                </FlexBox>
              ))}
            </NavBarText>
          </PlayerTextareaWrapper>
        </PlayerWrapper>
      );
    });
  };

  return (
    <>
      {isLoading ? (
        <A_Loader></A_Loader>
      ) : (
        <ScrollView
          style={{ flex: 1 }}
          ref={scrollViewRef}
          onContentSizeChange={() =>
            scrollViewRef.current.scrollToEnd({ animated: true })
          }
        >
          <CustomHeaderWrapper>
            {/* <BackButton onPress={onPress(navigation)}> */}
            <BackButton>
              <A_Icon iconName="back" fill="#636364"></A_Icon>
            </BackButton>
            <NavBarText style={{ color: "#636364", marginTop: 55 }}>
              Персонажи
            </NavBarText>
          </CustomHeaderWrapper>
          <HomeScreenWrapper>
            <>
              <BottomSheetButton
                style={{ marginBottom: 12 }}
                onPress={() => console.log(gameData)}
              >
                <HeaderText
                  style={{
                    fontSize: 24,
                    textAlign: "center",
                    color: "#000000",
                    lineHeight: 125,
                  }}
                >
                  Начать игру
                </HeaderText>
              </BottomSheetButton>
              <FlexBox direction="column">{list()}</FlexBox>
              <PlayerWrapper direction="column" offsetBottom="8">
                <InputFlexbox>
                  <PlayerRealInputWrapper
                    placeholder="Имя персонажа"
                    value={player.playerName}
                    placeholderTextColor="#383838"
                    style={{
                      color: "#EDF2DC",
                      marginBottom: 6,
                      paddingLeft: 12,
                    }}
                    onChangeText={(text) => handleType("playerName", text)}
                  />
                </InputFlexbox>
                <InputFlexbox>
                  <PlayerRealInputWrapper
                    placeholder="Проницательность"
                    value={player.ins}
                    placeholderTextColor="#383838"
                    maxLength={2}
                    keyboardType="numeric"
                    style={{
                      color: "#EDF2DC",
                      marginBottom: 6,
                      paddingLeft: 12,
                      paddingBottom: 16,
                    }}
                    onChangeText={(text) => handleType("ins", text)}
                  />
                  <SecondPlaceholder>Insight</SecondPlaceholder>
                </InputFlexbox>
                <InputFlexbox>
                  <PlayerRealInputWrapper
                    placeholder="Расследование"
                    value={player.inv}
                    placeholderTextColor="#383838"
                    maxLength={2}
                    keyboardType="numeric"
                    style={{
                      color: "#EDF2DC",
                      marginBottom: 6,
                      paddingLeft: 12,
                      paddingBottom: 16,
                    }}
                    onChangeText={(text) => handleType("inv", text)}
                  />
                  <SecondPlaceholder>Investigation</SecondPlaceholder>
                </InputFlexbox>
                <InputFlexbox>
                  <PlayerRealInputWrapper
                    placeholder="Восприятие"
                    value={player.perc}
                    placeholderTextColor="#383838"
                    maxLength={2}
                    keyboardType="numeric"
                    style={{
                      color: "#EDF2DC",
                      marginBottom: 6,
                      paddingLeft: 12,
                      paddingBottom: 16,
                    }}
                    onChangeText={(text) => handleType("perc", text)}
                  />
                  <SecondPlaceholder>Perception</SecondPlaceholder>
                </InputFlexbox>
                <TextAreaFlexBox>
                  <Text
                    style={{
                      fontSize: 18,
                      color: "#717171",
                      marginLeft: 12,
                      marginTop: 8,
                    }}
                  >
                    Языки
                  </Text>
                  <PlayerRealInputWrapper
                    placeholder="Введите через пробел..."
                    value={player.lang}
                    placeholderTextColor="#383838"
                    style={{ color: "#EDF2DC", paddingLeft: 12, height: 45 }}
                    onChangeText={(text) => handleType("lang", text)}
                  />
                </TextAreaFlexBox>
              </PlayerWrapper>
              <BottomSheetButton
                onPress={handlePostPlayerClick}
                style={{ backgroundColor: "#1A1A1A99" }}
              >
                <HeaderText
                  style={{
                    fontSize: 24,
                    textAlign: "center",
                    color: "white",
                    lineHeight: 125,
                  }}
                >
                  Сохранить игрока
                </HeaderText>
              </BottomSheetButton>
              <BottomSheetButton
                style={{ marginBottom: 12 }}
                onPress={() => navigation.push("SGame", { code: code })}
              >
                <HeaderText
                  style={{
                    fontSize: 24,
                    textAlign: "center",
                    color: "#000000",
                    lineHeight: 125,
                  }}
                >
                  Начать игру
                </HeaderText>
              </BottomSheetButton>
            </>
          </HomeScreenWrapper>
        </ScrollView>
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

export default CreateGameScreen;
