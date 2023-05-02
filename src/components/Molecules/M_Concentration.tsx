import React from "react";
import styled from "styled-components/native";
import { FlexBox, E_Text } from "../../common";
import A_ToggleButton from "../Atoms/A_ToggleButton";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  return (
    <ConcentrationWrapper>
      <E_Text>{t("common:conc")}</E_Text>
      <A_ToggleButton checked={checked} onChange={onChange} />
    </ConcentrationWrapper>
  );
};

export default M_Concentration;
