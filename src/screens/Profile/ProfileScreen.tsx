import React, { useEffect, useState, useContext } from "react";
import { Text, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FlexBox, NavBarText, ProfileText } from "../../common";
import styled from "styled-components/native";
import { Context as AuthContext } from "../../contexts/AuthContext";
import A_Icon from "../../components/A_Icon";
import A_Loader from "../../components/A_Loader";
import axios from "axios";

const ProfileScreenWrapper = styled(FlexBox)`
  background-color: ${({ theme }) => theme.appBg};
  flex: 1;
  height: 100%;
  color: white;
  position: relative;
`;

const ProfileInnerWrapper = styled(FlexBox)`
  justify-content: center;
  align-items: center;
  align-content: center;
  flex-direction: column;
  width: 100%;
  margin-top: 70px;
`;

const SingleEffectHeaderWrapper = styled(FlexBox)`
  position: relative;
  width: 100%;
  height: 100%;
`;

const Cover = styled.Image`
  width: 100%;
  height: 256px;
  position: absolute;
  top: 0;
`;

const Avatar = styled.Image`
  border-radius: 100%;
  width: 44px;
  height: 44px;
  opacity: 0.9;
`;

const BigAvatarWrapper = styled(FlexBox)`
  border-radius: 1000%;
  background: #1a1a1a;
  width: 404px;
  height: 404px;
  margin-bottom: 30px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
`;

function ProfileScreen(props: { navigation: any; route: any }) {
  const { navigation, route } = props;
  const [isLoading, setLoading] = useState(true);
  const [usersData, setUsersData] = useState<UserProps>();
  const { state, signout } = useContext(AuthContext);
  const [arr, setArr] = useState<any[]>([]);
  const [token, setToken] = React.useState("");
  const [usersId, setUserId] = useState<any[]>([]);
  // const [gamesData, setGamesData] = useState<null>();
  const [gamesData, setGamesData] = useState<any[]>([])


  type UserProps = {
    email: string;
    id: number;
    username: string;
    created_at: any;
    updated_at: any;
    jti: any;
  };

  useEffect(() => {
    const asyncFunction = async () => {
      try {
        const firstResponse = await getData();
        setLoading(false);
        //@ts-ignore
        if (usersData != "undefined") {
          console.log(usersData?.id);
          const secondResponse = await axios
            .get("http://localhost:3000/api/v1/users/" + usersData?.id)
            .then(({ data }) => {
              setGamesData(data.games);
              console.log(JSON.stringify(gamesData));
            })
            .catch()
            .finally();
        }
      } catch (error) {
        return error;
      }
    };
    asyncFunction();
  }, []);

  function getFeeling() {
    const myFeelings = [
      "Начала играть благодаря друзьям и теперь тоже пьет пиво...",
      "Больше всего в D&D ценит шутки про члены",
      "Всегда выбирает сексуально озабоченную расу",
      "Самый смелый на поле",
    ];
    const feeling = myFeelings[Math.floor(Math.random() * myFeelings.length)];
    console.log(feeling);
    return feeling;
  }

  const getData = async () => {
    try {
      const gotToken = await AsyncStorage.getItem("@AuthData");
      if (gotToken !== null) {
        const _authData = JSON.parse(gotToken);
        setUsersData(_authData);
        console.log(usersData);
      } else {
        console.log("AAAA SUKA");
      }
    } catch (e) {}
  };

  return (
    <>
      {isLoading ? (
        <A_Loader></A_Loader>
      ) : (
        <ProfileScreenWrapper>
          <Cover source={require("../../../assets/images/cover.png")} />
          <ProfileInnerWrapper>
            <BigAvatarWrapper>
              <NavBarText style={{ marginTop: 30 }}>Завершено игр</NavBarText>
              <Text style={{ fontSize: 232, color: "white", lineHeight: 250 }}>
                {gamesData.length != 0 ? gamesData.length : "68"}
              </Text>
            </BigAvatarWrapper>
            <ProfileText style={{ marginBottom: 4 }}>
              {usersData && usersData["username"]}
            </ProfileText>
            <NavBarText style={{ marginBottom: 26 }}>
              {usersData && usersData["email"]}
            </NavBarText>
            <NavBarText
              style={{ color: "#5F5F5F", textAlign: "center", maxWidth: 285 }}
            >
              {getFeeling()}
            </NavBarText>
          </ProfileInnerWrapper>
          <SingleEffectHeaderWrapper>
            <TouchableOpacity
              onPress={signout}
              style={{
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: 116,
              }}
            >
              <FlexBox direction="row">
                <A_Icon iconName="settings" fill="white" />
                <NavBarText style={{ fontSize: 20, marginLeft: 12 }}>
                  Sing out
                </NavBarText>
              </FlexBox>
            </TouchableOpacity>
          </SingleEffectHeaderWrapper>
        </ProfileScreenWrapper>
      )}
    </>
  );
}

export default ProfileScreen;
