import React, { useContext } from "react";
import { Text, StyleSheet } from "react-native";
import styled, { ThemeContext } from "styled-components/native";
import { BigText, Breadcrumb, FlexBox, LittleText } from "../common";
import A_Icon from "./A_Icon";
import { TouchableOpacity } from "react-native-gesture-handler";
import A_Input from "./A_Input";

type CardProps = {
  type?: string;
  key?: any;
  avatar?: any;
  name?: string;
  username?: string;
  inv: any;
  ins: any;
  perc: any;
  trueVal1?: any;
  trueVal2?: any;
  trueVal3?: any;
  trueVal4?: any;
  trueVal5?: any;
  children?: React.ReactNode;
  onCardPress?: any;
  condition?: any;
  handleInitiativeChange?: any;
  initiative?: any;
  initiativeVal?: any;
};

const CifWrapper = styled(FlexBox)`
  width: 100%;
  background: #0e0e0e;
  border-radius: 25px;
  flex: 1;
  align-content: center;
  align-items: center;
  max-height: 57px;
`;

const CardRow = styled(FlexBox)`
  width: 100%;
  background: #0e0e0e;
  border-radius: 20px;
  padding: 12px;
  flex-direction: column;
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

const CardWrapper = styled(FlexBox)`
  background-color: ${({ theme }) => theme.card.bg};
  width: 100%;
  margin-bottom: 8px;
  border-radius: 20px;
  padding: 15px;
`;

const PlayerWrapper = styled(FlexBox)`
  background-color: #edf2dc;
  border-radius: 20px;
  padding: 8px 20px 8px 20px;
  min-height: 34px;
  margin-right: 4px;
  margin-bottom: 4px;
`;

const PlayerAvatarWrapper = styled(FlexBox)`
  background-color: #0e0e0e;
  width: 57px;
  height: 57px;
  border-radius: 20px;
  overflow: hidden;
`;

const PlayerAvatar = styled.Image`
  width: 57px;
  height: 57px;
