import React from "react";
import { View, Pressable, Text, StyleSheet } from "react-native";

type SelectorProps = {
  arraymap: any;
  selectedCondition: any;
  setState: any;
  toSet: any;
};

const A_Selector = (props: SelectorProps) => {
  return (
    <View style={styles.container}>
      {props.arraymap.map((item: any) => {
        const selected = item.code == props.selectedCondition;
        return (
          <Pressable
            key={item.code}
            style={[styles.buttonContainer, { marginBottom: 24 }]}
            disabled={selected}
            onPress={() => {
              props.setState((prevState: any) => ({
                ...prevState,
                [props.toSet]: item.code,
              }));
            }}
          >
            <Text style={[selected ? styles.selectedText : styles.text_not]}>
              ✓
            </Text>
            <Text style={styles.text}>{item.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
};

export default A_Selector;

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  buttonContainer: {
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
