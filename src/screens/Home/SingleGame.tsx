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
import {
  FlexBox,
  HeaderText,
  TitleText,
  SmallText,
  NoteText,
} from "../../common";
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
import { Card } from "react-native-paper";
import A_Icon from "../../components/A_Icon";

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

const Middle = styled(FlexBox)`
  flex-wrap: no-wrap;
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
  min-height: 34px;
  margin-right: 4px;
  margin-bottom: 4px;
`;

const PlayersWrapper = styled(FlexBox)`
  background-color: #151516;
  border-radius: 12px;
  padding: 14px;
  width: 100%;
`;

function M_QrModal(props: { code: any; handleCloseCLick(): any }) {
  const { code, handleCloseCLick } = props;
  const value = `http://localhost:3000/api/v1/games/${code}`;
  const [productQRref, setProductQRref] = useState();

  return (
    <ModalBlur justifyContent="center" alignItems="center">
      <QrModalWrapper
        direction="column"
        justifyContent="center"
        alignItems="center"
        style={styles.shadowProp}
      >
        <SmallText style={{ textAlign: "center", marginBottom: 48 }}>
          Код присоединения
        </SmallText>
        <A_QrCode value={value} getRef={(c: any) => setProductQRref(c)} />
        <HeaderText style={{ marginTop: 20, marginBottom: 40 }}>
          {code}
        </HeaderText>
        <A_Button solid disabled={false} handleButtonClick={handleCloseCLick}>
          Продолжить
        </A_Button>
      </QrModalWrapper>
    </ModalBlur>
  );
}

