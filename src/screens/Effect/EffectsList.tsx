import React, { useState, useEffect, useContext } from "react";
import { Text, View, Image, StyleSheet, ScrollView } from "react-native";
import styled from "styled-components/native";
import axios from "axios";
import {
  FlexBox,
  HeaderText,
  TitleText,
  SmallText,
  TestText,
  FigureText,
} from "../../common";
import { createStackNavigator } from "@react-navigation/stack";
import SingleEffectsScreen from "./SingleEffectScreen";
import { Button } from "react-native-paper";
import { StackActions } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import A_Icon from "../../components/A_Icon";
import { ThemeContext } from "styled-components";
import { ActivityIndicator } from "react-native-paper";
import A_Loader from "../../components/A_Loader";

const EffectsScreenWrapper = styled.View`
  background-color: ${({ theme }) => theme.appBg};
  height: 100%;
  color: white;
  padding-left: 14px;
  padding-right: 14px;
  padding-top: 22px;
  // padding-top: 70px;
`;

const EffectLink = styled.TouchableOpacity`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const EffectInfoWrapper = styled(FlexBox)`
  margin-left: 18px;
`;

const CardWrapper = styled(FlexBox)`
  // background-color: ${({ theme }) => theme.card.bg};
  width: 100%;
  margin-bottom: 10px;
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

const CardListWrapper = styled(FlexBox)``;

function EffectsList(props: { navigation: any }) {
  const { navigation } = props;
  const [isLoading, setLoading] = useState(true);
  const [effectsData, setEffectsData] = useState<any[]>([]);
  const HomeStack = createStackNavigator();
  const pushAction = StackActions.push("Single");
  const theme = useContext(ThemeContext);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/effects")
      .then(({ data }) => {
        //   console.log(JSON.stringify(data))
        setEffectsData(data);
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setLoading(false);
        console.log(effectsData);
      });
  }, []);

  interface IUser {
    id: string;
    index: string;
    indexInner: any;
    name: string;
    code: string;
    created_at: any;
    players: any;
  }

  const list = () => {
    return effectsData.map((effect) => {
      return (
        <CardWrapper direction="column" key={effect.id}>
          <EffectLink
            onPress={() => navigation.push("Single", { effect: effect })}
          >
            <A_Icon iconName={effect.image} fill={theme.bottomBar.ic}></A_Icon>
            <EffectInfoWrapper direction="row">
              <TestText>{effect.name}</TestText>
              <FigureText>&#40;{effect.id}&#41;</FigureText>
            </EffectInfoWrapper>
          </EffectLink>
        </CardWrapper>
      );
    });
  };

  return (
    <>
      {isLoading ? (
        <A_Loader></A_Loader>
      ) : (
        <EffectsScreenWrapper>
          <FlexBox direction="column">{list()}</FlexBox>
        </EffectsScreenWrapper>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 24,
  },
  shadowProp: {
    shadowColor: "#eaeaea",
    shadowOffset: { width: 5, height: -8 },
    shadowOpacity: 0.15,
    shadowRadius: 5.62,
  },
});

export default EffectsList;
