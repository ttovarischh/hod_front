import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { FlexBox, G_Text, A_Text, H_Text, E_Text } from "../../common";
import { Animated, TouchableOpacity } from "react-native";
import A_Icon from "../Atoms/A_Icon";

type AnimatedViewProps = {
  a: any;
  b: any;
  c: any;
  expanded?: any;
};

const StatWrapper = styled(Animated.View)`
  background: #0e0e0e;
  border-radius: 25px;
  align-content: center;
  align-items: center;
  justify-content: center;
  max-height: 57px;
  height: 57px;
`;

const M_PlayerInformation = ({ a, b, c, expanded }: AnimatedViewProps) => {
  const [isAExpanded, setIsAExpanded] = useState(false);
  const [isBExpanded, setIsBExpanded] = useState(false);
  const [isCExpanded, setIsCExpanded] = useState(true);

  const [widthAValue, setWidthAValue] = useState(new Animated.Value(69));
  const [widthBValue, setWidthBValue] = useState(new Animated.Value(69));
  const [widthCValue, setWidthCValue] = useState(new Animated.Value(69));

  const [opacityAValue, setOpacityAValue] = useState(new Animated.Value(0));
  const [opacityBValue, setOpacityBValue] = useState(new Animated.Value(0));
  const [opacityCValue, setOpacityCValue] = useState(new Animated.Value(0));

  const [isA, setIsA] = useState(false);
  const [isB, setIsB] = useState(false);
  const [isC, setIsC] = useState(true);

  const handleAPress = () => {
    if (!isAExpanded) {
      setIsAExpanded(true);
      setIsBExpanded(false);
      setIsCExpanded(false);
      setTimeout(() => {
        setIsA(true);
      }, 50);
      setTimeout(() => {
        setIsB(false);
        setIsC(false);
      }, 400);
    }
  };
  const handleBPress = () => {
    if (!isBExpanded) {
      setIsAExpanded(false);
      setIsBExpanded(true);
      setIsCExpanded(false);
      setTimeout(() => {
        setIsB(true);
      }, 50);
      setTimeout(() => {
        setIsA(false);
        setIsC(false);
      }, 400);
    }
  };
  const handleCPress = () => {
    if (!isCExpanded) {
      setIsAExpanded(false);
      setIsBExpanded(false);
      setIsCExpanded(true);
      setTimeout(() => {
        setIsC(true);
      }, 50);
      setTimeout(() => {
        setIsA(false);
        setIsB(false);
      }, 350);
    }
  };

  useEffect(() => {
    console.log(isAExpanded);
    console.log(isBExpanded);
    console.log(isCExpanded);
    if (isAExpanded) {
      Animated.parallel([
        Animated.timing(opacityCValue, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(opacityBValue, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(widthAValue, {
          toValue: 260,
          duration: 300,
          delay: 300,
          useNativeDriver: false,
        }),
        Animated.timing(widthBValue, {
          toValue: 69,
          duration: 300,
          delay: 300,
          useNativeDriver: false,
        }),
        Animated.timing(widthCValue, {
          toValue: 69,
          duration: 300,
          delay: 300,
          useNativeDriver: false,
        }),
        Animated.timing(opacityAValue, {
          toValue: 1,
          duration: 300,
          delay: 500,
          useNativeDriver: false,
        }),
      ]).start();
    } else if (isBExpanded) {
      Animated.parallel([
        Animated.timing(opacityCValue, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(opacityAValue, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(widthBValue, {
          toValue: 260,
          duration: 300,
          delay: 300,
          useNativeDriver: false,
        }),
        Animated.timing(widthAValue, {
          toValue: 69,
          duration: 300,
          delay: 300,
          useNativeDriver: false,
        }),
        Animated.timing(widthCValue, {
          toValue: 69,
          duration: 300,
          delay: 300,
          useNativeDriver: false,
        }),
        Animated.timing(opacityBValue, {
          toValue: 1,
          duration: 300,
          delay: 500,
          useNativeDriver: false,
        }),
      ]).start();
    } else if (isCExpanded) {
      Animated.parallel([
        Animated.timing(opacityAValue, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(opacityBValue, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(widthCValue, {
          toValue: 260,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(widthAValue, {
          toValue: 69,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(widthBValue, {
          toValue: 69,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(opacityCValue, {
          toValue: 1,
          duration: 300,
          delay: 300,
          useNativeDriver: false,
        }),
      ]).start();
    }
  }, [isAExpanded, isBExpanded, isCExpanded]);

  if (!expanded) {
    return (
      <FlexBox offsetTop="6">
        <FlexBox offsetRight="16" alignItems="center">
          <A_Icon iconName="SmallInc" />
          <E_Text offsetLeft={6}>{a}</E_Text>
        </FlexBox>
        <FlexBox offsetRight="16" alignItems="center">
          <A_Icon iconName="SmallInv" />
          <E_Text offsetLeft={6}>{b}</E_Text>
        </FlexBox>
        <FlexBox alignItems="center">
          <A_Icon iconName="SmallPerc" />
          <E_Text offsetLeft={6}>{c}</E_Text>
        </FlexBox>
      </FlexBox>
    );
  } else {
    return (
      <>
        <TouchableOpacity onPress={handleAPress}>
          <StatWrapper
            style={{
              width: widthAValue,
              backgroundColor: isAExpanded ? "#EDF2DC" : "#0E0E0E",
            }}
          >
            <FlexBox
              direction="row"
              style={{
                width: "100%",
                paddingLeft: isAExpanded ? 12 : 0,
                paddingRight: isAExpanded ? 12 : 0,
              }}
              alignItems="center"
              justifyContent={isA ? "space-between" : "center"}
            >
              {isA && (
                <Animated.View
                  style={{
                    opacity: opacityAValue,
                    display: "flex",
                    flexDirection: "row",
                    flex: 1,
                    flexWrap: "nowrap",
                  }}
                >
                  <>
                    <FlexBox offsetTop="4">
                      <A_Icon
                        iconName="PerceptionIcon"
                        fill={!isAExpanded ? "#EDF2DC" : "#0E0E0E"}
                      />
                    </FlexBox>
                    <FlexBox
                      direction="column"
                      offsetLeft="6"
                      justifyContent="center"
                      offsetTop="2"
                    >
                      <G_Text color={!isAExpanded ? "#EDF2DC" : "#0E0E0E"}>
                        Проницательность
                      </G_Text>
                      <H_Text color={!isAExpanded ? "#EDF2DC" : "#A4A4A4"}>
                        Insight
                      </H_Text>
                    </FlexBox>
                  </>
                </Animated.View>
              )}

              <A_Text
                lineHeight={57}
                color={!isAExpanded ? "#EDF2DC" : "#0E0E0E"}
              >
                {a}
              </A_Text>
            </FlexBox>
          </StatWrapper>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleBPress}>
          <StatWrapper
            style={{
              width: widthBValue,
              backgroundColor: isBExpanded ? "#EDF2DC" : "#0E0E0E",
            }}
          >
            <FlexBox
              direction="row"
              style={{
                width: "100%",
                paddingLeft: isBExpanded ? 12 : 0,
                paddingRight: isBExpanded ? 12 : 0,
              }}
              alignItems="center"
              justifyContent={isB ? "space-between" : "center"}
            >
              {isB && (
                <Animated.View
                  style={{
                    opacity: opacityBValue,
                    display: "flex",
                    flexDirection: "row",
                    flex: 1,
                    flexWrap: "nowrap",
                  }}
                >
                  <A_Icon
                    iconName="IvestigationIcon"
                    fill={!isBExpanded ? "#EDF2DC" : "#0E0E0E"}
                  />
                  <FlexBox
                    direction="column"
                    offsetLeft="6"
                    justifyContent="center"
                    offsetTop="2"
                  >
                    <G_Text color={!isBExpanded ? "#EDF2DC" : "#0E0E0E"}>
                      Расследование
                    </G_Text>
                    <H_Text color={!isBExpanded ? "#EDF2DC" : "#A4A4A4"}>
                      Investigation
                    </H_Text>
                  </FlexBox>
                </Animated.View>
              )}
              <A_Text
                lineHeight={57}
                color={!isBExpanded ? "#EDF2DC" : "#0E0E0E"}
              >
                {b}
              </A_Text>
            </FlexBox>
          </StatWrapper>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleCPress}>
          <StatWrapper
            style={{
              width: widthCValue,
              backgroundColor: isCExpanded ? "#EDF2DC" : "#0E0E0E",
            }}
          >
            <FlexBox
              direction="row"
              style={{
                width: "100%",
                paddingLeft: isCExpanded ? 12 : 0,
                paddingRight: isCExpanded ? 12 : 0,
              }}
              alignItems="center"
              justifyContent={isC ? "space-between" : "center"}
            >
              {isC && (
                <Animated.View
                  style={{
                    opacity: opacityCValue,
                    display: "flex",
                    flexDirection: "row",
                    flex: 1,
                    flexWrap: "nowrap",
                  }}
                >
                  <A_Icon
                    iconName="eye"
                    fill={!isCExpanded ? "#EDF2DC" : "#0E0E0E"}
                  />
                  <FlexBox
                    direction="column"
                    offsetLeft="6"
                    justifyContent="center"
                    offsetTop="2"
                  >
                    <G_Text color={!isCExpanded ? "#EDF2DC" : "#0E0E0E"}>
                      Восприятие
                    </G_Text>
                    <H_Text color={!isCExpanded ? "#EDF2DC" : "#A4A4A4"}>
                      Perception
                    </H_Text>
                  </FlexBox>
                </Animated.View>
              )}

              <A_Text
                lineHeight={57}
                color={!isCExpanded ? "#EDF2DC" : "#0E0E0E"}
              >
                {c}
              </A_Text>
            </FlexBox>
          </StatWrapper>
        </TouchableOpacity>
      </>
    );
  }
};

export default M_PlayerInformation;
