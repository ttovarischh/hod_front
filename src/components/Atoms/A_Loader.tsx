import React from "react";
import { ActivityIndicator } from "react-native-paper";
import { FlexBox } from "../../common";
import styled from "styled-components";

const LoaderWrapper = styled(FlexBox)`
  background-color: black;
  width: 100%; 
  height: 100%;
  align-content: center;
`;

const A_Loader = (props: any) => {
  return (
    <LoaderWrapper>
      <ActivityIndicator size="large" color="#2520FF" style={{flex: 1}}></ActivityIndicator>
    </LoaderWrapper>
  );
};

export default A_Loader;
