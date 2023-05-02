import React, { useState } from "react";
import styled from "styled-components/native";
import { FlexBox, A_Text, G_Text, H_Text } from "../../common";
import { View } from "react-native";
import A_Icon from "../Atoms/A_Icon";
import { TextInput } from "react-native";
import axios from "axios";
import { TouchableOpacity } from "react-native";

type Props = {
  code?: any;
  player_id?: any;
  healthVal?: any;
};

const StatWrapper = styled(View)`
  background: #0e0e0e;
  border-radius: 25px;
  align-content: center;
  align-items: center;
  justify-content: center;
  max-height: 57px;
  height: 57px;
`;

const M_HealthCalc = ({ player_id, healthVal, code }: Props) => {
  const [newHealthValue, setNewHealthValue] = useState<any>([]);
  const [calcVisible, setCalcVisible] = useState(false);
  const onSubmitInitiativeEditing = (player_id: any) => {
    const sum = healthVal - newHealthValue;
    axios
      .patch(
        `http://localhost:3000/api/v1/games/${code}/monsters/${player_id}`,
        {
          monster: {
            hp: sum,
          },
        }
      )
      .then((response) => {})
      .catch((error) => console.error(error))
      .finally(() => {
        setNewHealthValue([]);
        setCalcVisible(false);
      });
  };

  return (
    <StatWrapper
      style={{
        width: "100%",
        backgroundColor: "#0E0E0E",
      }}
    >
      <TouchableOpacity
        style={{
          display: "flex",
          width: "100%",
          paddingLeft: 20,
          paddingRight: 20,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
        onPress={() => setCalcVisible(true)}
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
              <A_Icon
                iconName="SmallHealth"
                width={34}
                height={34}
                fill="#EDF2DC"
              />
            </FlexBox>
            <FlexBox
              direction="column"
              offsetLeft="12"
              justifyContent="center"
              offsetTop="2"
            >
              <G_Text color="#EDF2DC">Здоровье</G_Text>
              <H_Text color="#EDF2DC">Health</H_Text>
            </FlexBox>
          </>
        </View>
        <FlexBox alignItems="center">
          <A_Text lineHeight={57} color="#EDF2DC" offsetRight={8}>
            {healthVal}
          </A_Text>
          {calcVisible && (
            <>
              <A_Icon iconName="Minus" strokeWidth={4} />
              <TextInput
                placeholder="XX"
                placeholderTextColor={"#5D5D5D"}
                style={{
                  fontSize: 48,
                  fontFamily: "PP",
                  marginLeft: 8,
                  color: "#EDF2DC",
                }}
                value={newHealthValue}
                onChangeText={(event: any) => {
                  setNewHealthValue(event);
                  console.log("UR NEW HEALTH" + newHealthValue);
                }}
                onSubmitEditing={() => onSubmitInitiativeEditing(player_id)}
              ></TextInput>
            </>
          )}
        </FlexBox>
      </TouchableOpacity>
    </StatWrapper>
  );
};

export default M_HealthCalc;
