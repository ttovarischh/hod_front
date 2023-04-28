import React, { useContext } from "react";
import { ScrollView } from "react-native";
import styled, { ThemeContext } from "styled-components/native";
import { FlexBox, G_Text, E_Text } from "../../common";
import O_Header from "../../components/Organisms/O_Header";
import { StackActions } from "@react-navigation/native";
import A_Effect from "../../components/Atoms/A_Effect";

const EffectScreenWrapper = styled.View`
  background-color: ${({ theme }) => theme.appBg};
  height: 100%;
  color: white;
  padding: 12px;
`;

const DescrItemWrapper = styled(FlexBox)`
  align-items: top;
  flex-direction: row;
  margin-bottom: 18px;
`;

const SingleEffectHeaderWrapper = styled(FlexBox)`
  position: relative;
  width: 100%;
  margin-bottom: 32px;
`;

const DescrWrapper = styled(FlexBox)`
  position: relative;
  width: 100%;
  height: 100%;
`;

function SingleEffectsScreen(props: { route: any; navigation: any }) {
  const { route, navigation } = props;
  const params = route.params || {};
  const { effect = {} } = params;

  const supersplit = () => {
    let text = effect.descr;
    const descrArray = text.split(". ");
    return descrArray.map((descrOne: string, index: any) => {
      return (
        <DescrItemWrapper key={effect.id}>
          <G_Text offsetTop={2} offsetRight={64}>
            ({index + 1})
          </G_Text>
          <FlexBox style={{ maxWidth: 320 }}>
            <E_Text>{descrOne}.</E_Text>
          </FlexBox>
        </DescrItemWrapper>
      );
    });
  };

  return (
    <>
      <O_Header
        left="Назад"
        center="Эффект"
        handleLeftPress={() => navigation.dispatch(StackActions.popToTop())}
      />
      <EffectScreenWrapper>
        <ScrollView>
          <SingleEffectHeaderWrapper direction="row">
            <A_Effect item={effect} />
          </SingleEffectHeaderWrapper>
          <DescrWrapper direction="column">{supersplit()}</DescrWrapper>
        </ScrollView>
      </EffectScreenWrapper>
    </>
  );
}

export default SingleEffectsScreen;
