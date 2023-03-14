import React, { forwardRef } from "react";
import { StyleSheet, View } from "react-native";
import styled from "styled-components/native";
import { FlexBox, HeaderText, NavBarText } from "../common";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

type CardProps = {
  children?: React.ReactNode;
  mainHeader?: string;
  subHeader?: string;
  index?: any;
  snapPoints?: any;
  handleButtonClick?: any;
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

export type Ref = any;

const O_BottomSheet = forwardRef<Ref, CardProps>((props, ref) => (
  <>
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
        <FlexBox direction="column" justifyContent="center" alignItems="center">
          <HeaderText offsetLeft={20} offsetRight={20} center>
            {props.mainHeader}
          </HeaderText>
          {props.subHeader && (
            <NavBarText center offsetTop={18} color="#545454">
              Покажи этот QR-код своим друзьям, чтобы они могли присоединиться
              к игре, или воспользуйтесь кодом сессии
            </NavBarText>
          )}
        </FlexBox>
        <FlexBox>{props.children}</FlexBox>
        <BottomSheetButton
          onPress={props.handleButtonClick}
          style={styles.shadowProp}
        >
          <HeaderText center color="#000000">
            Готово
          </HeaderText>
        </BottomSheetButton>
      </BottomSheetContentWrapper>
    </BottomSheetModal>
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
