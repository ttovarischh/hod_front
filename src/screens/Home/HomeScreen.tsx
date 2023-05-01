import React, { useState } from "react";
import { ImageBackground } from "react-native";
import styled from "styled-components/native";
import { FlexBox, B_Text } from "../../common";
import A_Button from "../../components/Atoms/A_Button";
import A_Icon from "../../components/Atoms/A_Icon";
import { useTranslation } from "react-i18next";
import useAuth from "../../contexts/newAuthContext/useAuth";

const HomeScreenWrapper = styled(FlexBox)`
  background-color: ${({ theme }) => theme.appBg};
  flex: 1;
  color: white;
`;

const HomeScreenInnerWrapper = styled(FlexBox)`
  padding: 70px 14px 0px 14px;
  flex: 1;
`;

function HomeScreen(props: { navigation: any }) {
  const { navigation } = props;
  const { user } = useAuth();
  const dateTime = new Date().toJSON();
  const { t } = useTranslation();
  const [code, setCode] = useState("");

  const handleSubmit = async () => {
    if (!user?.jwt) {
      console.log("Error: missing token");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/v1/games", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.jwt}`,
          jti: `${user.jti}`,
          "Authorization-Session": `Bearer ${user.jwt}`,
        },
        body: JSON.stringify({
          game: {
            name: dateTime,
          },
          session: user.jwt,
        }),
      });
      const data = await response.json();
      console.log(`Game with a name ${dateTime} created successfully!`);
      console.log(data);
      setCode(data.code);
      navigation.push("Create", { newCode: data.code });
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  };

  return (
    <HomeScreenWrapper>
      <ImageBackground
        style={{ flex: 1, width: "100%", height: "100%", position: "absolute" }}
        source={require("../../../assets/images/bg.png")}
      >
        <HomeScreenInnerWrapper direction="column">
          <FlexBox
            alignItems="center"
            offsetBottom="50"
            offsetTop="152"
            direction="column"
            style={{ alignContent: "center" }}
          >
            <A_Icon iconName="bigstar"></A_Icon>
            <B_Text center offsetTop={24}>
              {t("common:hello")}, *{user?.username}*!
            </B_Text>
            <B_Text center>{t("common:start")}</B_Text>
          </FlexBox>
          <A_Button bright handleButtonClick={handleSubmit}>
            {t("common:createGame")}
          </A_Button>
          <A_Button handleButtonClick={() => navigation.push("Join")}>
            {t("common:joinGame")}
          </A_Button>
        </HomeScreenInnerWrapper>
      </ImageBackground>
    </HomeScreenWrapper>
  );
}

export default HomeScreen;
