import React, { forwardRef } from "react";
import { StyleSheet, View } from "react-native";
import styled from "styled-components/native";
import { FlexBox, B_Text, E_Text } from "../../common";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import A_Button from "../Atoms/A_Button";
import { BlurView } from "expo-blur";

type CardProps = {
  children?: React.ReactNode;
  mainHeader?: string;
  subHeader?: string;
  index?: any;
  snapPoints?: any;
  handleButtonClick?: any;
  twoButtons?: boolean;
};

const BottomSheetContentWrapper = styled(FlexBox)`
  width: 100%;
  padding-left: 12px;
  padding-right: 12px;
  margin-top: 30px;
  margin-bottom: 64px;
  flex: 1;
`;

const BottomSheetButton = styled.TouchableOpacity`
  background-color: #f0ff00;
  width: 100%;
  height: 125px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 8px;
`;

const BottomSheetHollowButton = styled.TouchableOpacity`
  // background: blue;
  border: 1px solid #262626;
  width: 100%;
  height: 125px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 8px;
  overflow: hidden;
`;

const Ornament = styled.Image`
  width: 290.38px;
  height: 224.15px;
`;

export type Ref = any;

const O_BottomSheet = forwardRef<Ref, CardProps>((props, ref) => (
  <>
    {!props.twoButtons && (
      <BottomSheetModal
        ref={ref}
        index={props.index}
        snapPoints={props.snapPoints}
        handleComponent={() => (
          <View style={styles.closeLineContainer}>
            <View style={styles.closeLine}></View>
          </View>
        )}
        backgroundComponent={() => <View style={styles.contentContainer} />}
      >
        <BottomSheetContentWrapper
          direction="column"
          alignItems="center"
          justifyContent="space-between"
        >
          <FlexBox
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <B_Text offsetLeft={20} offsetRight={20} center>
              {props.mainHeader}
            </B_Text>
            {props.subHeader && (
              <E_Text center offsetTop={18} color="#545454">
                Покажи этот QR-код своим друзьям, чтобы они могли присоединиться
                к игре, или воспользуйтесь кодом сессии
              </E_Text>
            )}
          </FlexBox>
          <FlexBox style={{ height: 400 }}>{props.children}</FlexBox>
          <BottomSheetButton
            onPress={props.handleButtonClick}
            style={styles.shadowProp}
          >
            <B_Text center color="#000000">
              Готово
            </B_Text>
          </BottomSheetButton>
        </BottomSheetContentWrapper>
      </BottomSheetModal>
    )}
    {props.twoButtons && (
      <BottomSheetModal
        ref={ref}
        index={props.index}
        snapPoints={props.snapPoints}
        handleComponent={() => (
          <View style={styles.closeLineContainer}>
            <View style={styles.closeLine}></View>
          </View>
        )}
        backgroundComponent={() => <View style={styles.contentContainer} />}
      >
        <BottomSheetContentWrapper
          direction="column"
          alignItems="center"
          justifyContent="flex-end"
          style={{ position: "relative" }}
        >
          <Ornament
            style={{
              resizeMode: "contain",
              right: -10,
              top: 0,
              position: "absolute",
            }}
            source={require("../../../assets/images/B_Graphic.png")}
          />
          <Ornament
            style={{
              resizeMode: "contain",
              left: -20,
              top: 260,
              position: "absolute",
            }}
            source={require("../../../assets/images/B_Graphic.png")}
          />
          <Ornament
            style={{
              resizeMode: "contain",
              left: -20,
              top: 500,
              position: "absolute",
            }}
            source={require("../../../assets/images/B_Graphic.png")}
          />
          <Ornament
            style={{
              resizeMode: "contain",
              right: -10,
              top: 750,
              position: "absolute",
            }}
            source={require("../../../assets/images/B_Graphic.png")}
          />
          <FlexBox
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <B_Text offsetLeft={20} offsetRight={20} center>
              {props.mainHeader}
            </B_Text>
            {props.subHeader && (
              <E_Text center offsetTop={18} color="white">
                {props.subHeader}
              </E_Text>
            )}
          </FlexBox>
          <FlexBox offsetTop="120">
            <BottomSheetButton
              onPress={props.handleButtonClick}
              style={styles.shadowProp}
            >
              <B_Text center color="#000000">
                Отмена
              </B_Text>
            </BottomSheetButton>
            <BottomSheetHollowButton
              onPress={props.handleButtonClick}
              style={styles.shadowBProp}
            >
              <BlurView
                intensity={40}
                tint="dark"
                style={{
                  width: "101%",
                  height: "101%",
                  borderRadius: 20,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <B_Text center color="#FFFFFF">
                  Покинуть
                </B_Text>
              </BlurView>
            </BottomSheetHollowButton>
          </FlexBox>
        </BottomSheetContentWrapper>
      </BottomSheetModal>
    )}
  </>
));

export default O_BottomSheet;

const styles = StyleSheet.create({
  shadowProp: {
    shadowColor: "#F0FF00",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 18,
  },
  shadowBProp: {
    shadowColor: "#252525B2",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 18,
    overflow: "hidden",
    borderRadius: 20,
  },
  closeLineContainer: {
    alignSelf: "center",
  },
  closeLine: {
    width: 50,
    height: 6,
    borderRadius: 5,
    backgroundColor: "#383838",
    marginTop: 10,
  },
  contentContainer: {
    ...StyleSheet.absoluteFillObject,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "#1C1C1E",
  },
});
