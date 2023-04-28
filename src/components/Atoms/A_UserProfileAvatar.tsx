import React, { useContext } from "react";
import styled from "styled-components/native";
import { FlexBox } from "../../common";
import { E_Text, SuperBigText } from "../../common";

type Props = {
  upperString: any;
  downString: any;
};

const BigAvatarWrapper = styled(FlexBox)`
  border-radius: 1000%;
  background: #1a1a1a;
  width: 404px;
  height: 404px;
  margin-bottom: 30px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
`;

const A_UserProfileAvatar = ({ upperString, downString, ...rest }: Props) => {
  return (
    <BigAvatarWrapper>
      <E_Text offsetTop={30} color="white">
        {upperString}
      </E_Text>
      <SuperBigText>{downString}</SuperBigText>
    </BigAvatarWrapper>
  );
};

export default A_UserProfileAvatar;
