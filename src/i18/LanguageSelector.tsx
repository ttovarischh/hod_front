import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useTranslation } from "react-i18next";

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "ru", label: "Русский" },
];

const Selector = () => {
  const { t, i18n } = useTranslation();
  const selectedLanguageCode = i18n.language;

  const setLanguage = (code: any) => {
    return i18n.changeLanguage(code);
  };

  return (
    <View style={styles.container}>
      {LANGUAGES.map((language) => {
        const selectedLanguage = language.code === selectedLanguageCode;
        return (
          <Pressable
            key={language.code}
            style={styles.buttonContainer}
            disabled={selectedLanguage}
            onPress={() => setLanguage(language.code)}
          >
            <Text
              style={[selectedLanguage ? styles.selectedText : styles.text_not]}
            >
              ✓
            </Text>
            <Text style={styles.text}>{language.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  buttonContainer: {
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    height: 36,
    borderBottomWidth: 1,
    borderBottomColor: "#1A1A1A",
    width: "100%",
  },
  text: {
    fontSize: 20,
    lineHeight: 20,
    color: "white",
    marginRight: 24,
  },
  text_not: {
    fontSize: 20,
    lineHeight: 20,
    color: "black",
    marginRight: 24,
  },
  selectedText: {
    fontSize: 20,
    lineHeight: 20,
    fontWeight: "600",
    color: "#B9FF46",
    paddingVertical: 4,
    marginRight: 24,
  },
});

export default Selector;
