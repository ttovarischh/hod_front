import React from "react";
import styled from "styled-components/native";
import { FlexBox } from "./FlexBox";

export const Loader = styled(FlexBox)`
  width: 100%;
  height: 200px;
  background-color: red;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  position: absolute;
  background: #989899;
  opacity: 0.5;
`;

