import React, { useState, useEffect, useContext } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  Button,
} from "react-native";
import styled from "styled-components/native";
import axios from "axios";
import { FlexBox, HeaderText, TitleText, SmallText } from "../common";
import Svg, { Path } from "react-native-svg";
import { TouchableOpacity } from "react-native";
import { Item } from "react-native-paper/lib/typescript/components/List/List";
import { StackActions } from "@react-navigation/native";
import { NavigationContext } from "@react-navigation/native";
import A_Icon from "./A_Icon";
import A_Button from "./A_Button";

const EffectScreenWrapper = styled.View`
  background-color: ${({ theme }) => theme.appBg};
  height: 100%;
  color: white;
`;

const SingleEffectHeaderWrapper = styled(FlexBox)`
  position: relative;
  width: 100%;
  height: 350px;
  padding: 13px 13px 19px 13px;
`;

const IncButton = styled.TouchableOpacity`
  width: 60px;
  height: 60px;
  background: #383841;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0;
  left: -30px;
`;

const BottomTitleText = styled(TitleText)`
  color: white;
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

const FooterWrapper = styled(FlexBox)`
  width: 100%;
  bottom: 0;
  background-color: ${({ theme }) => theme.bottomBar.bg};
  position: absolute;
`;

interface TabProps {
  isPrima?: boolean;
  isLeft?: boolean;
  isRight?: boolean;
}

const Tab = styled(FlexBox)`
  padding-top: 6px;
  padding-bottom: 6px;
  border-top-right-radius: ${({ isLeft = false }: TabProps) =>
    isLeft ? "10px" : "0"};
  border-top-left-radius: ${({ isRight = false }: TabProps) =>
    isRight ? "10px" : "0"};
  border-bottom-right-radius: ${({ isLeft = false }: TabProps) =>
    isLeft ? "10px" : "0"};
  border-bottom-left-radius: ${({ isRight = false }: TabProps) =>
    isRight ? "10px" : "0"};
  padding-left: ${({ isPrima = false }: TabProps) => (isPrima ? "32px" : "0")};
  padding-right: ${({ isPrima = false }: TabProps) => (isPrima ? "32px" : "0")};
  background-color: ${({ isPrima = false }: TabProps) =>
    isPrima ? ({ theme }) => theme.bottomBar.tab : "transparent"};
  min-width: ${({ isPrima = false }: TabProps) => (isPrima ? "126px" : "0")};
  flex-shrink: 0;
  min-height: 100%;
  position: relative;
`;

function O_GameFooter(props: { route: any; navigation: any, handleCodeClick(): any, handleIncClick(): any}) {
  const { route, navigation, handleCodeClick, handleIncClick } = props;
  const params = route.params || {};
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = React.useState<any>([]);

  interface IGame {
    name: any;
    id: any;
    code: any;
  }

  return (
    <FooterWrapper
      alignItems="center"
      justifyContent="space-between"
      style={styles.card}
    >
      <TouchableOpacity
        onPress={() => navigation.dispatch(StackActions.popToTop())}
      >
        <Tab alignItems="center" justifyContent="center" isPrima isLeft>
          <A_Icon iconName="exit" fill="white"></A_Icon>
        </Tab>
      </TouchableOpacity>
      <Tab>
        <IncButton onPress={handleIncClick}>
          <A_Icon iconName="inc" fill="white"></A_Icon>
        </IncButton>
      </Tab>
      <TouchableOpacity
        onPress={handleCodeClick}
      >
        <Tab alignItems="center" justifyContent="center" isPrima isRight>
          <BottomTitleText>KR984</BottomTitleText>
        </Tab>
      </TouchableOpacity>
    </FooterWrapper>
  );
}

const styles = StyleSheet.create({
  card: {
    paddingBottom: 0,
  },
  shadowProp: {
    shadowColor: "#eaeaea",
    shadowOffset: { width: 5, height: -8 },
    shadowOpacity: 0.15,
    shadowRadius: 5.62,
  },
});

export default O_GameFooter;
