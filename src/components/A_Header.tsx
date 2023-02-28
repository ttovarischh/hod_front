import React from "react";
import styled from "styled-components";
import { FlexBox, NavSecondaryText, NavText } from "../common";
import { TouchableOpacity } from "react-native";

const CustomHeaderWrapper = styled(FlexBox)`
  background-color: black;
  height: 108px;
  color: white;
  width: 100%;
  justify-content: flex-end;
`;

const CustomHeaderInnerWrapper = styled(FlexBox)`
  height: 60px;
  width: 100%;
  color: blue;
  direction: row;
  justify-content: space-between;
  align-items: baseline;
  align-content: center;
  padding-left: 12px;
  padding-right: 12px;
`;

type HeaderProps = {
  left: string;
  center: string;
  right: string;
  handleRightPress(): any;
};

const A_Header = (props: HeaderProps) => {
  return (
    <CustomHeaderWrapper direction="column">
      <CustomHeaderInnerWrapper>
        <NavSecondaryText>{props.left}</NavSecondaryText>
        <NavText>{props.center}</NavText>
        <TouchableOpacity onPress={props.handleRightPress}>
          <NavSecondaryText>{props.right}</NavSecondaryText>
        </TouchableOpacity>
      </CustomHeaderInnerWrapper>
    </CustomHeaderWrapper>
  );
};

export default A_Header;
