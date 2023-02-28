import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native";
import { Context as AuthContext } from "../contexts/AuthContext";

const Tab3 = (props: { navigation: any }) => {
  const { navigation } = props;
  const { state, signout } = useContext(AuthContext);

  return (
    <View style={styles.master}>
      <Text style={styles.header}>Tab3</Text>
      <Button onPress={signout} title="Ready to Sign out?" />
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
    marginBottom: 8,
  },
});

export default Tab3;
