import React from "react";
import { FlexBox } from "../../common";
import { E_Text } from "../../common";
import A_Icon from "./A_Icon";

type TagProps = {
  text?: any;
  type?: string;
};

const A_MicroStat = ({ text, type, ...rest }: TagProps) => {
  return (
    <FlexBox
      offsetRight="16"
      alignItems="center"
      style={{ flexWrap: "nowrap" }}
    >
      <A_Icon iconName={type} />
      <E_Text offsetLeft={6}>{text}</E_Text>
    </FlexBox>
  );
};

export default A_MicroStat;