`;

const O_Card = ({
  type,
  key,
  avatar,
  name,
  username,
  inv,
  ins,
  perc,
  trueVal1,
  trueVal2,
  trueVal3,
  trueVal4,
  trueVal5,
  children,
  onCardPress,
  condition,
  handleInitiativeChange,
  initiative,
  initiativeVal,
  ...rest
}: CardProps) => {
  const theme = useContext(ThemeContext);
  if (type == "master") {
    return (
      <CardWrapper direction="column" key={key}>
        <CardHalfRowWrapper direction="row" style={styles.brd}>
          <PlayerAvatarWrapper>
            <PlayerAvatar
              source={{
                uri: `${avatar}`,
              }}
            />
          </PlayerAvatarWrapper>
          <CardHalfRow direction="column" justifyContent="center">
            <LittleText lineHeight={20} color="white">
              {name}
            </LittleText>
            <Breadcrumb lineHeight={16} color="#5D5D5D">
              {username ? username : "no username"}
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
            <BigText color="white">{inv}</BigText>
          </CifWrapper>
          <CifWrapper justifyContent="center">
            <FlexBox offsetRight="8">
              <A_Icon iconName="eye" fill="#EDF2DC" />
            </FlexBox>
            <BigText color="white">{ins}</BigText>
          </CifWrapper>
          <CifWrapper justifyContent="center">
            <FlexBox offsetRight="8">
              <A_Icon iconName="eye" fill="#EDF2DC" />
            </FlexBox>
            <BigText color="white">{perc}</BigText>
          </CifWrapper>
        </FlexBox>
        <CardRow>
          <LittleText color="#717171">Языки</LittleText>
          <FlexBox offsetTop="9">{children}</FlexBox>
        </CardRow>
        {/* {condition && (
          <A_Input
            placeholder="Инициатива"
            label="Инициатива"
            handleChange={handleInitiativeChange}
            value={initiative}
          ></A_Input>
        )} */}
      </CardWrapper>
    );
  } else if (type == "user") {
    return (
      <TouchableOpacity onPress={onCardPress}>
        <CardWrapper direction="column" key={key}>
          <CardHalfRowWrapper direction="row" style={styles.brd}>
            <PlayerAvatarWrapper>
              <PlayerAvatar
                source={{
                  uri: `${avatar}`,
                }}
              />
            </PlayerAvatarWrapper>
            <CardHalfRow direction="column" justifyContent="center">
              <LittleText lineHeight={20} color="white">
                {name}
              </LittleText>
              <Breadcrumb lineHeight={16} color="#5D5D5D">
                {username ? username : "no username"}
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
              <BigText color="white">{inv}</BigText>
            </CifWrapper>
            <CifWrapper justifyContent="center">
              <FlexBox offsetRight="8">
                <A_Icon iconName="eye" fill="#EDF2DC" />
              </FlexBox>
              <BigText color="white">{ins}</BigText>
            </CifWrapper>
            <CifWrapper justifyContent="center">
              <FlexBox offsetRight="8">
                <A_Icon iconName="eye" fill="#EDF2DC" />
              </FlexBox>
              <BigText color="white">{perc}</BigText>
            </CifWrapper>
          </FlexBox>
          <CardRow>
            <LittleText color="#717171">Языки</LittleText>
            <FlexBox offsetTop="9">{children}</FlexBox>
          </CardRow>
          {/* <CifWrapper justifyContent="center">
            <FlexBox offsetRight="8">
              <A_Icon iconName="eye" fill="#EDF2DC" />
            </FlexBox>
            <BigText color="white">{initiativeVal}</BigText>
          </CifWrapper> */}
          {condition && (
            <A_Input
              placeholder="Инициатива"
              label="Инициатива"
              handleChange={handleInitiativeChange}
              value={initiative}
            ></A_Input>
          )}
        </CardWrapper>
      </TouchableOpacity>
    );
  } else if (type == "initiativeCondition") {
    return (
      <TouchableOpacity onPress={onCardPress}>
        <CardWrapper direction="column" key={key}>
          <CardHalfRowWrapper direction="row" style={styles.brd}>
            <PlayerAvatarWrapper>
              <PlayerAvatar
                source={{
                  uri: `${avatar}`,
                }}
              />
            </PlayerAvatarWrapper>
            <CardHalfRow direction="column" justifyContent="center">
              <LittleText lineHeight={20} color="white">
                {name}
              </LittleText>
              <Breadcrumb lineHeight={16} color="#5D5D5D">
                {username ? username : "no username"}
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
              <BigText color="white">{inv}</BigText>
            </CifWrapper>
            <CifWrapper justifyContent="center">
              <FlexBox offsetRight="8">
                <A_Icon iconName="eye" fill="#EDF2DC" />
              </FlexBox>
              <BigText color="white">{ins}</BigText>
            </CifWrapper>
            <CifWrapper justifyContent="center">
              <FlexBox offsetRight="8">
                <A_Icon iconName="eye" fill="#EDF2DC" />
              </FlexBox>
              <BigText color="white">{perc}</BigText>
            </CifWrapper>
          </FlexBox>
          <CardRow>
            <LittleText color="#717171">Языки</LittleText>
            <FlexBox offsetTop="9">{children}</FlexBox>
          </CardRow>
          {/* <CifWrapper justifyContent="center">
            <FlexBox offsetRight="8">
              <A_Icon iconName="eye" fill="#EDF2DC" />
            </FlexBox>
            <BigText color="white">{initiativeVal}</BigText>
          </CifWrapper> */}
          {condition && (
            <A_Input
              placeholder="Инициатива"
              label="Инициатива"
              handleChange={handleInitiativeChange}
              value={initiative}
            ></A_Input>
          )}
        </CardWrapper>
      </TouchableOpacity>
    );
  } else {
    <Text style={{ color: "white" }}>aya yay yayya </Text>;
  }
  return <></>;
};

export default O_Card;

const styles = StyleSheet.create({
  brd: {
    borderBottomColor: "#282828",
    borderBottomWidth: 1,
  },
});
