import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { FlexBox, G_Text, A_Text, H_Text, E_Text } from "../../common";
import { Animated, TouchableOpacity } from "react-native";
import A_Icon from "../Atoms/A_Icon";
import A_MicroStat from "../Atoms/A_MicroStat";
import A_ToggleButton from "../Atoms/A_ToggleButton";
import { onChange } from "react-native-reanimated";

type AnimatedViewProps = {
  onChange: any;
  checked: any;
};

const ConcentrationWrapper = styled(FlexBox)`
  background: #0e0e0e;
  width: 100%;
  border-radius: 25px;
  align-content: center;
  align-items: center;
  justify-content: space-between;
  max-height: 57px;
  height: 57px;
  padding: 10px;
  padding-left: 16px;
  margin-top: 6px;
`;

const M_Concentration = ({ onChange, checked }: AnimatedViewProps) => {
  return (
    <ConcentrationWrapper>
      <E_Text>Концентрация</E_Text>
      <A_ToggleButton checked={checked} onChange={onChange} />
    </ConcentrationWrapper>
  );
};

export default M_Concentration;
