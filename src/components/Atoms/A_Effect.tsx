import React, { useContext } from "react";
import { ThemeContext } from "styled-components/native";
import styled from "styled-components/native";
import { FlexBox } from "../../common";
import { B_Text, G_Text } from "../../common";
import A_Icon from "./A_Icon";

type Props = {
  item: {
    id: number;
    name: string;
    image: string;
  };
  onPress?: () => void;
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

const A_Effect = ({ item, onPress }: Props) => {
  const theme = useContext(ThemeContext);
  return (
    <>
      <CardWrapper direction="column" key={item.id}>
        <EffectLink onPress={onPress}>
          <A_Icon fill="white" iconName={item.image}></A_Icon>
          <EffectInfoWrapper direction="row">
            <B_Text offsetRight={1}>{item.name}</B_Text>
            <G_Text>&#40;{item.id}&#41;</G_Text>
          </EffectInfoWrapper>
        </EffectLink>
      </CardWrapper>
    </>
  );
};

export default A_Effect;
