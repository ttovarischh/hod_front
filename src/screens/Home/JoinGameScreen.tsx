import React from "react";
import { FlexBox, E_Text } from "../../common";
import styled from "styled-components/native";
import A_Button from "../../components/Atoms/A_Button";
import { StackActions } from "@react-navigation/native";
import O_Header from "../../components/Organisms/O_Header";
import A_Input from "../../components/Atoms/A_Input";

const JoinScreenWrapper = styled.View`
  background-color: ${({ theme }) => theme.appBg};
  height: 100%;
  color: white;
  padding-left: 14px;
  padding-right: 14px;
`;

const Ornament = styled.Image`
  width: 290.38px;
  height: 224.15px;
  position: absolute;
`;

export default function JoinGameScreen(props: { route: any; navigation: any }) {
  const { route, navigation } = props;
  const params = route.params || {};
  const [code, setCode] = React.useState("");

  const handleType = (value: any) => {
    let newVal = value.toUpperCase();
    setCode(newVal);
    console.log(code.trim());
  };

  return (
    <JoinScreenWrapper>
      <O_Header
        left="Назад"
        center="Войти в игру"
        handleLeftPress={() => navigation.dispatch(StackActions.popToTop())}
      />
      <Ornament
        style={{ resizeMode: "contain", left: 160, top: 112 }}
        source={require("../../../assets/images/JoinOrnament.png")}
      />
      <Ornament
        style={{ resizeMode: "contain", left: -30, bottom: -30 }}
        source={require("../../../assets/images/JoinOrnament.png")}
      />
      <FlexBox
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ flex: 1, paddingBottom: 100 }}
      >
        <FlexBox style={{ maxWidth: "92%", marginBottom: 16 }}>
          <E_Text center>
            Попроси у мастера код приглашения и введи его в поле ниже.
            Ты также можешь отсканировать QR-код с утройства ведущего!
          </E_Text>
        </FlexBox>
        <A_Input
          value={code}
          maxLength={5}
          handleChange={handleType}
          placeholder={"Код игры"}
          label={"Код игры"}
        />
        <A_Button
          bright
          disabled={code.trim().length < 5}
          handleButtonClick={() => navigation.push("SGame", { code: code })}
        >
          Продолжить
        </A_Button>
      </FlexBox>
    </JoinScreenWrapper>
  );
}
