import React from "react";
import { Button, Text, Animated } from "react-native";
import styled from "styled-components/native";
import { SmallText, FlexBox, HeaderText } from "../../common";
import Svg, { Path } from "react-native-svg";
import A_Icon from "../../components/A_Icon";

const SplashWrapper = styled(FlexBox)`
  background-color: ${({ theme }) => theme.appBg};
  height: 100%;
  color: white;
  padding-left: 14px;
  padding-right: 14px;
  padding-top: 3px;
`;

const DiceWrapper = styled(FlexBox)`
  background-color: red;
  height: 300px;
  width: 100%;
`;

const BackButton = styled.TouchableOpacity`
  width: 50px;
  height: 50px;
  background-color: ${({ theme }) => theme.button.small};
  border-radius: 100%;
  padding-right: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: rotate(180deg);
  margin-top: 24px;
`;

const Img = styled.Image`
  width: 356;
  height: 324px;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  margin-top: 32px;
  margin-bottom: 36px;
`;

function Splash(props: any) {
  return (
    <SplashWrapper
      alignItems="center"
      direction="column"
      justifyContent="space-between"
    >
      <A_Icon iconName="logo" fill="white"></A_Icon>
      <FlexBox direction="column" alignItems="center">
        <HeaderText>Привет,</HeaderText>
        <HeaderText>Гоблин Боблин!</HeaderText>
        <Img source={require("../../../assets/images/dice.png")} />
        <SmallText>Готов сделать свой первый ход?</SmallText>
      </FlexBox>
      <BackButton onPress={props.handleSplash}>
        <Svg width="13" height="21" viewBox="0 0 13 21" fill="none">
          <Path
            d="M0.80127 10.8916C0.80127 11.2734 0.947266 11.5991 1.25049 11.8911L10.0103 20.46C10.2461 20.707 10.5605 20.8306 10.9199 20.8306C11.6499 20.8306 12.2227 20.269 12.2227 19.5278C12.2227 19.1685 12.0767 18.8428 11.8296 18.5957L3.93457 10.8916L11.8296 3.1875C12.0767 2.9292 12.2227 2.60352 12.2227 2.24414C12.2227 1.51416 11.6499 0.952637 10.9199 0.952637C10.5605 0.952637 10.2461 1.07617 10.0103 1.32324L1.25049 9.89209C0.947266 10.1841 0.8125 10.5098 0.80127 10.8916Z"
            fill="black"
          />
        </Svg>
      </BackButton>
    </SplashWrapper>
  );
}

export default Splash;
