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
  size?: number;
}

export const A_Text = (props: TextProps) => {
  const theme = useContext(ThemeContext);
  return (
    <Text
      numberOfLines={1}
      style={{
        fontFamily: "PP",
        fontSize: props.size || 48,
        lineHeight: props.lineHeight || 35,
        letterSpacing: -0.05,
        color: props.color || theme.nav.header,
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

export const B_Text = (props: TextProps) => {
  const theme = useContext(ThemeContext);
  return (
    <Text
      style={{
        fontFamily: "PP",
        fontSize: props.size || 28,
        lineHeight: props.lineHeight || 34,
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

export const C_Text = (props: TextProps) => {
  const theme = useContext(ThemeContext);
  return (
    <Text
      style={{
        fontFamily: "PP",
        fontSize: props.size || 24,
        lineHeight: props.lineHeight || 29,
        color: props.color || theme.nav.header,
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

export const D_Text = (props: TextProps) => {
  const theme = useContext(ThemeContext);
  return (
    <Text
      style={{
        fontFamily: "PP",
        fontSize: props.size || 20,
        lineHeight: props.lineHeight || 24,
        color: props.color || theme.nav.header,
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

export const E_Text = (props: TextProps) => {
  const theme = useContext(ThemeContext);
  return (
    <Text
      style={{
        fontFamily: "PP",
        fontSize: props.size || 18,
        lineHeight: props.lineHeight || 22,
        color: props.color || theme.nav.header,
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

export const F_Text = (props: TextProps) => {
  const theme = useContext(ThemeContext);
  return (
    <Text
      style={{
        fontFamily: "PP",
        fontSize: props.size || 16,
        lineHeight: props.lineHeight || 24,
        color: props.color || theme.nav.header,
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

export const G_Text = (props: TextProps) => {
  const theme = useContext(ThemeContext);
  return (
    <Text
      style={{
        fontFamily: "PP",
        fontSize: props.size || 14,
        lineHeight: props.lineHeight || 21,
        color: props.color || theme.nav.header,
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

export const H_Text = (props: TextProps) => {
  const theme = useContext(ThemeContext);
  return (
    <Text
      style={{
        fontFamily: "PP",
        fontSize: props.size || 11,
        lineHeight: props.lineHeight || 13,
        color: props.color || theme.nav.header,
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
