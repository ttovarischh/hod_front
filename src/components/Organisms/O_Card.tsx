import React, { useContext, useState, useEffect } from "react";
import { Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import styled, { ThemeContext } from "styled-components/native";
import { FlexBox, F_Text, E_Text } from "../../common";
import axios from "axios";
import { View } from "react-native";
import A_Tag from "../Atoms/A_Tag";
import M_PlayerCardPart from "../Molecules/M_PlayerCardPart";
import useAuth from "../../contexts/newAuthContext/useAuth";

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
  data?: any;
  code?: any;
  player_id?: any;
  playerEffects?: any;
  expanded?: any;
  master?: boolean;
  thisUser?: any;
  author?: any;
};

type Props = {
  player_id: number;
  playerEffects: any;
  handleDeleteClick: Function;
  effectsList: Function;
};

const CardRow = styled(FlexBox)`
  width: 100%;
  background: #0e0e0e;
  border-radius: 20px;
  padding: 12px;
  flex-direction: column;
`;

const CardWrapper = styled(TouchableOpacity)`
  background-color: ${({ theme }) => theme.card.bg};
  width: 100%;
  margin-bottom: 8px;
  border-radius: 20px;
  padding: 15px;
  display: flex;
  flex-direction: column;
`;

const AddEffectWrapper = styled(ScrollView)`
  height: 168px;
  width: 100%;
  padding-top: 12px;
  padding-bottom: 12px;
  margin-top: 12px;
  margin-bottom: 12px;
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
  data,
  code,
  player_id,
  playerEffects,
  master,
  thisUser,
  author,
  ...rest
}: CardProps) => {
  const theme = useContext(ThemeContext);
  const [plusPressed, setPlusPressed] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const { user } = useAuth();

  const handlePress = () => {
    setPlusPressed(true);
  };

  const handleClosePress = () => {
    setPlusPressed(false);
  };

  // useEffect(() => {
  //   console.log(master);
  // }, []);

  const handleClick = (effect_id: any, player_id: any) => {
    axios
      .post(
        `http://localhost:3000/api/v1/games/${code}/players/${player_id}/effects`,
        {
          effect_id: effect_id,
        }
      )
      .then((response) => {
        // Code
      })
      .catch((error) => console.error(error))
      .finally(() => {});
  };

  const handleDeleteClick = (effect_id: any, player_id: any) => {
    axios
      .delete(
        `http://localhost:3000/api/v1/games/${code}/players/${player_id}/effects`,
        {
          data: { effect_id: effect_id },
        }
      )
      .then((response) => {
        // handle success response
      })
      .catch((error) => {
        console.error(error);
        // handle error response
      })
      .finally(() => {
        // handle finally
      });
  };

  const effectsList = (player_id: any) => {
    const playerEffectIds = playerEffects[player_id].map(
      (effect: any) => effect.id
    );
    const filteredData = data.filter(
      (effect: any) => !playerEffectIds.includes(effect.id)
    );

    return filteredData.map((effect: any, i: any) => {
      return (
        <TouchableOpacity onPress={() => handleClick(effect.id, player_id)}>
          <A_Tag type="AddEffect">{effect.name}</A_Tag>
        </TouchableOpacity>
      );
    });
  };

  const PlayerEffects = () => {
    return (
      <>
        <CardRow>
          <E_Text color="#717171">Состояния</E_Text>
          <FlexBox direction="row" offsetTop="9">
            {playerEffects[player_id] &&
              playerEffects[player_id].map((effect: any) => (
                <TouchableOpacity
                  onPress={() => handleDeleteClick(effect.id, player_id)}
                >
                  <A_Tag type="Effect" key={effect.id}>
                    {effect.name}
                  </A_Tag>
                </TouchableOpacity>
              ))}
            {playerEffects[player_id].length === 0 && (
              <A_Tag type="Effect">Состояния не наложены</A_Tag>
            )}

            {(!plusPressed || master) && (
              <TouchableOpacity onPress={handlePress}>
                <A_Tag type="PlusIcon" />
              </TouchableOpacity>
            )}
          </FlexBox>
          {plusPressed && (
            <>
              <AddEffectWrapper
                contentContainerStyle={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  width: "100%",
                }}
                style={{
                  borderBottomColor: "#1B1B1B",
                  borderTopColor: "#1B1B1B",
                  borderTopWidth: 1,
                  borderBottomWidth: 1,
                  borderStyle: "solid",
                }}
              >
                {effectsList(player_id)}
                <View style={{ height: 56 }} />
              </AddEffectWrapper>
              <TouchableOpacity
                style={{
                  width: 370,
                  display: "flex",
                  justifyContent: "center",
                }}
                onPress={handleClosePress}
              >
                <F_Text center color="#373737">
                  Закрыть
                </F_Text>
              </TouchableOpacity>
            </>
          )}
        </CardRow>
      </>
    );
  };

  if (type == "noInitiative") {
    return (
      <CardWrapper key={key} onPress={() => setExpanded(!expanded)}>
        <M_PlayerCardPart
          type="UpperRow"
          avatar={avatar}
          username={username}
          name={name}
          expanded={expanded}
          player_id={player_id}
        />
        {expanded && <PlayerEffects />}

        <M_PlayerCardPart
          type="Stats"
          a={ins}
          b={inv}
          c={perc}
          expanded={expanded}
          player_id={player_id}
          avatar={avatar}
        ></M_PlayerCardPart>
        {expanded && <M_PlayerCardPart type="Languages" chld={children} />}
      </CardWrapper>
    );
  } else if (type == "user") {
    return (
      <></>
      // <TouchableOpacity onPress={onCardPress}>
      //   <CardWrapper direction="column" key={key}>
      //     <CardHalfRowWrapper direction="row" style={styles.brd}>
      //       <PlayerAvatarWrapper>
      //         <PlayerAvatar
      //           source={{
      //             uri: `${avatar}`,
      //           }}
      //         />
      //       </PlayerAvatarWrapper>
      //       <CardHalfRow direction="column" justifyContent="center">
      //         <E_Text lineHeight={20} color="white">
      //           {name}
      //         </E_Text>
      //         <F_Text lineHeight={16} color="#5D5D5D">
      //           {username ? username : "no username"}
      //         </F_Text>
      //       </CardHalfRow>
      //     </CardHalfRowWrapper>
      //     <CardRow>
      //       <E_Text color="#717171">Состояния</E_Text>
      //       <FlexBox direction="row" offsetTop="9">
      //         <PlayerWrapper offsetRight="6">
      //           <A_Icon fill="#1A1A1A" iconName="plus"></A_Icon>
      //         </PlayerWrapper>
      //       </FlexBox>
      //     </CardRow>
      //     <FlexBox>
      //       <CifWrapper justifyContent="center">
      //         <FlexBox offsetRight="8">
      //           <A_Icon iconName="eye" fill="#EDF2DC" />
      //         </FlexBox>
      //         <A_Text color="white">{inv}</A_Text>
      //       </CifWrapper>
      //       <CifWrapper justifyContent="center">
      //         <FlexBox offsetRight="8">
      //           <A_Icon iconName="eye" fill="#EDF2DC" />
      //         </FlexBox>
      //         <A_Text color="white">{ins}</A_Text>
      //       </CifWrapper>
      //       <CifWrapper justifyContent="center">
      //         <FlexBox offsetRight="8">
      //           <A_Icon iconName="eye" fill="#EDF2DC" />
      //         </FlexBox>
      //         <A_Text color="white">{perc}</A_Text>
      //       </CifWrapper>
      //     </FlexBox>
      //     <CardRow>
      //       <E_Text color="#717171">Языки</E_Text>
      //       <FlexBox offsetTop="9">{children}</FlexBox>
      //     </CardRow>
      //     {condition && (
      //       <A_Input
      //         placeholder="Инициатива"
      //         label="Инициатива"
      //         handleChange={handleInitiativeChange}
      //         value={initiative}
      //       ></A_Input>
      //     )}
      //   </CardWrapper>
      // </TouchableOpacity>
    );
  } else if (type == "initiativeCondition") {
    return (
      <></>
      // <TouchableOpacity onPress={onCardPress}>
      //   <CardWrapper direction="column" key={key}>
      //     <CardHalfRowWrapper direction="row" style={styles.brd}>
      //       <PlayerAvatarWrapper>
      //         <PlayerAvatar
      //           source={{
      //             uri: `${avatar}`,
      //           }}
      //         />
      //       </PlayerAvatarWrapper>
      //       <CardHalfRow direction="column" justifyContent="center">
      //         <E_Text lineHeight={20} color="white">
      //           {name}
      //         </E_Text>
      //         <F_Text lineHeight={16} color="#5D5D5D">
      //           {username ? username : "no username"}
      //         </F_Text>
      //       </CardHalfRow>
      //     </CardHalfRowWrapper>
      //     <CardRow>
      //       <E_Text color="#717171">Состояния</E_Text>
      //       <FlexBox direction="row" offsetTop="9">
      //         <PlayerWrapper offsetRight="6">
      //           <A_Icon fill="#1A1A1A" iconName="plus"></A_Icon>
      //         </PlayerWrapper>
      //       </FlexBox>
      //     </CardRow>
      //     <FlexBox>
      //       <CifWrapper justifyContent="center">
      //         <FlexBox offsetRight="8">
      //           <A_Icon iconName="eye" fill="#EDF2DC" />
      //         </FlexBox>
      //         <A_Text color="white">{inv}</A_Text>
      //       </CifWrapper>
      //       <CifWrapper justifyContent="center">
      //         <FlexBox offsetRight="8">
      //           <A_Icon iconName="eye" fill="#EDF2DC" />
      //         </FlexBox>
      //         <A_Text color="white">{ins}</A_Text>
      //       </CifWrapper>
      //       <CifWrapper justifyContent="center">
      //         <FlexBox offsetRight="8">
      //           <A_Icon iconName="eye" fill="#EDF2DC" />
      //         </FlexBox>
      //         <A_Text color="white">{perc}</A_Text>
      //       </CifWrapper>
      //     </FlexBox>
      //     <CardRow>
      //       <E_Text color="#717171">Языки</E_Text>
      //       <FlexBox offsetTop="9">{children}</FlexBox>
      //     </CardRow>
      //     {condition && (
      //       <A_Input
      //         placeholder="Инициатива"
      //         label="Инициатива"
      //         handleChange={handleInitiativeChange}
      //         value={initiative}
      //       ></A_Input>
      //     )}
      //   </CardWrapper>
      // </TouchableOpacity>
    );
  } else {
    <Text style={{ color: "white" }}>aya yay yayya </Text>;
  }
  return <></>;
};

export default O_Card;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  box: {
    backgroundColor: "blue",
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
  },
  expandedBox: {
    flex: 1,
  },
  text: {
    color: "white",
    fontWeight: "bold",
  },
  brd: {
    borderBottomColor: "#282828",
    borderBottomWidth: 1,
  },
});
