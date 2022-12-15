import React, { useState, useEffect, useContext } from "react";
import { Text, View, Image, StyleSheet, ScrollView } from "react-native";
import styled from "styled-components/native";
import axios from "axios";
import { FlexBox, HeaderText, TitleText, SmallText } from "../../common";
import Svg, { Path } from "react-native-svg";
import { TouchableOpacity } from "react-native";
import A_Icon from "../../components/A_Icon";
import A_Button from "../../components/A_Button";

const ErrorScreen = styled.View`
  background-color: ${({ theme }) => theme.appBg};
  height: 100%;
  min-height: 675px; 
  margin-bottom: 0;
  margin-top: 0;
`;

const ErrorWrapper = styled(FlexBox)`
  height: 100%;
  color: white;
`;

const SingleEffectHeaderWrapper = styled(FlexBox)`
  position: relative;
  width: 100%;
  height: 350px;
  padding: 13px 13px 19px 13px;
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
  background: #cfcfcf;
  padding: 20px 13px 19px 13px;
  border-top-right-radius: 12px;
  border-top-left-radius: 12px;
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

type PropsT = {
  errorid?: string;
  handleButtonClick(): any;
};

const Error = (props: PropsT) => {
  if (props.errorid == "404") {
    return (
      <>
        <ErrorScreen>
          <ErrorWrapper
            justifyContent="center"
            alignItems="center"
            direction="column"
          >
            <HeaderText>404</HeaderText>
            <HeaderText style={{marginBottom: 28}}>Такой игры нет!</HeaderText>
            <A_Icon iconName="error" fill="white"></A_Icon>
            <SmallText style={{marginTop: 32, textAlign: "center", maxWidth: 300, marginBottom: 32}}>
              Кажется, вы ввели неверный код! Проверьте еще раз или...
            </SmallText>
            <A_Button solid handleButtonClick={props.handleButtonClick}>Создать игру</A_Button>
          </ErrorWrapper>
        </ErrorScreen>
      </>
    );
  } else if (props.errorid == "505") {
    return <TitleText>505</TitleText>;
  }
  return <></>;
};

export default Error;
