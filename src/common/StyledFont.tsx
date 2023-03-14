import React, { useContext } from "react";
import { Text } from "react-native";
import { ThemeContext } from "styled-components";

interface TextProps {
  children: React.ReactNode;
  color?: string;
  center?: boolean;
  uppercase?: boolean;
  offsetTop?: number;
  offsetBottom?: number;
  offsetLeft?: number;
  offsetRight?: number;
  lineHeight?: number;
}

export const NavText = (props: TextProps) => {
  const theme = useContext(ThemeContext);
  return (
    <Text
      style={{
        fontFamily: "PP",
        fontSize: 24,
        color: props.color || theme.nav.header,
        lineHeight: 24,
        textAlign: props.center ? "center" : "left",
        marginTop: props.offsetTop ? props.offsetTop : 0,
        marginBottom: props.offsetBottom ? props.offsetBottom : 0,
        marginLeft: props.offsetLeft ? props.offsetLeft : 0,
        marginRight: props.offsetRight ? props.offsetRight : 0,
        textTransform: props.uppercase ? "uppercase" : "none",
      }}
    >
      {props.children}
    </Text>
  );
};

export const NavSecondaryText = (props: TextProps) => {
  const theme = useContext(ThemeContext);
  return (
    <Text
      style={{
        fontFamily: "PP",
        fontSize: 16,
        lineHeight: 19,
        color: props.color || theme.nav.header_button,
        textAlign: props.center ? "center" : "left",
        marginTop: props.offsetTop ? props.offsetTop : 0,
        marginBottom: props.offsetBottom ? props.offsetBottom : 0,
        marginLeft: props.offsetLeft ? props.offsetLeft : 0,
        marginRight: props.offsetRight ? props.offsetRight : 0,
        textTransform: props.uppercase ? "uppercase" : "none",
      }}
    >
      {props.children}
    </Text>
  );
};

export const LittleText = (props: TextProps) => {
  return (
    <Text
      style={{
        fontFamily: "PP",
        fontSize: 18,
        color: props.color || "white",
        lineHeight: props.lineHeight || 27,
        textAlign: props.center ? "center" : "left",
        marginTop: props.offsetTop ? props.offsetTop : 0,
        marginBottom: props.offsetBottom ? props.offsetBottom : 0,
        marginLeft: props.offsetLeft ? props.offsetLeft : 0,
        marginRight: props.offsetRight ? props.offsetRight : 0,
        textTransform: props.uppercase ? "uppercase" : "none",
      }}
    >
      {props.children}
    </Text>
  );
};

export const Breadcrumb = (props: TextProps) => {
  return (
    <Text
      style={{
        fontFamily: "PP",
        fontSize: 16,
        color: props.color ? props.color : "white",
        lineHeight: props.lineHeight || 24,
        textAlign: props.center ? "center" : "left",
        marginTop: props.offsetTop ? props.offsetTop : 0,
        marginBottom: props.offsetBottom ? props.offsetBottom : 0,
        marginLeft: props.offsetLeft ? props.offsetLeft : 0,
        marginRight: props.offsetRight ? props.offsetRight : 0,
        textTransform: props.uppercase ? "uppercase" : "none",
      }}
    >
      {props.children}
    </Text>
  );
};

export const BigText = (props: TextProps) => {
  return (
    <Text
      style={{
        fontFamily: "PP",
        fontSize: 48,
        color: props.color || "white",
        lineHeight: 48,
        paddingTop: 8,
        textAlign: props.center ? "center" : "left",
        marginTop: props.offsetTop ? props.offsetTop : 0,
        marginBottom: props.offsetBottom ? props.offsetBottom : 0,
        marginLeft: props.offsetLeft ? props.offsetLeft : 0,
        marginRight: props.offsetRight ? props.offsetRight : 0,
        textTransform: props.uppercase ? "uppercase" : "none",
      }}
    >
      {props.children}
    </Text>
  );
};

export const FigureText = (props: TextProps) => {
  return (
    <Text
      style={{
        fontFamily: "PP",
        fontSize: 14,
        color: props.color || "white",
        lineHeight: 17,
        textAlign: props.center ? "center" : "left",
        marginTop: props.offsetTop ? props.offsetTop : 0,
        marginBottom: props.offsetBottom ? props.offsetBottom : 0,
        marginLeft: props.offsetLeft ? props.offsetLeft : 0,
        marginRight: props.offsetRight ? props.offsetRight : 0,
        textTransform: props.uppercase ? "uppercase" : "none",
      }}
    >
      {props.children}
    </Text>
  );
};

