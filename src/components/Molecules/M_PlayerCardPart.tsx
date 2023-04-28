import React, { useContext, useState } from "react";
import styled from "styled-components/native";
import { E_Text, FlexBox } from "../../common";
import M_PlayerInformation from "./M_PlayerInformation";
import { StyleSheet } from "react-native";
import M_Portrait from "./M_Portrait";
import A_PlayerName from "../Atoms/A_PlayerName";

type Props = {
  type?: string;
  chld?: any;
  a?: any;
  b?: any;
  c?: any;
  username?: any;
  avatar?: any;
  name?: any;
  expanded?: any;
  player_id?: any;
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

const M_PlayerCardPart = ({
  type,
  chld,
  a,
  b,
  c,
  username,
  avatar,
  name,
  expanded,
  player_id,
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
          <M_PlayerInformation expanded={expanded} a={a} b={b} c={c} />
        </FlexBox>
        {!expanded && (
          <M_Portrait type="Large" src={avatar} player_id={player_id} />
        )}
      </FlexBox>
    );
  }
  return <></>;
};

export default M_PlayerCardPart;

const styles = StyleSheet.create({
  brd: {
    borderBottomColor: "#282828",
    borderBottomWidth: 1,
  },
});
