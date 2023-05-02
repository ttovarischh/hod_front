import React, { useState } from "react";
import styled from "styled-components/native";
import { FlexBox } from "../../common";
import { useTranslation } from "react-i18next";
import A_Tooltip from "../Atoms/A_Tooltip";
import useAuth from "../../contexts/newAuthContext/useAuth";

type AnimatedViewProps = {
  checked?: any;
  type?: string;
};

const TooltipViewWrapper = styled(FlexBox)`
  background: rgba(0, 0, 0, 0.8);
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  position: absolute;
  z-index: 9999;
`;

const M_TooltipView = ({ type }: AnimatedViewProps) => {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const { secondTInVisible } = useAuth();

  function handleCompleteSecond() {
    secondTInVisible();
  }

  const handlePress = () => {
    if (step === 1) {
      setStep(2);
      console.log(step);
    } else if (step === 2) {
      setStep(3);
      console.log(step);
    } else if (step === 3) {
      handleCompleteSecond();
    }
  };

  if (type === "Single") {
    return (
      <TooltipViewWrapper>
        <A_Tooltip
          step={2}
          header={"Переход в режим инициативы"}
          subHeader={"Позволяет создавать НПС, проводить пошаговые бои"}
        ></A_Tooltip>
      </TooltipViewWrapper>
    );
  }
  return (
    <TooltipViewWrapper>
      <A_Tooltip
        steps
        step={step}
        onPress={handlePress}
        header={
          step === 1
            ? "Добавление монстров, неигровых персонажей"
            : step === 2
            ? "Выход из режима инициативы"
            : "Переход к следующему существу"
        }
        subHeader={
          step === 1
            ? "Открывает отдельную страницу с формами для создания НПС"
            : step === 2
            ? "Это удаляет НПС, убирает ранжирование"
            : "Передаёт ход дальше в порядке инициативы"
        }
        onCrossPress={handleCompleteSecond}
      ></A_Tooltip>
    </TooltipViewWrapper>
  );
};

export default M_TooltipView;
