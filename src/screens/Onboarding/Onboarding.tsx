import React, { useState, useRef } from "react";
import useAuth from "../../contexts/newAuthContext/useAuth";
import styled from "styled-components/native";
import { FlexBox, B_Text, E_Text } from "../../common";
import A_Button from "../../components/Atoms/A_Button";
import { useTranslation } from "react-i18next";
import PagerView from "react-native-pager-view";
import A_Icon from "../../components/Atoms/A_Icon";

const AuthScreensWrapper = styled(PagerView)`
  background-color: ${({ theme }) => theme.appBg};
  flex: 1;
  height: 100%;
  width: 100%;
`;

const MainWrapper = styled.View`
  background-color: ${({ theme }) => theme.appBg};
  flex: 1;
`;

const FixedWrapper = styled(FlexBox)`
  background-color: ${({ theme }) => theme.appBg};
  justify-content: center;
  margin-left: 12px;
  margin-right: 12px;
  margin-bottom: 64px;
`;

const SwipeWrapper = styled.View`
  margin: 12px;
  margin-top: 68px;
  margin-bottom: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ImageWrapper = styled(FlexBox)`
  position: relative;
  width: 100%;
  height: 404px;
`;

const HeaderWrapper = styled(FlexBox)`
  max-width: 244px;
`;

const StepCircle = styled(FlexBox)`
  width: 10px;
  height: 10px;
  border-radius: 100%;
  background: white;
`;

const OnboardingScreen = (props: { navigation: any }) => {
  const { login, toggleOnboardingCompleted } = useAuth();
  const { t } = useTranslation();
  const [currentScreenKey, setCurrentScreenKey] = useState("1");
  const [page, setPage] = useState(0);
  const viewPager = useRef(null);

  function handleCompleteOnboarding() {
    toggleOnboardingCompleted();
  }

  const handlePress = (index: any) => {
    // @ts-ignore
    viewPager.current.setPage(index);
  };

  return (
    <MainWrapper>
      <AuthScreensWrapper
        overdrag
        initialPage={page}
        onPageSelected={(e) =>
          setCurrentScreenKey(e.nativeEvent.position.toString())
        }
        ref={viewPager}
      >
        <SwipeWrapper key="1">
          <HeaderWrapper justifyContent="center" offsetBottom="18">
            <B_Text center>{t("common:moreTime")}</B_Text>
          </HeaderWrapper>
          <E_Text center color="#545454">
            {t("common:thinkLess")}
          </E_Text>
          <ImageWrapper
            justifyContent="center"
            alignItems="center"
            offsetTop="28"
          >
            <A_Icon
              width={294}
              height={310}
              fill="white"
              iconName="Fantasy"
              strokeWidth={1}
            />
          </ImageWrapper>
        </SwipeWrapper>
        <SwipeWrapper key="2">
          <HeaderWrapper justifyContent="center" offsetBottom="18">
            <B_Text center>{t("common:forAll")}</B_Text>
          </HeaderWrapper>
          <E_Text center color="#545454">
            {t("common:canShare")}
          </E_Text>
          <ImageWrapper
            justifyContent="center"
            alignItems="center"
            offsetTop="28"
          >
            <A_Icon
              width={294}
              height={310}
              fill="white"
              iconName="Sharable"
              strokeWidth={1}
            />
          </ImageWrapper>
        </SwipeWrapper>
        <SwipeWrapper key="3">
          <HeaderWrapper justifyContent="center" offsetBottom="18">
            <B_Text center>{t("common:uNeed")}</B_Text>
          </HeaderWrapper>
          <E_Text center color="#545454">
            {t("common:langs")}
          </E_Text>
          <ImageWrapper
            justifyContent="center"
            alignItems="center"
            offsetTop="28"
          >
            <A_Icon
              width={294}
              height={310}
              fill="white"
              iconName="UNeed"
              strokeWidth={1.8}
            />
          </ImageWrapper>
        </SwipeWrapper>
      </AuthScreensWrapper>
      <FixedWrapper>
        <FlexBox offsetBottom="12">
          <StepCircle
            style={{
              backgroundColor: currentScreenKey === "0" ? "white" : "#5D5D5D",
            }}
          />
          <StepCircle
            offsetLeft="8"
            offsetRight="8"
            style={{
              backgroundColor: currentScreenKey === "1" ? "white" : "#5D5D5D",
            }}
          />
          <StepCircle
            style={{
              backgroundColor: currentScreenKey === "2" ? "white" : "#5D5D5D",
            }}
          />
        </FlexBox>
        <A_Button
          bright
          handleButtonClick={() => {
            if (currentScreenKey === "2") {
              handleCompleteOnboarding;
            } else {
              handlePress(currentScreenKey === "0" ? 1 : 2);
            }
          }}
        >
          {currentScreenKey === "2"
            ? t("common:allClear")
            : t("common:continue")}
        </A_Button>
        <A_Button handleButtonClick={handleCompleteOnboarding}>
          {t("common:skip")}
        </A_Button>
      </FixedWrapper>
    </MainWrapper>
  );
};

export default OnboardingScreen;
