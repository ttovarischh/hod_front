import React, { useState, useEffect, useContext } from "react";
import { Text, View, Image } from "react-native";
import styled from "styled-components/native";
import axios from "axios";
import { FlexBox, HeaderText } from '../common';

const EffectsScreenWrapper = styled.View`
  background-color: ${({ theme }) => theme.appBg};
  height: 100%;
  color: white;
  padding-left: 14px;
  padding-right: 14px;
  padding-top: 3px;
`;

const CardWrapper = styled(FlexBox)`
background-color: ${({ theme }) => theme.card.bg};
  width: 100%;
  margin-bottom: 20px;
  border-radius: 12px;
  padding: 11px 13px 19px 13px;
`;

const Img = styled.Image`
  width: 300px;
  height: 200px;
`;

const CardListWrapper= styled(FlexBox)`
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
        <CardWrapper direction="column" key={effect.id} style={{ margin: 10 }}>
            {/* <Img
                source={{uri: effect.image.url}}
            /> */}
        <Text>{effect.image.url}</Text>
          <Text>{effect.id}</Text>
          <Text>{effect.name}</Text>
          <Text>{effect.descr}</Text>
        </CardWrapper>
      );
    });
  };

  return (
    <EffectsScreenWrapper>
      <HeaderText>All effects</HeaderText>
      <FlexBox direction="column" offsetTop="24px">
        {list()}
      </FlexBox>
    </EffectsScreenWrapper>
  );
}

export default EffectsScreen;
