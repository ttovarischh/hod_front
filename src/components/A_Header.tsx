import React from "react";
import styled from "styled-components/native";
import { FlexBox, NavSecondaryText, NavText } from "../common";
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
  left?: string;
  center: string;
  right?: string;
  handleRightPress?: any;
  handleLeftPress?: any;
};

const A_Header = (props: HeaderProps) => {
  return (
    <CustomHeaderWrapper direction="column">
      <CustomHeaderInnerWrapper>
        <FlexBox style={{ width: "25%" }}>
          <TouchableOpacity onPress={props.handleLeftPress}>
            <NavSecondaryText>{props.left}</NavSecondaryText>
          </TouchableOpacity>
        </FlexBox>
        <FlexBox justifyContent="center" style={{ width: "50%" }}>
          <NavText>{props.center}</NavText>
        </FlexBox>
        <FlexBox style={{ width: "25%" }}>
          <TouchableOpacity onPress={props.handleRightPress}>
            <NavSecondaryText>{props.right}</NavSecondaryText>
          </TouchableOpacity>
        </FlexBox>
      </CustomHeaderInnerWrapper>
    </CustomHeaderWrapper>
  );
};

export default A_Header;
