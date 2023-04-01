import React, { useState, useEffect, useContext } from "react";
import styled, { ThemeContext } from "styled-components/native";
import axios from "axios";
import { FlexBox, FigureText, HeaderText } from "../../common";
import A_Icon from "../../components/A_Icon";
import A_Loader from "../../components/A_Loader";
import A_Header from "../../components/A_Header";

const EffectsScreenWrapper = styled.View`
  background-color: ${({ theme }) => theme.appBg};
  height: 100%;
  color: white;
  padding-left: 14px;
  padding-right: 14px;
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
  width: 100%;
  margin-bottom: 10px;
  border-radius: 12px;
`;

export default function EffectsList(props: { navigation: any }) {
  const { navigation } = props;
  const [isLoading, setLoading] = useState(true);
  const [effectsData, setEffectsData] = useState<any[]>([]);
  const theme = useContext(ThemeContext);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/effects")
      .then(({ data }) => {
        setEffectsData(data);
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const list = () => {
    return effectsData.map((effect) => {
      return (
        <CardWrapper direction="column" key={effect.id}>
          <EffectLink
            onPress={() => navigation.push("Single", { effect: effect })}
          >
            <A_Icon iconName={effect.image}></A_Icon>
            <EffectInfoWrapper direction="row">
              <HeaderText offsetRight={1}>{effect.name}</HeaderText>
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
          <A_Header center="Эффекты" />
          <FlexBox direction="column">{list()}</FlexBox>
        </EffectsScreenWrapper>
      )}
    </>
  );
}
