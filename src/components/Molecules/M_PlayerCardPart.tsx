import React from "react";
import styled from "styled-components/native";
import { E_Text, FlexBox, A_Text, G_Text, H_Text } from "../../common";
import M_PlayerInformation from "./M_PlayerInformation";
import { StyleSheet } from "react-native";
import M_Portrait from "./M_Portrait";
import A_PlayerName from "../Atoms/A_PlayerName";
import { View } from "react-native";
import A_Icon from "../Atoms/A_Icon";

type Props = {
  type?: string;
  chld?: any;
  a?: any;
  b?: any;
  c?: any;
  d?: any;
  e?: any;
  f?: any;
  username?: any;
  avatar?: any;
  name?: any;
  expanded?: any;
  player_id?: any;
  initiativeVal?: any;
  fullinit?: boolean;
};

const CardRow = styled(FlexBox)`
  width: 100%;
  background: #0e0e0e;
  border-radius: 20px;
  padding: 12px;
  flex-direction: column;
`;

const CardHalfRowWrapper = styled(FlexBox)`
  padding-bottom: 12px;
  margin-bottom: 12px;
`;

const CardHalfRowWrapperB = styled(FlexBox)`
  padding-bottom: 0px;
  margin-bottom: 0px;
`;

const StatWrapper = styled(View)`
  background: #0e0e0e;
  border-radius: 25px;
  align-content: center;
  align-items: center;
  justify-content: center;
  max-height: 57px;
  height: 57px;
`;

const M_PlayerCardPart = ({
  type,
  chld,
  a,
  b,
  c,
  d,
  e,
  f,
  username,
  avatar,
  name,
  expanded,
  player_id,
  initiativeVal,
  fullinit,
}: Props) => {
  if (type === "UpperRow") {
    return (
      <>
        {expanded ? (
          <CardHalfRowWrapper direction="row" style={styles.brd}>
            <M_Portrait type="Small" src={avatar} player_id={player_id} />
            <A_PlayerName name={name} username={username} expanded={expanded} />
          </CardHalfRowWrapper>
        ) : (
          <CardHalfRowWrapperB direction="row">
            <A_PlayerName name={name} username={username} expanded={expanded} />
          </CardHalfRowWrapperB>
        )}
      </>
    );
  }
  if (type === "UpperRowMonster") {
    return (
      <CardHalfRowWrapperB direction="row">
        <A_PlayerName name={name} username="NPC" expanded={false} />
      </CardHalfRowWrapperB>
    );
  }

  if (type === "Languages") {
    return (
      <CardRow>
        <E_Text color="#717171">Языки</E_Text>
        <FlexBox offsetTop="9">{chld}</FlexBox>
      </CardRow>
    );
  }
  if (type === "Stats") {
    return (
      <FlexBox direction="column">
        <FlexBox style={{ width: "100%", flexWrap: "nowrap" }}>
          <M_PlayerInformation
            expanded={expanded}
            fullinit={fullinit}
            a={a}
            b={b}
            c={c}
            f={f}
          />
        </FlexBox>
        {!expanded && (
          <M_Portrait type="Large" src={avatar} player_id={player_id} />
        )}
      </FlexBox>
    );
  }
  if (type === "StatsMonster") {
    return (
      <FlexBox direction="column">
        <FlexBox style={{ width: "100%", flexWrap: "nowrap" }}>
          <M_PlayerInformation
            monster={true}
            expanded={expanded}
            d={d}
            e={e}
            f={f}
          />
        </FlexBox>
        {!expanded && (
          <M_Portrait type="LargeMonster" src={avatar} player_id={player_id} />
        )}
      </FlexBox>
    );
  }
  if (type === "Divider") {
    return (
      <FlexBox
        style={{
          width: "100%",
          height: 1,
          backgroundColor: "#373737",
          marginTop: 12,
          marginBottom: 12,
        }}
      ></FlexBox>
    );
  }
  return (
    <StatWrapper
      style={{
        width: "100%",
        backgroundColor: "#0E0E0E",
      }}
    >
      <FlexBox
        direction="row"
        style={{
          width: "100%",
          paddingLeft: 20,
          paddingRight: 20,
        }}
        alignItems="center"
        justifyContent="space-between"
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            flex: 1,
            flexWrap: "nowrap",
          }}
        >
          <>
            <FlexBox offsetTop="4">
              {type === "Armor" && (
                <A_Icon
                  iconName="SmallArmor"
                  width={34}
                  height={34}
                  fill="#EDF2DC"
                />
              )}
              {type === "Health" && (
                <A_Icon
                  iconName="SmallHealth"
                  width={34}
                  height={34}
                  fill="#EDF2DC"
                />
              )}
              {type === "Inititative" && (
                <A_Icon
                  iconName="clock"
                  width={34}
                  height={37}
                  fill="#EDF2DC"
                />
              )}
            </FlexBox>
            <FlexBox
              direction="column"
              offsetLeft="12"
              justifyContent="center"
              offsetTop="2"
            >
              <G_Text color="#EDF2DC">
                {type === "Health" && "Здоровье"}
                {type === "Armor" && "Броня"}
                {type === "Inititative" && "Инициатива"}
              </G_Text>
              <H_Text color="#EDF2DC">
                {type === "Health" && "Health"}
                {type === "Armor" && "Armor"}
                {type === "Inititative" && "Initiative"}
              </H_Text>
            </FlexBox>
          </>
        </View>

        <A_Text lineHeight={57} color="#EDF2DC">
          {initiativeVal}
        </A_Text>
      </FlexBox>
    </StatWrapper>
  );
};

export default M_PlayerCardPart;

const styles = StyleSheet.create({
  brd: {
    borderBottomColor: "#373737",
    borderBottomWidth: 1,
  },
});
