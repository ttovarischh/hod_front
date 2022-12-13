import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, FlatList } from "react-native";
import { FlexBox, HeaderText, TitleText, SmallText } from "../../common";
import styled from "styled-components/native";
import axios from "axios";

const HomeScreenWrapper = styled.View`
background-color: ${({ theme }) => theme.appBg};
  height: 100%;
  color: white;
  padding-left: 14px;
  padding-right: 14px;
  padding-top: 3px;
`;

const EffectLink = styled.TouchableOpacity`
  width: 100%;
`;

const EffectInfoWrapper = styled(FlexBox)`
  padding: 11px 13px 19px 13px;
`;

const MoreGameInfo = styled(FlexBox)`
  width: 100%;
`;

const CardWrapper = styled(FlexBox)`
  background-color: ${({ theme }) => theme.card.bg};
  width: 100%;
  margin-bottom: 20px;
  border-radius: 12px;
  //   overflow: hidden;
  //   padding: 11px 13px 19px 13px;
`;

const Img = styled.Image`
  width: 100%;
  height: 200px;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
`;

function GamesScreen(props: { route: any; navigation: any }) {
  const { route, navigation } = props;
  const params = route.params || {};
  const { data = {} } = params;

  interface IUser {
    id: string;
    index: string;
    indexInner: any;
    name: string;
    code: string;
    created_at: any;
    players: any;
  }

  return (
    <HomeScreenWrapper>
      <HeaderText style={{marginBottom: 24}}>Активные игры</HeaderText>
      <FlatList
        data={data}
        // keyExtractor={({ id, }: { id: number; }, index: number, indexInner: any) => id}
        keyExtractor={(item: IUser) => item.id}
        renderItem={({ item }) => (
          <>
            <CardWrapper direction="column" key={item.id}>
              <Img source={require('../../../assets/images/placeholder.png')} />
              <EffectInfoWrapper direction="column">
                <TitleText style={{ marginBottom: 8 }}>{item.name}</TitleText>
                <MoreGameInfo justifyContent="space-between">
                    <SmallText>{item.code}</SmallText>
                    <FlexBox>
                        <SmallText>Players: {item.players.length}</SmallText>
                        <SmallText style={{width: 84, marginLeft: 24}} numberOfLines={1}>{item.created_at}</SmallText>
                    </FlexBox>
                </MoreGameInfo>
              </EffectInfoWrapper>
            </CardWrapper>
          </>
        )}
      />
    </HomeScreenWrapper>
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#eaeaea",
  },
});

export default GamesScreen;
