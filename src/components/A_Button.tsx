import React from "react";
import styled from "styled-components/native";

type ButtonProps = {
  children: React.ReactNode;
  bright?: boolean;
  handleButtonClick(): any;
  disabled?: boolean;
  offsetTop?: number;
  offsetBottom?: number;
};

const A_ButtonWrapper = styled.TouchableOpacity`
  width: 100%;
  height: 125px;
  background: ${(props) =>
    props.disabled
      ? props.theme.button.disabled_fill
      : props.theme.button.bright};
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const A_HollowButtonWrapper = styled(A_ButtonWrapper)`
  background: ${(props) =>
    props.disabled
      ? props.theme.button.disabled_fill
      : props.theme.button.dull};
  margin-bottom: 0px;
  border: 1px solid;
  border-color: ${(props) =>
    props.disabled ? "transparent" : props.theme.button.dull_border};
`;

const A_ButtonText = styled.Text`
  font-size: 24;
  color: ${(props) =>
    props.disabled
      ? props.theme.button.disabled_text
      : props.theme.button.bright_text};
`;

const A_HollowButtonText = styled.Text`
  font-size: 24;
  color: ${(props) =>
    props.disabled
      ? props.theme.button.disabled_text
      : props.theme.button.dull_text};
`;

const A_Button = (props: ButtonProps) => {
  if (props.bright) {
    return (
      <A_ButtonWrapper
        onPress={props.disabled ? undefined : props.handleButtonClick}
        disabled={props.disabled}
        style={{
          marginBottom: props.offsetBottom || 8,
          marginTop: props.offsetTop || 0,
        }}
      >
        <A_ButtonText style={{ fontFamily: "PP" }} disabled={props.disabled}>
          {props.children}
        </A_ButtonText>
      </A_ButtonWrapper>
    );
  } else {
    return (
      <A_HollowButtonWrapper
        onPress={props.disabled ? undefined : props.handleButtonClick}
        disabled={props.disabled}
        style={{
          marginBottom: props.offsetBottom || 0,
          marginTop: props.offsetTop || 0,
        }}
      >
        <A_HollowButtonText
          style={{ fontFamily: "PP" }}
          disabled={props.disabled}
        >
          {props.children}
        </A_HollowButtonText>
      </A_HollowButtonWrapper>
    );
  }
  return <></>;
};

export default A_Button;