function SingleGameScreen(props: { route: any; navigation: any }) {
  const { route, navigation } = props;
  const params = route.params || {};
  const { code = {} } = params;
  const [isVisible, setIsVisible] = useState(false);
  const [isInc, setIsInc] = useState(false);

  const handleInc = () => {
    setIsInc(true);
  };

  const [isLoading, setLoading] = useState(true);
  // const [data, setData] = useState([]);
  // const [data, setData] = useState<{name: any; id: any; code: any}[]>([]);
  const [data, setData] = React.useState<any>([]);
  // const [data, setData] = useState<IGame>([]);
  // const [testData, setTestData] = useState(null);

  // const [scode, setSCode] = React.useState("");

  // React.useEffect(() => {
  //   navigation.setOptions({
  //     tabBarVisible: false
  //   });
  //   console.log("Hidden")
  // }, []);

  const hideTabBar = () => {
    navigation.setOptions({
      tabBarVisible: false,
    });
  };
  const showTabBar = () => {
    navigation.setOptions({
      tabBarVisible: true,
    });
  };

  const handleCodeClick = () => {
    setIsVisible(true);
  };

  const handleCloseClick = () => {
    setIsVisible(false);
  };

  interface IGame {
    name: any;
    id: any;
    code: any;
  }

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/v1/games/${code}`)
      .then(({ data }) => {
        // console.log(JSON.stringify(data))
        if (data != null) {
          setData(data);
        }
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  //   data.filter((data) => data.code.match(/KR984/));
  // const result = data.filter(data.code => data.code.length === "KR984");

  // const list = () => {
  //   return data.map((game: any) => {
  //     return (
  //       <View>
  //         <HeaderText
  //           style={{ marginBottom: 0, marginTop: "auto" }}
  //           key={game.id}
  //         >
  //           {game.id}
  //         </HeaderText>
  //         <HeaderText
  //           style={{ marginBottom: 0, marginTop: "auto" }}
  //           key={game.id}
  //         >
  //           {game.name}
  //         </HeaderText>
  //         <HeaderText
  //           style={{ marginBottom: 0, marginTop: "auto" }}
  //           key={game.id}
  //         >
  //           {game.code}
  //         </HeaderText>
  //       </View>
  //     );
  //   });
  // };

  return (
    <SingleGameWrapper>
      {isVisible && (
        <M_QrModal code={code} handleCloseCLick={handleCloseClick}></M_QrModal>
      )}
      <ScrollView>
        {data.id ? (
          <>
            <CardWrapper direction="column">
              <HeaderText>{data.name}</HeaderText>
              <TitleText>{data.code}</TitleText>
              <PlayersWrapper offsetTop="14" direction="column">
                <SmallText>Игроки:</SmallText>
                <FlexBox offsetTop="14">
                  {data.players?.map((player: any, i: any) => (
                    <>
                      <PlayerWrapper>
                        <SmallText>
                          {player.id}: {player.name}
                        </SmallText>
                      </PlayerWrapper>
                    </>
                  ))}
                </FlexBox>
              </PlayersWrapper>
            </CardWrapper>
            {data.players?.map((player: any, i: any) => (
              <CardWrapper direction="column">
                <TitleText>{player.name}</TitleText>
                <PlayersWrapper
                  offsetBottom="15"
                  offsetTop="14"
                  justifyContent="center"
                >
                  <FlexBox justifyContent="center" alignItems="center">
                    <A_Icon iconName="eye" fill="white" />
                    <HeaderText style={{ marginLeft: 8 }}>
                      {player.perc}
                    </HeaderText>
                  </FlexBox>
                  <Middle
                    justifyContent="center"
                    alignItems="center"
                    offsetLeft="42"
                    offsetRight="42"
                  >
                    <A_Icon iconName="lupa" fill="white" />
                    <HeaderText style={{ marginLeft: 8 }}>
                      {player.inv}
                    </HeaderText>
                  </Middle>
                  <FlexBox justifyContent="center" alignItems="center">
                    <A_Icon iconName="chel" fill="white" />
                    <HeaderText style={{ marginLeft: 8 }}>
                      {player.ins}
                    </HeaderText>
                  </FlexBox>
                </PlayersWrapper>
                <PlayersWrapper direction="column" offsetBottom="15">
                  <NoteText>Состояния</NoteText>
                  <FlexBox direction="row" offsetTop="10">
                    <PlayerWrapper offsetRight="6">
                      <SmallText>Отравлен</SmallText>
                    </PlayerWrapper>
                    <PlayerWrapper offsetRight="6">
                      <SmallText>Очарован</SmallText>
                    </PlayerWrapper>
                    <PlayerWrapper offsetRight="6">
                      <A_Icon fill="white" iconName="plus"></A_Icon>
                    </PlayerWrapper>
                  </FlexBox>
                </PlayersWrapper>
                <NoteText>Языки</NoteText>
                <FlexBox offsetTop="10">
                  <SmallText>{player.languages}</SmallText>
                </FlexBox>
              </CardWrapper>
            ))}

            {isInc && (
              <>
                {data.monsters?.map((monster: any, i: any) => (
                  <CardWrapper direction="column">
                    <TitleText style={{ color: "#B04141" }}>
                      {monster.name}
                    </TitleText>
                    <PlayersWrapper
                      offsetBottom="15"
                      offsetTop="14"
                      justifyContent="center"
                    >
                      <FlexBox justifyContent="center" alignItems="center">
                        <A_Icon iconName="heart" fill="white" />
                        <HeaderText style={{ marginLeft: 8 }}>
                          {monster.hp}
                        </HeaderText>
                      </FlexBox>
                    </PlayersWrapper>
                  </CardWrapper>
                ))}
              </>
            )}
          </>
        ) : (
          <Error
            errorid="404"
            handleButtonClick={() =>
              navigation.dispatch(StackActions.popToTop())
            }
          ></Error>
        )}
      </ScrollView>
      <O_GameFooter
        route={route}
        navigation={navigation}
        handleCodeClick={handleCodeClick}
        handleIncClick={handleInc}
      />
    </SingleGameWrapper>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 24,
  },
  shadowProp: {
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
});

export default SingleGameScreen;
