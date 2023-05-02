import React, { useContext } from "react";
import { ThemeContext } from "styled-components/native";
import styled from "styled-components/native";
import { FlexBox } from "../../common";
import { F_Text, E_Text } from "../../common";

type TagProps = {
  children?: React.ReactNode;
  expanded?: any;
  key?: any;
  name?: any;
  username?: any;
};

const CardHalfRow = styled(FlexBox)`
  height: 57px;
  flex: 1;
  background: ${({ theme }) => theme.card.part_fill};
  border-radius: 20px;
  padding-left: 12px;
  padding-right: 12px;
`;

const CardHalfRowB = styled(FlexBox)`
  flex: 1;
`;

const A_PlayerName = ({
  children,
  expanded,
  key,
  name,
  username,
  ...rest
}: TagProps) => {
  const theme = useContext(ThemeContext);

  if (expanded) {
    return (
      <CardHalfRow direction="column" justifyContent="center">
        <E_Text lineHeight={20} color="white">
          {name}
        </E_Text>
        <F_Text lineHeight={16} color={theme.text.crud}>
          {username ? username : "no username"}
        </F_Text>
      </CardHalfRow>
    );
  } else {
    return (
      <CardHalfRowB direction="row" justifyContent="space-between">
        <E_Text lineHeight={20} color="white">
          {name}
        </E_Text>
        <F_Text lineHeight={16} color={theme.text.crud}>
          {username ? username : "no username"}
        </F_Text>
      </CardHalfRowB>
    );
  }
};

export default A_PlayerName;
