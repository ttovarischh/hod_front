import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { FlexBox, G_Text, A_Text, H_Text, E_Text } from "../../common";
import {
  Animated,
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
} from "react-native";
import A_Icon from "../Atoms/A_Icon";
import A_MicroStat from "../Atoms/A_MicroStat";
import A_ToggleButton from "../Atoms/A_ToggleButton";
import { onChange } from "react-native-reanimated";
import A_Tag from "../Atoms/A_Tag";

type AnimatedViewProps = {
  val5: any;
  handleFifthInputChange: any;
  handleKeyPress: any;
  tags?: any;
  handleCrossPress?: any;
};

const TextAreaFlexBox = styled(FlexBox)`
  position: relative;
  background-color: #262626;
  border-radius: 20px;
`;

const PlayerRealInputWrapper = styled.TextInput`
  height: 55px;
  background-color: #262626;
  border-radius: 12px;
  font-size: 18;
`;

const M_Languages = ({
  val5,
  handleFifthInputChange,
  handleKeyPress,
  tags,
  handleCrossPress,
}: AnimatedViewProps) => {
  return (
    <TextAreaFlexBox>
      <Text
        style={{
          fontSize: 18,
          color: "#C2BDBD",
          marginLeft: 12,
          marginTop: 8,
          overflow: "hidden",
        }}
      >
        Языки
      </Text>
      <FlexBox
        offsetTop="12"
        offsetLeft="12"
        alignItems="center"
        style={{ width: "100%", maxWidth: "100%", flexWrap: "wrap" }}
      >
        <View style={styles.tagsContainer}>
          {tags.map((tag: any, index: any) => (
            <A_Tag
              type="LanguageCreate"
              sublang={tag}
              handleCrossPress={handleCrossPress}
            />
          ))}
        </View>
        <PlayerRealInputWrapper
          placeholder="Впишите..."
          value={val5}
          placeholderTextColor="#8F8F8F"
          style={{ color: "#EDF2DC", paddingLeft: 0, height: 45 }}
          onChangeText={handleFifthInputChange}
          autoCapitalize="none"
          autoComplete="off"
          autoCorrect={false}
          onKeyPress={handleKeyPress}
        />
      </FlexBox>
    </TextAreaFlexBox>
  );
};

export default M_Languages;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  box: {
    backgroundColor: "blue",
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
  },
  expandedBox: {
    flex: 1,
  },
  text: {
    color: "white",
    fontWeight: "bold",
  },
  brd: {
    borderBottomColor: "#282828",
    borderBottomWidth: 1,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  tag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ddd",
    padding: 5,
    borderRadius: 10,
    marginRight: 5,
    marginBottom: 5,
  },
  tagText: {
    marginRight: 5,
  },
  removeTag: {
    color: "#555",
    fontSize: 12,
    marginLeft: 5,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginTop: 5,
  },
});