export const SmallText = (props: TextProps) => {
  return (
    <Text
      style={{
        fontFamily: "PP",
        fontSize: 16,
        color: props.color || "white",
        textAlign: props.center ? "center" : "left",
        marginTop: props.offsetTop ? props.offsetTop : 0,
        marginBottom: props.offsetBottom ? props.offsetBottom : 0,
        marginLeft: props.offsetLeft ? props.offsetLeft : 0,
        marginRight: props.offsetRight ? props.offsetRight : 0,
        textTransform: props.uppercase ? "uppercase" : "none",
      }}
    >
      {props.children}
    </Text>
  );
};

export const HeaderText = (props: TextProps) => {
  return (
    <Text
      style={{
        fontFamily: "PP",
        fontSize: 28,
        lineHeight: 33,
        color: props.color || "white",
        textAlign: props.center ? "center" : "left",
        marginTop: props.offsetTop ? props.offsetTop : 0,
        marginBottom: props.offsetBottom ? props.offsetBottom : 0,
        marginLeft: props.offsetLeft ? props.offsetLeft : 0,
        marginRight: props.offsetRight ? props.offsetRight : 0,
        textTransform: props.uppercase ? "uppercase" : "none",
      }}
    >
      {props.children}
    </Text>
  );
};

export const TitleText = (props: TextProps) => {
  return (
    <Text
      style={{
        fontFamily: "PP",
        fontSize: 20,
        lineHeight: 33,
        letterSpacing: 0.36,
        color: props.color || "#989899",
        textAlign: props.center ? "center" : "left",
        marginTop: props.offsetTop ? props.offsetTop : 0,
        marginBottom: props.offsetBottom ? props.offsetBottom : 0,
        marginLeft: props.offsetLeft ? props.offsetLeft : 0,
        marginRight: props.offsetRight ? props.offsetRight : 0,
        textTransform: props.uppercase ? "uppercase" : "none",
      }}
    >
      {props.children}
    </Text>
  );
};

export const NavBarText = (props: TextProps) => {
  return (
    <Text
      style={{
        fontFamily: "PP",
        fontSize: 18,
        lineHeight: 22,
        color: props.color || "#ffffff",
        textAlign: props.center ? "center" : "left",
        marginTop: props.offsetTop ? props.offsetTop : 0,
        marginBottom: props.offsetBottom ? props.offsetBottom : 0,
        marginLeft: props.offsetLeft ? props.offsetLeft : 0,
        marginRight: props.offsetRight ? props.offsetRight : 0,
        textTransform: props.uppercase ? "uppercase" : "none",
      }}
    >
      {props.children}
    </Text>
  );
};

export const HugeText = (props: TextProps) => {
  return (
    <Text
      style={{
        fontFamily: "PP",
        fontSize: 36,
        lineHeight: 43,
        color: props.color || "#ffffff",
        textAlign: props.center ? "center" : "left",
        marginTop: props.offsetTop ? props.offsetTop : 0,
        marginBottom: props.offsetBottom ? props.offsetBottom : 0,
        marginLeft: props.offsetLeft ? props.offsetLeft : 0,
        marginRight: props.offsetRight ? props.offsetRight : 0,
        textTransform: props.uppercase ? "uppercase" : "none",
      }}
    >
      {props.children}
    </Text>
  );
};

export const SuperBigText = (props: TextProps) => {
  return (
    <Text
      style={{
        fontFamily: "PP",
        fontSize: 232,
        lineHeight: 250,
        color: props.color || "#ffffff",
        textAlign: props.center ? "center" : "left",
        marginTop: props.offsetTop ? props.offsetTop : 0,
        marginBottom: props.offsetBottom ? props.offsetBottom : 0,
        marginLeft: props.offsetLeft ? props.offsetLeft : 0,
        marginRight: props.offsetRight ? props.offsetRight : 0,
        textTransform: props.uppercase ? "uppercase" : "none",
      }}
    >
      {props.children}
    </Text>
  );
};
