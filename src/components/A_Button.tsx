import React, { FC } from "react";
import Svg, { Path } from "react-native-svg";
import { TouchableOpacity } from "react-native-gesture-handler";
import styled from "styled-components/native";
import { StyleSheet, Text, View, Button } from "react-native";
import {
  FlexBox,
  HeaderText,
  TitleText,
  SmallText,
  ButtonText,
} from "../common";

type ButtonProps = {
  children: React.ReactNode;
  solid?: boolean;
  handleButtonClick(): any;
  disabled?: boolean;
};

const A_ButtonWrapper = styled.TouchableOpacity`
  width: 100%;
  background: ${({ theme }) => theme.button.solid};
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 13px;
  padding-top: 12px;
  padding-bottom: 12px;
`;

const A_HollowButtonWrapper = styled(A_ButtonWrapper)`
  background: transparent;
  border: 1px solid ${({ theme }) => theme.button.border};
  margin-bottom: 0px;
`;

const A_ButtonText = styled(ButtonText)`
//   color: #989899;
  color:${props => props.disabled ? "#989899" : "white"};
`;

const A_Button = (props: ButtonProps) => {
  if (props.solid) {
    return (
      <A_ButtonWrapper onPress={props.handleButtonClick}>
        <A_ButtonText disabled={props.disabled}>{props.children}</A_ButtonText>
      </A_ButtonWrapper>
    );
  } else {
    return (
      <A_HollowButtonWrapper onPress={props.handleButtonClick}>
        <A_ButtonText disabled={props.disabled}>{props.children}</A_ButtonText>
      </A_HollowButtonWrapper>
    );
  }
  return <></>;
};

export default A_Button;
