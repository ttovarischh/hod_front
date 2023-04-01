import React, { useContext } from "react";
import { ScrollView } from "react-native";
import styled, { ThemeContext } from "styled-components/native";
import { FlexBox, HeaderText, FigureText, NavBarText } from "../../common";
import A_Icon from "../../components/A_Icon";
import A_Header from "../../components/A_Header";
import { StackActions } from "@react-navigation/native";

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
  const theme = useContext(ThemeContext);

  const supersplit = () => {
    let text = effect.descr;
    const descrArray = text.split(". ");
    return descrArray.map((descrOne: string, index: any) => {
      return (
        <DescrItemWrapper key={effect.id}>
          <FigureText offsetTop={2} offsetRight={64}>
            ({index + 1})
          </FigureText>
          <FlexBox style={{ maxWidth: 320 }}>
            <NavBarText>{descrOne}.</NavBarText>
          </FlexBox>
        </DescrItemWrapper>
      );
    });
  };

  return (
    <>
      <A_Header left="Назад" center="Эффект" handleLeftPress={() => navigation.dispatch(StackActions.popToTop())} />
      <EffectScreenWrapper>
        <ScrollView>
          <SingleEffectHeaderWrapper direction="row">
            <A_Icon iconName={effect.image}></A_Icon>
            <FlexBox
              style={{ marginBottom: 0, marginTop: "auto", marginLeft: 18 }}
            >
              <HeaderText>{effect.name}</HeaderText>
            </FlexBox>
          </SingleEffectHeaderWrapper>
          <DescrWrapper direction="column">{supersplit()}</DescrWrapper>
        </ScrollView>
      </EffectScreenWrapper>
    </>
  );
}

export default SingleEffectsScreen;
