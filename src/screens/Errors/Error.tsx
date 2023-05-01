import React, { useEffect, useRef, useMemo, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import styled from "styled-components/native";
import { FlexBox, B_Text } from "../../common";
import A_Icon from "../../components/Atoms/A_Icon";
import O_BottomSheet from "../../components/Organisms/O_BottomSheet";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useTranslation } from "react-i18next";

const ErrorScreen = styled.View`
  background-color: ${({ theme }) => theme.appBg};
  height: 100%;
  min-height: 675px;
  margin-bottom: 0;
  margin-top: 0;
`;

const CodeQrWrapper = styled(FlexBox)`
  width: 100%;
  align-items: center;
  align-content: center;
  margin-top: 6%;
`;

const QrWrapper = styled(FlexBox)`
  position: relative;
  width: 100%;
  height: 404px;
`;

type PropsT = {
  errorid?: string;
  handleButtonClick(): any;
  code?: any;
};

const Error = ({ code, errorid, handleButtonClick }: PropsT) => {
  // bottomsheet_related
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const { t } = useTranslation();
  const snapPoints = useMemo(() => ["23%", "93%"], []);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  useEffect(() => {
    handlePresentModalPress();
  }, []);

  if (errorid == "404") {
    return (
      <>
        <ErrorScreen>
          <O_BottomSheet
            mainHeader={t("common:wow")}
            subHeader={t("common:wrongCode")}
            ref={bottomSheetModalRef}
            index={1}
            snapPoints={snapPoints}
            handleButtonClick={handleButtonClick}
            a={t("common:back")}
          >
            <QrWrapper style={{ width: "100%" }}>
              <View style={styles.bd1}></View>
              <View style={styles.bd2}></View>
              <View style={styles.bd3}></View>
              <View style={styles.bd4}></View>
              <CodeQrWrapper justifyContent="center" direction="column">
                <FlexBox
                  style={{ marginBottom: 16 }}
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                >
                  <B_Text color="white">{code}</B_Text>
                  <A_Icon
                    width={294}
                    height={310}
                    fill="white"
                    iconName="StunnedIcon"
                    strokeWidth={1}
                  />
                </FlexBox>
              </CodeQrWrapper>
            </QrWrapper>
          </O_BottomSheet>
        </ErrorScreen>
      </>
    );
  } else if (errorid == "505") {
    return (
      <ErrorScreen>
        <O_BottomSheet
          mainHeader={t("common:congrats")}
          subHeader={t("common:finishedSession")}
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          handleButtonClick={handleButtonClick}
          a={t("common:back")}
        >
          <QrWrapper style={{ width: "100%" }}>
            <View style={styles.bd1}></View>
            <View style={styles.bd2}></View>
            <View style={styles.bd3}></View>
            <View style={styles.bd4}></View>
            <CodeQrWrapper justifyContent="center" direction="column">
              <FlexBox
                style={{ marginBottom: 16 }}
                direction="column"
                justifyContent="center"
                alignItems="center"
              >
                <B_Text color="white">{code}</B_Text>
                <A_Icon
                  width={294}
                  height={310}
                  fill="white"
                  iconName="UnconsciousIcon"
                  strokeWidth={1}
                />
              </FlexBox>
            </CodeQrWrapper>
          </QrWrapper>
        </O_BottomSheet>
      </ErrorScreen>
    );
  }
  return <></>;
};

export default Error;

const styles = StyleSheet.create({
  tag: {
    flexDirection: "row",
    alignSelf: "flex-start",
    backgroundColor: "#383838",
    padding: 8,
    paddingLeft: 12,
    paddingRight: 12,
    borderRadius: 10,
    alignItems: "baseline",
  },
  bd1: {
    borderLeftColor: "white",
    borderLeftWidth: 1.5,
    borderTopColor: "white",
    borderTopWidth: 1.5,
    height: 28,
    width: 28,
    position: "absolute",
  },
  bd2: {
    borderRightColor: "white",
    borderRightWidth: 1.5,
    borderTopColor: "white",
    borderTopWidth: 1.5,
    height: 28,
    width: 28,
    position: "absolute",
    right: 0,
  },
  bd3: {
    borderLeftColor: "white",
    borderLeftWidth: 1.5,
    borderBottomColor: "white",
    borderBottomWidth: 1.5,
    height: 28,
    width: 28,
    position: "absolute",
    bottom: 0,
  },
  bd4: {
    borderRightColor: "white",
    borderRightWidth: 1.5,
    borderBottomColor: "white",
    borderBottomWidth: 1.5,
    height: 28,
    width: 28,
    position: "absolute",
    bottom: 0,
    right: 0,
  },
  bottomPart: {
    position: "absolute",
    width: "100%",
    backgroundColor: "transparent",
    height: 116,
    bottom: 0,
    zIndex: 10000,
  },
});
