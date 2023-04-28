import React, { useContext } from "react";
import { ThemeContext } from "styled-components/native";
import styled from "styled-components/native";
import { FlexBox } from "../../common";
import { B_Text, G_Text } from "../../common";
import A_Icon from "./A_Icon";
import { StyleSheet } from "react-native";

type Props = {
  type: string;
  onPress?: any;
  colorCondition?: any;
  valueCondition?: any;
  placeholder?: any;
};

const SettingsItem = styled(FlexBox)`
  margin-bottom: 24;
  display: flex;
  flex-direction: row;
  height: 36px;
  border-bottom: 1px solid #1a1a1a;
  width: 100%;
`;

const SettingsItemText = styled.Text`
  font-size: 20px;
  line-height: 20px;
  color: white;
  margin-right: 24;
`;

const SettingsItemLink = styled.TouchableOpacity`
  display: flex;
  width: 100%;
  flex: 1;
  flex-wrap: no-wrap;
  margin-bottom: 24;
  flex-direction: row;
  height: 36px;
  justify-content: space-between;
`;

const SecondaryButton = styled(FlexBox)`
  width: 406px;
  height: 72px;
  justify-content: center;
  align-items: center;
  align-content: center;
  background: #1a1a1a;
  border-radius: 20px;
  margin-bottom: 32px;
`;

const SettingsTextArea = styled.TextInput`
  font-size: 20px;
  line-height: 20px;
  margin-right: 24;
`;

const A_SettingsItem = ({
  onPress,
  type,
  colorCondition,
  valueCondition,
  placeholder,
}: Props) => {
  const theme = useContext(ThemeContext);
  if (type === "UsernameInput") {
    return (
      <SettingsItem offsetTop="40" style={styles.buttonContainer}>
        <SettingsTextArea
          autoCapitalize={"none"}
          multiline={false}
          placeholderTextColor="#404040"
          style={{
            color: colorCondition ? "#404040" : "white",
            fontFamily: "PP",
          }}
          numberOfLines={4}
          onChangeText={onPress}
          placeholder={placeholder}
          value={valueCondition}
        />
      </SettingsItem>
    );
  } else if (type === "AboutInput") {
    return (
      <SettingsItem style={styles.buttonContainer}>
        <SettingsTextArea
          multiline={true}
          placeholderTextColor="#404040"
          style={{
            color: colorCondition ? "#404040" : "white",
            fontFamily: "PP",
          }}
          numberOfLines={4}
          onChangeText={onPress}
          placeholder={placeholder}
          value={valueCondition}
        />
      </SettingsItem>
    );
  } else if (type === "Link") {
    return (
      <SettingsItemLink
        style={[styles.buttonContainer, { display: "flex", width: "100%" }]}
        onPress={onPress}
      >
        <SettingsItemText
          style={{
            fontFamily: "PP",
            marginRight: 0,
          }}
        >
          {placeholder}
        </SettingsItemText>
        <A_Icon iconName="navigate" />
      </SettingsItemLink>
    );
  }
  return <></>;
};

export default A_SettingsItem;

const styles = StyleSheet.create({
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    height: 36,
    borderBottomWidth: 1,
    borderBottomColor: "#1A1A1A",
    width: "100%",
  },
});
