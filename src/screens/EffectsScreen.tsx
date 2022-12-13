import React, { useState, useEffect, useContext } from "react";
import { Text, View } from "react-native";
import styled from "styled-components/native";
import axios from "axios";
import { FlexBox, HeaderText } from '../common';

const EffectsScreenWrapper = styled.View`
  background-color: ${({ theme }) => theme.appBg};
  height: 100%;
  color: white;
  padding: 3px 14px 0 14px;
`;

function EffectsScreen() {
  const [isLoading, setLoading] = useState(true);
  const [effectsData, setEffectsData] = useState<any[]>([]);

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
        <View key={effect.id} style={{ margin: 10 }}>
          <Text>{effect.id}</Text>
          <Text>{effect.name}</Text>
          <Text>{effect.descr}</Text>
        </View>
      );
    });
  };

  return (
    <EffectsScreenWrapper>
      <HeaderText>All effects</HeaderText>
      {list()}
    </EffectsScreenWrapper>
  );
}

export default EffectsScreen;
