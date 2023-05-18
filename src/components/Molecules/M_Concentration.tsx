import React from "react";
import styled from "styled-components/native";
import { FlexBox, E_Text } from "../../common";
import A_ToggleButton from "../Atoms/A_ToggleButton";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

type AnimatedViewProps = {
  onChange: any;
  checked: any;
  master?: boolean;
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

const SwitchButton = styled.View`
  width: 36px;
  height: 36px;
  border-radius: 30px;
  align-items: center;
  justify-content: center;
  background-color: ${({ checked }: { checked: any }) =>
    checked ? "#F0FF00" : "#302F2F"};
`;

const M_Concentration = ({ onChange, checked, master }: AnimatedViewProps) => {
  const { t } = useTranslation();
  if (!master) {
    return (
      <ConcentrationWrapper>
        <E_Text>{t("common:conc")}</E_Text>
        <SwitchButton checked={checked} />
      </ConcentrationWrapper>
    );
  }
  return (
    <ConcentrationWrapper>
      <E_Text>{t("common:conc")}</E_Text>
      <A_ToggleButton checked={checked} onChange={onChange} />
    </ConcentrationWrapper>
  );
};

export default M_Concentration;
