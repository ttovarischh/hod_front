import React from "react";
import styled from "styled-components/native";
import { FlexBox, D_Text, F_Text } from "../../common";
import { TouchableOpacity } from "react-native";

const CustomHeaderWrapper = styled(FlexBox)`
  background-color: ${({ theme }) => theme.nav.header_fill};
  height: 108px;
  width: 100%;
  justify-content: flex-end;
`;

const CustomHeaderInnerWrapper = styled(FlexBox)`
  height: 60px;
  width: 100%;
  direction: row;
  justify-content: space-between;
  align-items: baseline;
  align-content: center;
  padding-left: 12px;
  padding-right: 12px;
`;

type HeaderProps = {
  left?: any;
  center: string;
  right?: any;
  handleRightPress?: any;
  handleLeftPress?: any;
  turn?: any;
};

const O_Header = (props: HeaderProps) => {
  return (
    <CustomHeaderWrapper direction="column">
      <CustomHeaderInnerWrapper>
        <FlexBox style={{ width: "25%" }}>
          <TouchableOpacity onPress={props.handleLeftPress}>
            <F_Text color="#717171">{props.left}</F_Text>
          </TouchableOpacity>
        </FlexBox>
        <FlexBox
          justifyContent="center"
          style={{ width: "50%", position: "relative" }}
        >
          <FlexBox style={{ position: "absolute", top: -25 }}>
            <F_Text center color="#373737">{props.turn}</F_Text>
          </FlexBox>
          <D_Text color="white">{props.center}</D_Text>
        </FlexBox>
        <FlexBox style={{ width: "25%" }} justifyContent="flex-end">
          <TouchableOpacity onPress={props.handleRightPress}>
            <F_Text color="#717171">{props.right}</F_Text>
          </TouchableOpacity>
        </FlexBox>
      </CustomHeaderInnerWrapper>
    </CustomHeaderWrapper>
  );
};

export default O_Header;
