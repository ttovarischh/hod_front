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
import { FlexBox, HeaderText, TitleText, SmallText } from "../../common";
import Svg, { Path } from "react-native-svg";
import { TouchableOpacity } from "react-native";
import { Item } from "react-native-paper/lib/typescript/components/List/List";
import Error from "../Errors/Error";
import { StackActions } from "@react-navigation/native";
import { NavigationContext } from "@react-navigation/native";
import O_GameFooter from "../../components/O_GameFooter";
import A_Button from "../../components/A_Button";
import { BlurView } from "expo-blur";
import A_QrCode from "../../components/A_QrCode";

const SingleGameWrapper = styled.View`
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

const ModalBlur = styled(FlexBox)`
  position: absolute;
  background: rgba(31, 31, 31, 0.5);
  // opacity: 0.8;
  width: 100%;
  height: 100%;
  z-index: 100;
`;

const QrModalWrapper = styled(FlexBox)`
  position: absolute;
  padding: 19px;
  padding-top: 12px;
  background: red;
  width: 60%;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.bottomBar.bg};
`;

const CardWrapper = styled(FlexBox)`
  background-color: ${({ theme }) => theme.card.bg};
  width: 100%;
  margin-bottom: 20px;
  border-radius: 12px;
  padding: 13px;
  padding-bottom: 16px;
`;

const PlayerWrapper = styled(FlexBox)`
  background-color: ${({ theme }) => theme.button.solid};
  border-radius: 20px;
  padding: 8px 20px 8px 20px;
`;

const PlayersWrapper = styled(FlexBox)`
  background-color: #151516;
  border-radius: 12px;
  padding: 14px;
  width: 100%;
`;


function SmallSingleGame(props: { route: any; navigation: any }) {
  const { route, navigation } = props;
  const params = route.params || {};
  const { game = {} } = params;
  const [data, setData] = React.useState<any>([]);

  return (
    <SingleGameWrapper>
      <ScrollView>
        <>
            <CardWrapper direction="column">
              <HeaderText>{game.name}</HeaderText>
              <TitleText>{game.code}</TitleText>
              <PlayersWrapper offsetTop="14" direction="column">
                <SmallText>Игроки:</SmallText>
                <FlexBox offsetTop="14">
                  {game.players?.map((player: any, i: any) => (
                    <>
                      <PlayerWrapper key={player.id}>
                        <SmallText>
                          {player.id}: {player.name}
                        </SmallText>
                      </PlayerWrapper>
                    </>
                  ))}
                </FlexBox>
              </PlayersWrapper>
            </CardWrapper>
          </>
      </ScrollView>
    </SingleGameWrapper>
  );
}

export default SmallSingleGame;
