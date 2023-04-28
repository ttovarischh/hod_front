import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { FlexBox, HugeText, E_Text, D_Text } from "../../common";
import styled from "styled-components/native";
import A_Icon from "../../components/Atoms/A_Icon";
import A_Loader from "../../components/Atoms/A_Loader";
import axios from "axios";
import { useTranslation } from "react-i18next";
import useAuth from "../../contexts/newAuthContext/useAuth";
import A_UserProfileAvatar from "../../components/Atoms/A_UserProfileAvatar";

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

export default function ProfileScreen(props: { navigation: any; route: any }) {
  const { navigation, route } = props;
  const [isLoading, setLoading] = useState(false);
  const [usersData, setUsersData] = useState<any[]>([]);
  const [gamesData, setGamesData] = useState<any[]>([]);
  const { t } = useTranslation();
  const { user } = useAuth();

  function getFeeling() {
    const myFeelings = [
      "Начала играть благодаря друзьям и теперь тоже пьет пиво...",
      "Больше всего в D&D ценит шутки про мам",
      "Всегда выбирает сексуально озабоченную расу",
      "Самый смелый на поле",
    ];
    const feeling = myFeelings[Math.floor(Math.random() * myFeelings.length)];
    console.log(feeling);
    return feeling;
  }

  useEffect(() => {
    const focusHandler = navigation.addListener("focus", () => {
      axios
        .get("http://localhost:3000/api/v1/users/" + user?.id)
        .then(({ data }) => {
          setUsersData(data);
          setGamesData(data.games);
          console.log(JSON.stringify(gamesData));
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => setLoading(false));
    });
    return focusHandler;
  }, [navigation]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/users/" + user?.id)
      .then(({ data }) => {
        setUsersData(data);
        setGamesData(data.games);
        console.log(JSON.stringify(gamesData));
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      {isLoading ? (
        <A_Loader></A_Loader>
      ) : (
        <ProfileScreenWrapper>
          <Cover source={require("../../../assets/images/cover.png")} />
          <ProfileInnerWrapper>
            <A_UserProfileAvatar
              upperString={
                // @ts-ignore
                usersData?.show == "count"
                  ? t("common:doneGames")
                  : t("common:hours")
              }
              downString={
                // @ts-ignore
                usersData?.show == "count"
                  ? gamesData.length
                  : gamesData.length * 3
              }
            ></A_UserProfileAvatar>
            <HugeText offsetBottom={4}>{user?.username}</HugeText>
            <E_Text offsetBottom={26}>{user?.email}</E_Text>
            <FlexBox style={{ maxWidth: 285 }}>
              <E_Text color="#5F5F5F" center>
                {
                  // @ts-ignore
                  usersData?.about ? usersData?.about : getFeeling()
                }
              </E_Text>
            </FlexBox>
          </ProfileInnerWrapper>
          <SingleEffectHeaderWrapper>
            <TouchableOpacity
              onPress={() =>
                navigation.push("Settings", {
                  userName: user?.username,
                  email: user?.email,
                  about: user?.about,
                })
              }
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
                <D_Text color="white" offsetLeft={12}>
                  {t("common:settings")}
                </D_Text>
              </FlexBox>
            </TouchableOpacity>
          </SingleEffectHeaderWrapper>
        </ProfileScreenWrapper>
      )}
    </>
  );
}
