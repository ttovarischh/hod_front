import React, { useState, useEffect, useContext } from "react";
import { Text, View, Image, StyleSheet, ScrollView } from "react-native";
import styled from "styled-components/native";
import {
  FlexBox,
  HeaderText,
  TitleText,
  SmallText,
  FigureText,
  NavBarText,
} from "../../common";
import Svg, { Path } from "react-native-svg";
import A_Icon from "../../components/A_Icon";
import { ThemeContext } from "styled-components";

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
  // height: 350px;
  // padding: 13px 13px 19px 13px;
  margin-bottom: 32px;
`;

const BackButton = styled.TouchableOpacity`
  width: 50px;
  height: 50px;
  background: #cfcfcf;
  border-radius: 100%;
  padding-right: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DescrWrapper = styled(FlexBox)`
  position: relative;
  width: 100%;
  height: 100%;
  // background: white;
  // padding: 20px;
  // border-top-right-radius: 12px;
  // border-top-left-radius: 12px;
`;

const Img = styled.Image`
  position: absolute;
  opacity: 0.5;
  width: 100%;
  height: 400px;
  min-width: 390px;
  border-top-right-radius: 12px;
  border-top-left-radius: 12px;
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
          <FigureText style={{ marginTop: 2, marginRight: 64 }}>({index + 1})</FigureText>
          <NavBarText style={{ maxWidth: 320 }}>{descrOne}.</NavBarText>
        </DescrItemWrapper>
      );
    });
  };

  return (
    <EffectScreenWrapper>
      <ScrollView>
        <SingleEffectHeaderWrapper direction="row" offsetTop="22">
          {/* <Img source={{ uri: "http://localhost:3000/" + effect.image.url }} /> */}
          {/* <BackButton onPress={() => navigation.goBack()}>
            <Svg width="13" height="21" viewBox="0 0 13 21" fill="none">
              <Path
                d="M0.80127 10.8916C0.80127 11.2734 0.947266 11.5991 1.25049 11.8911L10.0103 20.46C10.2461 20.707 10.5605 20.8306 10.9199 20.8306C11.6499 20.8306 12.2227 20.269 12.2227 19.5278C12.2227 19.1685 12.0767 18.8428 11.8296 18.5957L3.93457 10.8916L11.8296 3.1875C12.0767 2.9292 12.2227 2.60352 12.2227 2.24414C12.2227 1.51416 11.6499 0.952637 10.9199 0.952637C10.5605 0.952637 10.2461 1.07617 10.0103 1.32324L1.25049 9.89209C0.947266 10.1841 0.8125 10.5098 0.80127 10.8916Z"
                fill="black"
              />
            </Svg>
          </BackButton> */}
          <A_Icon iconName={effect.image} fill={theme.bottomBar.ic}></A_Icon>
          <HeaderText
            style={{ marginBottom: 0, marginTop: "auto", marginLeft: 18 }}
          >
            {effect.name}
          </HeaderText>
        </SingleEffectHeaderWrapper>
        <DescrWrapper direction="column">
          {supersplit()}

          {/* <TitleText style={{ color: "black", marginBottom: 16 }}>
            Об эффекте
          </TitleText> */}
          {/* <SmallText style={{ color: "black", width: 300, marginBottom: 36 }}>
            {effect.descr}
          </SmallText> */}
          {/* <TitleText style={{ color: "black", marginBottom: 16 }}>
            Как это работает
          </TitleText>
          <SmallText style={{ color: "black", width: 300 }}>
          Состояния различными способами изменяют возможности существа и могут являться следствием заклинания, классового умения, атаки чудовища или другого эффекта. Большинство состояний, вроде состояния «ослеплённый», негативны, но некоторые из них, например, «невидим», могут быть полезны.
          </SmallText> */}
        </DescrWrapper>
      </ScrollView>
    </EffectScreenWrapper>
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

export default SingleEffectsScreen;
