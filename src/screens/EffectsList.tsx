import React, { useState, useEffect, useContext } from "react";
import { Text, View, Image, StyleSheet, ScrollView } from "react-native";
import styled from "styled-components/native";
import axios from "axios";
import { FlexBox, HeaderText, TitleText, SmallText } from "../common";
import { createStackNavigator } from "@react-navigation/stack";
import SingleEffectsScreen from "./SingleEffectScreen";
import { Button } from "react-native-paper";
import { StackActions } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";

const EffectsScreenWrapper = styled.View`
  background-color: ${({ theme }) => theme.appBg};
  height: 100%;
  color: white;
  padding-left: 14px;
  padding-right: 14px;
  padding-top: 3px;
`;

const EffectLink = styled.TouchableOpacity`
  width: 100%;
`

const EffectInfoWrapper = styled(FlexBox)`
  padding: 11px 13px 19px 13px;
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

const CardListWrapper = styled(FlexBox)``;

function EffectsList(props: { navigation: any }) {
  const { navigation } = props;
  const [isLoading, setLoading] = useState(true);
  const [effectsData, setEffectsData] = useState<any[]>([]);
  const HomeStack = createStackNavigator();
  const pushAction = StackActions.push("Single");

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
          <CardWrapper
            direction="column"
            key={effect.id}
            style={[styles.card, styles.shadowProp]}
          >
             <EffectLink onPress={() => navigation.push("Single", {effect: effect})}>
            <Img
              source={{ uri: "http://localhost:3000/" + effect.image.url }}
            />
            {/* <Text>{effect.image.url}</Text> */}
            <EffectInfoWrapper direction="column">
              <TitleText style={{ marginBottom: 8 }}>{effect.name}</TitleText>
              <SmallText numberOfLines={3}>{effect.descr}</SmallText>
            </EffectInfoWrapper>
            </EffectLink>
          </CardWrapper>
      );
    });
  };

  return (
    <EffectsScreenWrapper>
      <ScrollView>
        <HeaderText>Эффекты в D&D</HeaderText>
        <FlexBox direction="column" offsetTop="24px">
          {list()}
        </FlexBox>
      </ScrollView>
    </EffectsScreenWrapper>
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
