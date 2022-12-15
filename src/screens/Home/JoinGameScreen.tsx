import React, { useState, useEffect } from "react";
import {
  StyleSheet,
} from "react-native";
import { FlexBox, HeaderText, TitleText, SmallText } from "../../common";
import styled from "styled-components/native";
import axios from "axios";
import A_Button from "../../components/A_Button";
import { StackActions } from '@react-navigation/native';



const JoinScreenWrapper = styled.View`
  background-color: ${({ theme }) => theme.appBg};
  height: 100%;
  color: white;
  padding-left: 14px;
  padding-right: 14px;
  padding-top: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const JoinModalWrapper = styled(FlexBox)`
  padding: 19px;
  padding-top: 12px;
  background: red;
  width: 60%;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.bottomBar.bg};
`;

const Code = styled.TextInput`
  width: 100%;
  height: 60px;
  background: #151516;
  color: white;
  border-radius: 9px;
  fontSize: 32px;
  text-align: center;
  text-transform: uppercase; 
  margin-bottom: 48px;
`;

function JoinGameScreen(props: { route: any; navigation: any }) {
  const { route, navigation } = props;
  const params = route.params || {};
  const { ok = {} } = params;

  const [code, setCode] = React.useState("");

  const handleType = (value: any) => {
    let newVal = value.toUpperCase();
    setCode(newVal);
    console.log(code.trim());
  };

  interface IUser {
    id: string;
    index: string;
    indexInner: any;
    name: string;
    code: string;
    created_at: any;
    players: any;
  }

  return (
    <JoinScreenWrapper>
      <JoinModalWrapper direction="column" alignItems="center">
        <SmallText style={{textAlign: 'center', marginBottom: 48}}>Код присоединения</SmallText>
        <Code
          style={styles.input}
          placeholder="AA111"
          onChangeText={handleType}
          value={code}
          placeholderTextColor="#8A8A8A"
          maxLength={5}
        />
        <A_Button solid disabled={(code.trim().length < 5)}
          handleButtonClick={() => navigation.push("SGame", { code: code })}
        >
          Продолжить
        </A_Button>
        <A_Button
          handleButtonClick={() => navigation.dispatch(StackActions.popToTop())}
        >
          Отмена
        </A_Button>
      </JoinModalWrapper>
    </JoinScreenWrapper>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#383841"
  },
});

export default JoinGameScreen;
