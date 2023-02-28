import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { TextInput, Button } from "react-native";
import { Context as AuthContext } from "../../contexts/AuthContext";
import { apiUrl } from "../const";

const Signin = (props: { navigation: any }) => {
  const { navigation } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { state, signin } = useContext(AuthContext);

  const doSignOut = async () => {
    try {
      const response = await fetch(apiUrl + "logout", {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: {
            // email: "polinasot@gmail.com",
            // password: "polinka6677",
            email: "email@gmail.com",
            password: "password12",
          },
        }),
      });
      let json = await response.json(); // получаем тело ответа
      console.log(json);

      if (typeof json["jti"] !== "undefined") {
        // setToken(json.jti);
        // AsyncStorage.setItem('@AuthData', JSON.stringify(json));
        alert('You are successfully logged out as a user "' + json.email + '"');
      } else if (typeof json["message"] !== "undefined") {
        alert(json.message);
      } else console.log(json);
    } catch (error) {
      alert(error);
    } finally {
    }
  };

  return (
    <View style={styles.master}>
      <Text style={styles.header}>Auth Demo</Text>
      <TextInput placeholder="Email" onChangeText={setEmail} value={email} />
      <TextInput
        placeholder="Password"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
      />
      <Button
        title="Login"
        onPress={() => {
          console.log("Clicked to login");
          signin(email, password);
        }}
      />
      <Button
        title="OUT"
        onPress={() => {
          console.log("Clicked to sign out");
          doSignOut();
        }}
      />
      <View style={styles.link}>
        <Text style={styles.text}>Dont have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.text}>Sign up Here.</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  master: {
    padding: 16,
    flex: 1,
    alignItems: "stretch",
    justifyContent: "center",
  },
  header: {
    fontSize: 32,
    marginBottom: 18,
    alignSelf: "center",
  },
  text: {
    fontSize: 16,
    marginTop: 16,
  },
  link: {
    flexDirection: "row",
    justifyContent: "center",
  },
});

export default Signin;
