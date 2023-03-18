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
            style={[styles.buttonContainer, { marginBottom: 14 }]}
            disabled={selectedLanguage}
            onPress={() => {
              setLanguage(language.code);
            }}
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
    marginBottom: 48,
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
    fontFamily: "PP",
    fontSize: 20,
    lineHeight: 20,
    color: "white",
    marginRight: 24,
  },
  text_not: {
    fontFamily: "PP",
    fontSize: 20,
    lineHeight: 20,
    color: "black",
    marginRight: 24,
  },
  selectedText: {
    fontFamily: "PP",
    fontSize: 20,
    lineHeight: 20,
    fontWeight: "600",
    color: "#B9FF46",
    paddingVertical: 4,
    marginRight: 24,
  },
});

export default Selector;
