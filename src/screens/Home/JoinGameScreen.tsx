import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { FlexBox, HeaderText, TitleText, SmallText } from "../../common";
import styled from "styled-components/native";
import axios from "axios";

const HomeScreenWrapper = styled.View`
  background-color: ${({ theme }) => theme.appBg};
  height: 100%;
  color: white;
  padding-left: 14px;
  padding-right: 14px;
  padding-top: 3px;
`;

const EffectLink = styled.TouchableOpacity`
  width: 100%;
`;

const EffectInfoWrapper = styled(FlexBox)`
  padding: 11px 13px 19px 13px;
`;

const MoreGameInfo = styled(FlexBox)`
  width: 100%;
`;

const CardWrapper = styled(FlexBox)`
  background-color: ${({ theme }) => theme.card.bg};
  width: 100%;
  margin-bottom: 20px;
  border-radius: 12px;
  //   overflow: hidden;
  //   padding: 11px 13px 19px 13px;
`;

const Img = styled.Image`
  width: 100%;
  height: 200px;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
`;

function JoinGameScreen(props: { route: any; navigation: any }) {
  const { route, navigation } = props;
  const params = route.params || {};
  const { ok = {} } = params;

  const [code, setCode] = React.useState("");


  const handleSubmit = () => {
    alert("Ur code - " + code);

  }

  const handleType = (value: any) => {
    setCode(value)
    console.log(code)
  }

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
    <View>
      <HeaderText style={{ marginBottom: 24 }}>Присоединиться</HeaderText>
      <TextInput
        style={styles.input}
        placeholder="Type here to translate!"
        onChangeText={handleType}
        value={code}
      />
      <TouchableOpacity onPress={() => navigation.push("SGame", {code: code})}>
        <Text>Press this button to submit editing</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
  });

export default JoinGameScreen;
