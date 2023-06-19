import React from "react";
import { FlexBox } from "../../common";
import A_Icon from "./A_Icon";

type TagProps = {
  fight?: boolean;
};

const A_MicroInit = ({ fight }: TagProps) => {
  return (
    <FlexBox
      offsetRight="16"
      alignItems="flex-start"
      justifyContent="center"
      style={{ width: "100%", backgroundColor: "#000000", height: 28 }}
    >
      {!fight ? (
        <A_Icon iconName="clock" width={16} height={22} fill="#717171" />
      ) : (
        <A_Icon iconName="clockFilled" width={16} height={22} fill="#F0FF00" />
      )}
    </FlexBox>
  );
};

export default A_MicroInit;
