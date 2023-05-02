import React, { useContext } from "react";
import { ThemeContext } from "styled-components/native";
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
  const theme = useContext(ThemeContext);
  return (
    <LoaderWrapper>
      <ActivityIndicator
        size="large"
        color={theme.service.loader}
        style={{ flex: 1 }}
      ></ActivityIndicator>
    </LoaderWrapper>
  );
};

export default A_Loader;
