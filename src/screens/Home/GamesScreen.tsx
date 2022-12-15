import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, FlatList } from "react-native";
import { FlexBox, HeaderText, TitleText, SmallText } from "../../common";
import styled from "styled-components/native";
import axios from "axios";
import { Loader } from "../../common";
import Svg, { Path } from "react-native-svg";

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

const GameLink = styled.TouchableOpacity`
  width: 100%;
`;

function GamesScreen(props: { route: any; navigation: any }) {
  const { route, navigation } = props;
  const params = route.params || {};
  const { data = {} } = params;
  const [loaded, setLoaded] = useState(false);

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
      <HeaderText style={{ marginBottom: 24 }}>Активные игры</HeaderText>
      <FlatList
        data={data}
        // keyExtractor={({ id, }: { id: number; }, index: number, indexInner: any) => id}
        keyExtractor={(item: IUser) => item.id}
        renderItem={({ item }) => (
          <>
            <CardWrapper direction="column" key={item.id}>
              <GameLink
                onPress={() => navigation.push("Test", { game: item })}
              >
                {loaded ? null : (
                  <Loader justifyContent="center" alignItems="center">
                    <Svg width="50" height="48" viewBox="0 0 50 48" fill="none">
                      <Path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M23.68 0C24.9716 0 26.0198 1.04029 26.0198 2.3254C26.0198 3.61051 24.973 4.6508 23.68 4.6508C22.3883 4.6508 21.3401 3.61051 21.3401 2.3254C21.3401 1.04172 22.3869 0 23.68 0V0ZM35.0135 0.397671C37.6645 0.397671 39.8134 2.53317 39.8134 5.16791C39.8134 7.80266 37.6646 9.93816 35.0135 9.93816C32.3624 9.93816 30.2137 7.80266 30.2137 5.16791C30.2137 2.53317 32.3624 0.397671 35.0135 0.397671V0.397671ZM43.4143 9.39855C45.9293 9.39855 47.9696 11.4244 47.9696 13.9239C47.9696 16.4234 45.9312 18.4492 43.4143 18.4492C40.8993 18.4492 38.8609 16.4234 38.8609 13.9239C38.8609 11.4244 40.8993 9.39855 43.4143 9.39855ZM45.6927 21.5288C48.0717 21.5288 50 23.4453 50 25.8096C50 28.1739 48.0717 30.0919 45.6927 30.0919C43.3137 30.0919 41.3838 28.1739 41.3838 25.8096C41.3838 23.4453 43.3137 21.5288 45.6927 21.5288ZM41.1163 32.9823C43.3589 32.9823 45.1773 34.7895 45.1773 37.0197C45.1773 39.2485 43.3589 41.0571 41.1163 41.0571C38.8718 41.0571 37.0539 39.2499 37.0539 37.0197C37.0539 34.7909 38.8723 32.9823 41.1163 32.9823ZM31.1572 40.1843C33.2638 40.1843 34.9732 41.8817 34.9732 43.9767C34.9732 46.0703 33.2653 47.7692 31.1572 47.7692C29.0506 47.7692 27.3412 46.0718 27.3412 43.9767C27.3412 41.8817 29.0492 40.1843 31.1572 40.1843V40.1843ZM18.9903 40.904C20.9623 40.904 22.5603 42.492 22.5603 44.452C22.5603 46.4119 20.9624 48 18.9903 48C17.0182 48 15.4202 46.412 15.4202 44.452C15.4202 42.4921 17.0181 40.904 18.9903 40.904V40.904ZM8.51707 34.9804C10.3531 34.9804 11.8407 36.4603 11.8407 38.2835C11.8407 40.1082 10.3516 41.5866 8.51707 41.5866C6.68103 41.5866 5.19348 40.1082 5.19348 38.2835C5.19348 36.4588 6.68257 34.9804 8.51707 34.9804ZM3.07714 24.4031C4.77718 24.4031 6.15428 25.7721 6.15428 27.4632C6.15428 29.1527 4.77679 30.5213 3.07714 30.5213C1.3771 30.5213 0 29.1524 0 27.4632C0 25.7736 1.37749 24.4031 3.07714 24.4031V24.4031ZM4.4091 12.6208C5.97275 12.6208 7.24028 13.8801 7.24028 15.4345C7.24028 16.9885 5.97314 18.2497 4.4091 18.2497C2.84545 18.2497 1.57648 16.9904 1.57648 15.4345C1.57648 13.8805 2.84362 12.6208 4.4091 12.6208ZM12.1015 3.4863C13.5291 3.4863 14.6876 4.63778 14.6876 6.05653C14.6876 7.47537 13.529 8.62532 12.1015 8.62532C10.6738 8.62532 9.51529 7.47537 9.51529 6.05653C9.51529 4.63769 10.6739 3.4863 12.1015 3.4863Z"
                        fill="#787878"
                      />
                    </Svg>
                  </Loader>
                )}
                <Img
                  source={require("../../../assets/images/placeholder.png")}
                  onLoad={() => setLoaded(true)}
                />
                <EffectInfoWrapper direction="column">
                  <TitleText style={{ marginBottom: 8 }}>{item.name}</TitleText>
                  <MoreGameInfo justifyContent="space-between">
                    <SmallText>{item.code}</SmallText>
                    <FlexBox>
                      <SmallText>Players: {item.players.length}</SmallText>
                      <SmallText
                        style={{ width: 84, marginLeft: 24 }}
                        numberOfLines={1}
                      >
                        {item.created_at}
                      </SmallText>
                    </FlexBox>
                  </MoreGameInfo>
                </EffectInfoWrapper>
              </GameLink>
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
