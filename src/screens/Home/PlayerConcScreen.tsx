import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import styled, { ThemeContext } from "styled-components/native";
import { FlexBox, Breadcrumb, LittleText, BigText } from "../../common";
import A_Icon from "../../components/A_Icon";
import A_Header from "../../components/A_Header";

const EffectScreenWrapper = styled(FlexBox)`
  background-color: ${({ theme }) => theme.appBg};
  flex: 1;
  justify-content: flex-end;
  color: white;
`;

const CardWrapper = styled(FlexBox)`
  background-color: ${({ theme }) => theme.card.bg};
  width: 100%;
  border-radius: 20px;
  padding: 12px;
  padding-top: 24px;
  z-index: 1000;
`;

const AvatarWrapper = styled(FlexBox)`
  width: 388px;
  height: 388px;
  border-radius: 200%;
  position: absolute;
  left: 4.6%;
  top: 18px;
  justify-content: center;
  align-content: flex-end;
  z-index: 2000;
  overflow: hidden;
`;

const BlurredAvatarWrapper = styled(AvatarWrapper)`
  width: 463px;
  height: 463px;
  background: #00003e;
  border-radius: 400%;
  z-index: 100;
  left: -4%;
  top: 0px;
  align-content: center;
  overflow: hidden;
`;

const PlayerAvatar = styled.Image`
  width: 100%;
  height: 100%;
`;

const BlurredPlayerAvatar = styled(PlayerAvatar)`
  width: 100%;
  height: 100%;
  opacity: 0.2;
`;

const CardHalfRow = styled(FlexBox)`
  height: 57px;
  flex: 1;
  background: #0e0e0e;
  border-radius: 20px;
  padding-left: 12px;
  padding-right: 12px;
`;

const CardHalfRowWrapper = styled(FlexBox)`
  padding-bottom: 12px;
  margin-bottom: 12px;
`;

const CardRow = styled(FlexBox)`
  width: 100%;
  background: #0e0e0e;
  border-radius: 20px;
  padding: 12px;
  flex-direction: column;
`;

const PlayerWrapper = styled(FlexBox)`
  background-color: #edf2dc;
  border-radius: 20px;
  padding: 8px 20px 8px 20px;
  min-height: 34px;
  margin-right: 4px;
  margin-bottom: 4px;
`;

const CifWrapper = styled(FlexBox)`
  width: 100%;
  background: #0e0e0e;
  border-radius: 25px;
  flex: 1;
  padding-top: 10px;
  padding-bottom: 10px;
  align-content: center;
  align-items: center;
`;

export default function PlayerConcScreen(props: {
  route: any;
  navigation: any;
}) {
  const { route, navigation } = props;
  const params = route.params || {};
  const { player = {} } = params;
  const theme = useContext(ThemeContext);

  const langs = player.language.split(" ");
  const list = () => {
    return langs.map((sublang: any) => {
      return (
        <View style={styles.tag}>
          <Text style={{ fontSize: 18, color: "#EDF2DC" }}>{sublang}</Text>
        </View>
      );
    });
  };

  return (
    <>
      <A_Header
        center={`Персонаж#${player.id}`}
        left="Назад"
        handleLeftPress={() => navigation.goBack()}
      ></A_Header>
      <EffectScreenWrapper direction="column">
        <CardWrapper direction="column">
          <CardHalfRowWrapper direction="row" style={styles.brd}>
            <CardHalfRow direction="column" justifyContent="center">
              <LittleText lineHeight={20} color="white">
                {player.name}
              </LittleText>
              <Breadcrumb lineHeight={16} color="#5D5D5D">
                {player.username ? player.username : "no username"}
              </Breadcrumb>
            </CardHalfRow>
          </CardHalfRowWrapper>
          <CardRow>
            <LittleText color="#717171">Состояния</LittleText>
            <FlexBox direction="row" offsetTop="9">
              <PlayerWrapper offsetRight="6">
                <A_Icon fill="#1A1A1A" iconName="plus"></A_Icon>
              </PlayerWrapper>
            </FlexBox>
          </CardRow>
          <FlexBox>
            <CifWrapper justifyContent="center">
              <FlexBox offsetRight="8">
                <A_Icon iconName="eye" fill="#EDF2DC" />
              </FlexBox>
              <BigText color="white">{player.inv}</BigText>
            </CifWrapper>
            <CifWrapper justifyContent="center">
              <FlexBox offsetRight="8">
                <A_Icon iconName="eye" fill="#EDF2DC" />
              </FlexBox>
              <BigText color="white">{player.ins}</BigText>
            </CifWrapper>
            <CifWrapper justifyContent="center">
              <FlexBox offsetRight="8">
                <A_Icon iconName="eye" fill="#EDF2DC" />
              </FlexBox>
              <BigText color="white">{player.perc}</BigText>
            </CifWrapper>
          </FlexBox>
          <CardRow offsetBottom="34">
            <LittleText color="#717171">Языки</LittleText>
            <FlexBox offsetTop="9">
              <FlexBox offsetRight="8">{list()}</FlexBox>
            </FlexBox>
          </CardRow>
        </CardWrapper>
        <BlurredAvatarWrapper>
          <BlurredPlayerAvatar
            source={{
              uri: `${player.imagestring}`,
            }}
          />
        </BlurredAvatarWrapper>
        <AvatarWrapper>
          <PlayerAvatar
            source={{
              uri: `${player.imagestring}`,
            }}
          />
        </AvatarWrapper>
      </EffectScreenWrapper>
    </>
  );
}

const styles = StyleSheet.create({
  brd: {
    borderBottomColor: "#282828",
    borderBottomWidth: 1,
  },
  tag: {
    flexDirection: "row",
    alignSelf: "flex-start",
    backgroundColor: "#383838",
    padding: 8,
    paddingLeft: 12,
    paddingRight: 12,
    borderRadius: 10,
    alignItems: "baseline",
  },
});
