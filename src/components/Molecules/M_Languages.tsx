import React from "react";
import styled from "styled-components/native";
import { FlexBox } from "../../common";
import { Text, StyleSheet, View } from "react-native";
import A_Tag from "../Atoms/A_Tag";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
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
        {t("common:languages")}
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
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
