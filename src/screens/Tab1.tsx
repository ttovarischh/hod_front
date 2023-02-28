import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Context as AuthContext } from "../contexts/AuthContext";

const Tab1 = (props: { navigation: any }) => {
  const { navigation } = props;
  const { state } = useContext(AuthContext);

  return (
    <View style={styles.master}>
      <Text style={styles.header}>Tab1</Text>
      <Text style={{ fontSize: 28 }}>Welcome, {state.email}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  master: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 32,
  },
});

export default Tab1;
