import React, { useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import { FlexBox, F_Text, E_Text } from "../../common";
import axios from "axios";
import A_Tag from "../Atoms/A_Tag";
import M_PlayerCardPart from "../Molecules/M_PlayerCardPart";
import M_Concentration from "../Molecules/M_Concentration";
import A_Input from "../Atoms/A_Input";

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
  monster_id?: any;
  monsterEffects?: any;
  expanded?: any;
  master?: boolean;
  thisUser?: any;
  author?: any;
  hp?: any;
  arm?: any;
  fight?: boolean;
  onSubmitEditing?: any;
  newInitiative?: any;
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
  monster_id,
  monsterEffects,
  master,
  thisUser,
  author,
  hp,
  arm,
  fight,
  onSubmitEditing,
  newInitiative,
  ...rest
}: CardProps) => {
  const [plusPressed, setPlusPressed] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handlePress = () => {
    setPlusPressed(true);
  };

  const handleClosePress = () => {
    setPlusPressed(false);
  };

  const handleClick = (effect_id: any, type: any, player_id: any) => {
    axios
      .post(
        `http://localhost:3000/api/v1/games/${code}/${type}/${player_id}/effects`,
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

  const handleDeleteClick = (effect_id: any, type: any, player_id: any) => {
    axios
      .delete(
        `http://localhost:3000/api/v1/games/${code}/${type}/${player_id}/effects`,
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

  const monsterEffectsList = (monster_id: any) => {
    const playerEffectIds = monsterEffects[monster_id].map(
      (effect: any) => effect.id
    );
    const filteredData = data.filter(
      (effect: any) => !playerEffectIds.includes(effect.id)
    );

    return filteredData.map((effect: any, i: any) => {
      return (
        <TouchableOpacity
          onPress={() => handleClick(effect.id, "monsters", monster_id)}
        >
          <A_Tag type="AddEffect">{effect.name}</A_Tag>
        </TouchableOpacity>
      );
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
        <TouchableOpacity
          onPress={() => handleClick(effect.id, "players", player_id)}
        >
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
                  onPress={() =>
                    handleDeleteClick(effect.id, "players", player_id)
                  }
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

  const MonsterEffects = () => {
    return (
      <>
        <CardRow>
          <E_Text color="#717171">Состояния</E_Text>
          <FlexBox direction="row" offsetTop="9">
            {monsterEffects[monster_id] &&
              monsterEffects[monster_id].map((effect: any) => (
                <TouchableOpacity
                  onPress={() =>
                    handleDeleteClick(effect.id, "monsters", monster_id)
                  }
                >
                  <A_Tag type="Effect" key={effect.id}>
                    {effect.name}
                  </A_Tag>
                </TouchableOpacity>
              ))}
            {monsterEffects[monster_id].length === 0 && (
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
                {monsterEffectsList(monster_id)}
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

  const [isChecked, setIsChecked] = useState(false);

  const handleToggleChange = (checked: boolean) => {
    setIsChecked(checked);
    console.log("Toggle is checked: ", checked);
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
  } else if (type == "monster") {
    return (
      <CardWrapper key={key} onPress={() => setExpanded(!expanded)}>
        <FlexBox offsetBottom="6">
          <M_PlayerCardPart
            type="UpperRowMonster"
            name={name}
            expanded={expanded}
            player_id={player_id}
          />
        </FlexBox>
        <M_PlayerCardPart
          type="StatsMonster"
          d={arm}
          e={hp}
          f={initiativeVal}
          expanded={expanded}
          player_id={player_id}
          avatar={avatar}
        ></M_PlayerCardPart>
        {expanded && (
          <>
            <MonsterEffects />
            <M_PlayerCardPart
              type="Armor"
              initiativeVal={initiativeVal != null ? initiativeVal : "99"}
            />
            <M_PlayerCardPart type="Divider" />

            <M_PlayerCardPart
              type="Inititative"
              initiativeVal={initiativeVal != null ? initiativeVal : "99"}
            />
            <FlexBox offsetTop="6">
              <M_PlayerCardPart type="Health" initiativeVal={hp} />
            </FlexBox>
            <M_PlayerCardPart type="Divider" />
            <M_Concentration
              checked={isChecked}
              onChange={handleToggleChange}
            />
          </>
        )}
      </CardWrapper>
    );
  } else if (type == "Initiative") {
    return (
      <CardWrapper key={key} onPress={() => setExpanded(!expanded)}>
        <M_PlayerCardPart
          type="UpperRow"
          avatar={avatar}
          username={username}
          name={name}
          expanded={true}
          player_id={player_id}
        />
        <PlayerEffects />
        <M_PlayerCardPart
          type="Stats"
          a={ins}
          b={inv}
          c={perc}
          expanded={true}
          player_id={player_id}
          avatar={avatar}
        ></M_PlayerCardPart>
        <M_PlayerCardPart type="Languages" chld={children} />
        <M_PlayerCardPart type="Divider" />
        {initiativeVal > 0 ? (
          <M_PlayerCardPart
            type="Inititative"
            initiativeVal={initiativeVal != null ? initiativeVal : "99"}
          />
        ) : (
          <A_Input
            placeholder="Инициатива"
            label="Инициатива"
            value={newInitiative}
            handleChange={handleInitiativeChange}
            keyboardType="numeric"
            maxLength={2}
            iconName="clock"
            onSubmitEditing={onSubmitEditing}
          ></A_Input>
        )}
        <M_Concentration checked={isChecked} onChange={handleToggleChange} />
      </CardWrapper>
    );
  }
  return <></>;
};

export default O_Card;
