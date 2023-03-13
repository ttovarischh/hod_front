import React, { useEffect, useState, useContext } from "react";
import { TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  FlexBox,
  NavBarText,
  HugeText,
  TitleText,
  SuperBigText,
} from "../../common";
import styled from "styled-components/native";
import { Context as AuthContext } from "../../contexts/AuthContext";
import A_Icon from "../../components/A_Icon";
import A_Loader from "../../components/A_Loader";
import axios from "axios";
import { useTranslation } from "react-i18next";

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

export default function ProfileScreen(props: { navigation: any; route: any }) {
  const { navigation, route } = props;
  const [isLoading, setLoading] = useState(true);
  const [usersData, setUsersData] = useState<UserProps>();
  const { signout } = useContext(AuthContext);
  const [gamesData, setGamesData] = useState<any[]>([]);
  const { t } = useTranslation();

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
              <NavBarText offsetTop={30} color="white">
                {t("common:doneGames")}
              </NavBarText>
              <SuperBigText>
                {gamesData.length != 0 ? gamesData.length : "68"}
              </SuperBigText>
            </BigAvatarWrapper>
            <HugeText offsetBottom={4}>
              {usersData && usersData["username"]}
            </HugeText>
            <NavBarText offsetBottom={26}>
              {usersData && usersData["email"]}
            </NavBarText>
            <FlexBox style={{ maxWidth: 285 }}>
              <NavBarText color="#5F5F5F" center>
                {getFeeling()}
              </NavBarText>
            </FlexBox>
          </ProfileInnerWrapper>
          <SingleEffectHeaderWrapper>
            <TouchableOpacity
              onPress={() => navigation.push("Settings")}
              style={{
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: 116,
              }}
            >
              <FlexBox
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <A_Icon iconName="settings" />
                <TitleText color="white" offsetLeft={12}>
                  {t("common:settings")}
                </TitleText>
              </FlexBox>
            </TouchableOpacity>
          </SingleEffectHeaderWrapper>
        </ProfileScreenWrapper>
      )}
    </>
  );
}
