import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, Button, FlatList } from "react-native";
import styled from "styled-components/native";
import axios from "axios";
import { FlexBox, TitleText } from "../../common";
import { Context as AuthContext } from "../../contexts/AuthContext";
import { ImageBackground } from "react-native";
import { NewNewText } from "../../common/StyledFont";

const HomeScreenWrapper = styled(FlexBox)`
  background-color: ${({ theme }) => theme.appBg};
  flex: 1;
  color: white;
`;
const HomeScreenInnerWrapper = styled(FlexBox)`
  padding: 70px 14px 0px 14px;
  flex: 1;
`;

const HomeScreenText = styled.Text`
  color: white;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
`;

const HomeScreenButton = styled.TouchableOpacity`
  width: 100%;
  flex: 1;
  background: ${({ theme }) => theme.button.solid};
  border-radius: 20px;
  padding-right: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const HomeScreenHollowButton = styled(HomeScreenButton)`
  width: 100%;
  flex: 1;
  background: transparent;
  border: 1px solid ${({ theme }) => theme.button.border};
  border-radius: 20px;
  padding-right: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 24px;
`;

function HomeScreen(props: { navigation: any }) {
  const { navigation } = props;
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [testData, setTestData] = useState(null);

  const [scode, setSCode] = React.useState("");

  const { state } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/games")
      .then(({ data }) => {
        console.log(JSON.stringify(data));
        setData(data);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <HomeScreenWrapper>
      <ImageBackground
        style={{ flex: 1, width: "100%", height: "100%", position: "absolute" }}
        source={require("../../../assets/images/bg.png")}
      >
        <HomeScreenInnerWrapper direction="column">
          <Text style={{ fontFamily: "PP", fontSize: 30, color: 'white' }}>Без сознания</Text>
          <Text style={{ fontSize: 30, color: 'white' }}>Без сознания</Text>
          <NewNewText>
            Без сознания
          </NewNewText>
          <HomeScreenText style={{ fontSize: 28 }}>
            Привет, {state.email}
          </HomeScreenText>
          <HomeScreenText style={{ marginBottom: 28 }}>
            Пора сделать выбор
          </HomeScreenText>
          <HomeScreenButton
            onPress={() => navigation.push("Create", { data: data })}
          >
            <TitleText>Создать игру</TitleText>
          </HomeScreenButton>
          <HomeScreenHollowButton onPress={() => navigation.push("Join")}>
            <TitleText>Присоединиться к игре</TitleText>
          </HomeScreenHollowButton>
        </HomeScreenInnerWrapper>
      </ImageBackground>
    </HomeScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#eaeaea",
  },
});

export default HomeScreen;
