import React, { useState, useEffect, useContext } from "react";
import { ImageBackground } from "react-native";
import styled from "styled-components/native";
import axios from "axios";
import { FlexBox, HeaderText } from "../../common";
import { Context as AuthContext } from "../../contexts/AuthContext";
import A_Button from "../../components/A_Button";
import A_Icon from "../../components/A_Icon";
import { useTranslation } from "react-i18next";

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
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const { state } = useContext(AuthContext);
  const { t } = useTranslation();

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/games")
      .then(({ data }) => {
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
          <FlexBox
            alignItems="center"
            offsetBottom="50"
            offsetTop="152"
            direction="column"
            style={{ alignContent: "center" }}
          >
            <A_Icon iconName="bigstar"></A_Icon>
            <HeaderText center offsetTop={24}>
              {t("common:hello")}, *{state.email}*!
            </HeaderText>
            <HeaderText center>{t("common:start")}</HeaderText>
          </FlexBox>
          <A_Button
            bright
            handleButtonClick={() => navigation.push("Create", { data: data })}
          >
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
