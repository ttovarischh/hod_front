import React from "react";
import styled from "styled-components/native";
import { FlexBox } from "../../common";
import { B_Text, D_Text } from "../../common";
import A_Icon from "./A_Icon";
import A_Button from "./A_Button";
import { useTranslation } from "react-i18next";
import { TouchableOpacity } from "react-native-gesture-handler";
import useAuth from "../../contexts/newAuthContext/useAuth";

type Props = {
  onPress?: any;
  step?: any;
  header?: any;
  subHeader?: any;
  steps?: boolean;
  onCrossPress?: any;
};

const TooltipWrapper = styled(FlexBox)`
  width: 100%;
  position: absolute;
  bottom: 124px;
`;

const TooltipContentWrapper = styled(FlexBox)`
  width: 100%;
  background: #2520ff;
  border-radius: 10px;
`;

const TooltipArrowWrapper = styled(FlexBox)`
  width: 140px;
  margin-top: -1px;
  justify-content: center;
`;

const StepCircle = styled(FlexBox)`
  width: 12px;
  height: 12px;
  border-radius: 100%;
  background: white;
`;

const A_Tooltip = ({
  onPress,
  step,
  header,
  subHeader,
  steps,
  onCrossPress,
}: Props) => {
  const { t } = useTranslation();
  const { firstTInVisible } = useAuth();

  function handleCompleteFirst() {
    firstTInVisible();
  }

  return (
    <>
      <TooltipWrapper
        direction="column"
        style={{
          alignItems:
            step === 1 ? "flex-start" : step === 2 ? "center" : "flex-end",
        }}
      >
        <TooltipContentWrapper style={{ padding: 8, paddingBottom: 24 }}>
          <FlexBox style={{ justifyContent: "flex-end", width: "100%" }}>
            <TouchableOpacity
              onPress={steps ? onCrossPress : handleCompleteFirst}
            >
              <A_Icon width={32} height={32} iconName="TagCross" fill="white" />
            </TouchableOpacity>
          </FlexBox>
          <FlexBox>
            <FlexBox style={{ maxWidth: 324 }} offsetBottom="8">
              <B_Text>{header}</B_Text>
            </FlexBox>
            <FlexBox style={{ maxWidth: 304 }}>
              <D_Text color="#C2BDBD">{subHeader}</D_Text>
            </FlexBox>
          </FlexBox>
          {steps && (
            <FlexBox
              offsetTop="32"
              style={{ width: "100%", justifyContent: "center" }}
            >
              <StepCircle
                style={{
                  backgroundColor: step === 1 ? "white" : "#7F7CEC",
                }}
              />
              <StepCircle
                offsetLeft="8"
                offsetRight="8"
                style={{
                  backgroundColor: step === 2 ? "white" : "#7F7CEC",
                }}
              />
              <StepCircle
                style={{
                  backgroundColor: step === 3 ? "white" : "#7F7CEC",
                }}
              />
            </FlexBox>
          )}

          <A_Button
            handleButtonClick={steps ? onPress : handleCompleteFirst}
            secondary
            offsetTop={steps ? 14 : 28}
          >
            {t("common:continue")}
          </A_Button>
        </TooltipContentWrapper>
        <TooltipArrowWrapper>
          <A_Icon iconName="Tooltip" />
        </TooltipArrowWrapper>
      </TooltipWrapper>
    </>
  );
};

export default A_Tooltip;
