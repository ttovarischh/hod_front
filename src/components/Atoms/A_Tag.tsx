import React, { useContext } from "react";
import { ThemeContext } from "styled-components/native";
import styled from "styled-components/native";
import { FlexBox } from "../../common";
import { F_Text } from "../../common";
import A_Icon from "./A_Icon";
import { StyleSheet, TouchableOpacity, View } from "react-native";

type TagProps = {
  children?: React.ReactNode;
  type?: string;
  key?: any;
  sublang?: any;
  handleCrossPress?: any;
};

const PlayerWrapper = styled(FlexBox)`
  background-color: #edf2dc;
  border-radius: 20px;
  padding: 8px 20px 8px 20px;
  min-height: 34px;
  margin-right: 4px;
  margin-bottom: 4px;
`;

const AddEffectWrapper = styled(FlexBox)`
  background-color: #1b1b1b;
  border-radius: 35px;
  padding: 4px 16px 4px 16px;
  margin-right: 6px;
  margin-bottom: 6px;
`;

const LanguageTagWrapper = styled(FlexBox)`
  flex-direction: row;
  background-color: #383838;
  padding: 0;
  padding-left: 12;
  padding-right: 12;
  border-radius: 10;
  align-items: center;
  height: 30px;
  flex-wrap: no-wrap;
`;

const A_Tag = ({
  children,
  type,
  key,
  sublang,
  handleCrossPress,
  ...rest
}: TagProps) => {
  const theme = useContext(ThemeContext);

  if (type == "Effect") {
    return (
      <PlayerWrapper
        offsetRight="6"
        style={{ backgroundColor: "#373737", maxHeight: 26 }}
      >
        <F_Text color="#EDF2DC" lineHeight={18} key={key}>
          {children}
        </F_Text>
      </PlayerWrapper>
    );
  } else if (type == "PlusIcon") {
    return (
      <PlayerWrapper offsetRight="6">
        <A_Icon fill="#1A1A1A" iconName="plus"></A_Icon>
      </PlayerWrapper>
    );
  } else if (type == "AddEffect") {
    return (
      <AddEffectWrapper justifyContent="center">
        <F_Text center color="#373737">
          {children}
        </F_Text>
      </AddEffectWrapper>
    );
  } else if (type == "Language") {
    return (
      <FlexBox offsetRight="8" offsetBottom="8">
        <View style={styles.tag}>
          <F_Text lineHeight={30} color="#EDF2DC">
            {sublang}
          </F_Text>
        </View>
      </FlexBox>
    );
  } else if (type == "LanguageCreate") {
    return (
      <LanguageTagWrapper offsetRight="8" offsetBottom="8">
        <F_Text lineHeight={30} color="#EDF2DC" offsetRight={5}>
          {sublang}
        </F_Text>
        <TouchableOpacity onPress={handleCrossPress}>
          <A_Icon iconName="TagCross" />
        </TouchableOpacity>
      </LanguageTagWrapper>
    );
  }
  return <></>;
};

export default A_Tag;

const styles = StyleSheet.create({
  tag: {
    flexDirection: "row",
    alignSelf: "flex-start",
    backgroundColor: "#383838",
    padding: 0,
    paddingLeft: 12,
    paddingRight: 12,
    borderRadius: 10,
    alignItems: "baseline",
    height: 30,
  },
});
