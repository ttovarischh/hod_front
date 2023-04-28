import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import styled from "styled-components/native";
import { FlexBox, F_Text } from "../../common";
import A_Icon from "../Atoms/A_Icon";

const GameButton = styled.TouchableOpacity`
  display: flex;
  width: 130px;
  height: 68px;
  border-radius: 50px;
  background: #313131;
  opacity: 0.9;
  margin-left: auto;
  justify-content: center;
  align-content: center;
  margin-right: auto;
`;

const SmallGameButton = styled.TouchableOpacity`
  display: flex;
  width: 77px;
  height: 32px;
  border-radius: 20px;
  background: #313131;
  opacity: 0.9;
  justify-content: center;
  align-content: center;
  position: absolute;
  left: 44%;
  top: -54px;
`;

function O_GameFooter(props: { fight?: boolean; handleConcClick?: any }) {
  return (
    <View style={styles.bottomPart}>
      <FlexBox
        style={{
          paddingLeft: 12,
          paddingRight: 12,
        }}
      >
        {props.fight && (
          <GameButton onPress={() => console.log("Plus clicked")}>
            <FlexBox
              style={{
                height: "100%",
                width: "100%",
                alignContent: "center",
              }}
              alignItems="center"
              justifyContent="center"
            >
              <A_Icon iconName="plusBig" />
            </FlexBox>
          </GameButton>
        )}
        <GameButton onPress={props.handleConcClick}>
          <FlexBox
            style={{
              height: "100%",
              width: "100%",
              alignContent: "center",
            }}
            alignItems="center"
            justifyContent="center"
          >
            <A_Icon
              iconName={props.fight ? "clockFilled" : "clock"}
              fill={props.fight ? "yellow" : "white"}
            ></A_Icon>
          </FlexBox>
        </GameButton>
        {props.fight && (
          <SmallGameButton onPress={() => console.log("Back clicked")}>
            <FlexBox
              style={{
                height: "100%",
                width: "100%",
                alignContent: "center",
              }}
              alignItems="center"
              justifyContent="center"
            >
              <F_Text>Назад</F_Text>
            </FlexBox>
          </SmallGameButton>
        )}
        {props.fight && (
          <GameButton onPress={() => console.log("Arrow clicked")}>
            <FlexBox
              style={{
                height: "100%",
                width: "100%",
                alignContent: "center",
              }}
              alignItems="center"
              justifyContent="center"
            >
              <A_Icon iconName="arrow" />
            </FlexBox>
          </GameButton>
        )}
      </FlexBox>
    </View>
  );
}

export default O_GameFooter;

const styles = StyleSheet.create({
  bottomPart: {
    position: "absolute",
    width: "100%",
    backgroundColor: "transparent",
    height: 116,
    bottom: 0,
    zIndex: 10000,
  },
});
