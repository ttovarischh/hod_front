import React, { useContext } from "react";
import { ThemeContext } from "styled-components/native";
import styled from "styled-components/native";
import { FlexBox } from "../../common";
import { B_Text, G_Text } from "../../common";

type Props = {
  onPress?: any;
  type?: string;
  imageString?: any;
  src?: any;
  player_id?: any;
};

const EffectLink = styled.TouchableOpacity`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const EffectInfoWrapper = styled(FlexBox)`
  margin-left: 18px;
`;

const CardWrapper = styled(FlexBox)`
  width: 100%;
  margin-bottom: 10px;
  border-radius: 12px;
`;

const PlayerAvatar = styled.Image`
  width: 129px;
  height: 129px;
`;

const PlayerAvatarWrapper = styled.TouchableOpacity`
  background: #0e0e0e;
  width: 129px;
  height: 129px;
  border-radius: 20px;
  overflow: hidden;
  margin-bottom: 8px;
`;

const PlayerSmallAvatarWrapper = styled(FlexBox)`
  background-color: #0e0e0e;
  width: 57px;
  height: 57px;
  border-radius: 20px;
  overflow: hidden;
`;

const PlayerSmallAvatar = styled.Image`
  width: 57px;
  height: 57px;
`;

const SmallOrnament = styled.Image`
  width: 57px;
  height: 57px;
`;

const PlayerMediumAvatarWrapper = styled(FlexBox)`
  width: 116px;
  height: 116px;
  background-color: ${({ theme }) => theme.input.fill};
  border-radius: 20px;
  display: flex;
  justify-content: center;
  overflow: hidden;
  align-items: center;
`;

const PlayerMediumAvatar = styled.Image`
  width: 100%;
  height: 100%;
`;

const PlayerLargeAvatarWrapper = styled(FlexBox)`
  position: relative;
  width: 100%;
  height: 217px;
  margin-bottom: -15px;
`;

const PlayerLargeAvatar = styled.Image`
  width: 155px;
  height: 235px;
  position: absolute;
  bottom: -1px;
  left: 200px;
`;

const Ornament = styled.Image`
  width: 208px;
  height: 161px;
`;

const M_Portrait = ({ onPress, imageString, src, type, player_id }: Props) => {
  if (type === "BottomSheet") {
    return (
      <PlayerAvatarWrapper onPress={onPress}>
        <PlayerAvatar source={src} />
      </PlayerAvatarWrapper>
    );
  }
  if (type === "Small") {
    return (
      <PlayerSmallAvatarWrapper>
        <SmallOrnament
          style={{ resizeMode: "contain", bottom: 0, position: "absolute" }}
          source={
            player_id % 2 == 0
              ? require("../../../assets/images/Graphic1.png")
              : require("../../../assets/images/Graphic2.png")
          }
        />
        <PlayerSmallAvatar
          source={{
            uri: `${src}`,
          }}
        />
      </PlayerSmallAvatarWrapper>
    );
  }
  if (type === "Medium") {
    return (
      <PlayerMediumAvatarWrapper>
        <PlayerMediumAvatar
          source={{
            uri: `${src}`,
          }}
        />
      </PlayerMediumAvatarWrapper>
    );
  }
  if (type === "Large") {
    return (
      <PlayerLargeAvatarWrapper>
        <Ornament
          style={{ resizeMode: "contain", bottom: 0, position: "absolute" }}
          source={
            player_id % 2 == 0
              ? require("../../../assets/images/Graphic1.png")
              : require("../../../assets/images/Graphic2.png")
          }
        />
        <PlayerLargeAvatar
          style={{ resizeMode: "contain" }}
          source={{
            uri: `${src}`,
          }}
        />
      </PlayerLargeAvatarWrapper>
    );
  }
  return <></>;
};

export default M_Portrait;
