import React from "react";
import { FlexBox, NavBarText } from "../../common";
import styled from "styled-components/native";
import A_Button from "../../components/A_Button";
import { StackActions } from "@react-navigation/native";
import A_Header from "../../components/A_Header";
import A_Input from "../../components/A_Input";

const JoinScreenWrapper = styled.View`
  background-color: ${({ theme }) => theme.appBg};
  height: 100%;
  color: white;
  padding-left: 14px;
  padding-right: 14px;
`;

function JoinGameScreen(props: { route: any; navigation: any }) {
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
      <A_Header
        left="Назад"
        center="Войти в игру"
        handleLeftPress={() => navigation.dispatch(StackActions.popToTop())}
      />
      <FlexBox direction="column" alignItems="center" offsetTop="48">
        <FlexBox style={{ maxWidth: "70%", marginBottom: 16 }}>
          <NavBarText center>
            Введи код, который дал тебе ДМ или отсканируй QR-код для того, чтобы
            войти в игру
          </NavBarText>
        </FlexBox>
        <A_Input
          value={code}
          maxLength={5}
          handleChange={handleType}
          placeholder={"Код"}
          label={"Код"}
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

export default JoinGameScreen;
