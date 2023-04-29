import React, { useRef, useContext } from "react";
import { ThemeContext } from "styled-components/native";
import styled from "styled-components/native";
import { FlexBox } from "../../common";
import { Animated } from "react-native";
import { StyleSheet } from "react-native";
import { TextInputProps } from "react-native";
import A_Icon from "./A_Icon";

interface InputProps extends TextInputProps {
  handleChange: any;
  placeholder: string;
  label: string;
  isError?: boolean;
  value?: any;
  secure?: boolean;
  iconName?: string;
  iconWidth?: any;
  iconHeight?: any;
  onSubmitEditing?: any;
}

const FlyingLabelText = styled.Text`
  font-size: 18px;
  line-height: 18px;
  letter-spacing: -0.011em;
  margin: 0;
  padding: 0;
  pointer-events: none;
`;

const InputWrapper = styled.TextInput`
  background-color: ${({ theme }) => theme.input.fill};
  border: 1px solid #373737;
  outline: none;
  padding-bottom: 18px;
  padding-left: 16px;
  width: 100%;
  height: 57px;
  border-radius: 12px;
  font-size: 18px;
  line-height: 22px;
  letter-spacing: -0.011em;
  color: ${({ theme }) => theme.input.text};
`;

const InputFlexBox = styled(FlexBox)`
  position: relative;
  width: 100%;
  margin-bottom: 6px;
`;

const IconWrapper = styled(FlexBox)`
  position: absolute;
  right: 20px;
  top: 28%;
`;

const A_Input = ({
  placeholder,
  label,
  isError,
  handleChange,
  value,
  secure,
  iconName,
  iconWidth,
  iconHeight,
  onSubmitEditing,
  ...rest
}: InputProps) => {
  const theme = useContext(ThemeContext);
  const movePlaceholder = () => {
    console.log("focused");
    moveTextTop();
  };

  const onBlurHandler = () => {
    if (value === "") {
      moveTextBottom();
    }
  };

  const moveTextTop = () => {
    Animated.timing(moveText, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const moveTextBottom = () => {
    Animated.timing(moveText, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const moveText = useRef(new Animated.Value(0)).current;

  const yVal = moveText.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 10],
  });

  const xVal = moveText.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -28],
  });

  const size = moveText.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.7],
  });

  const animStyle = {
    transform: [
      {
        translateY: yVal,
      },
      {
        translateX: xVal,
      },
      {
        scale: size,
      },
    ],
  };

  return (
    <InputFlexBox direction="column">
      <InputWrapper
        placeholder={placeholder}
        value={value}
        secureTextEntry={secure}
        placeholderTextColor="#262626"
        onChangeText={handleChange}
        onFocus={movePlaceholder}
        onBlur={onBlurHandler}
        style={{ color: isError ? theme.input.err_text : theme.input.text }}
        autoCapitalize="none"
        autoComplete="off"
        autoCorrect={false}
        onSubmitEditing={onSubmitEditing}
        {...rest}
      ></InputWrapper>
      <Animated.View style={[styles.animatedStyle, animStyle]}>
        <FlyingLabelText
          style={{ color: isError ? theme.input.err_text : theme.input.text }}
        >
          {label}
        </FlyingLabelText>
      </Animated.View>
      {iconName && (
        <IconWrapper>
          <A_Icon
            iconName={iconName}
            width={iconWidth || 20}
            height={iconHeight || 27}
            fill="#EDF2DC"
            strokeWidth={1.5}
          />
        </IconWrapper>
      )}
    </InputFlexBox>
  );
};

export default A_Input;

const styles = StyleSheet.create({
  animatedStyle: {
    top: 22,
    left: 15,
    position: "absolute",
    zIndex: 10000,
    width: 200,
    pointerEvents: "none",
  },
});
