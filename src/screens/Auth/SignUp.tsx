import * as React from "react";
import { useState, useContext } from "react";
import {
  SafeAreaView,
  TextInput,
  Button,
  View,
  Text,
  StyleSheet,
} from "react-native";
import { apiUrl } from "../const";
import { Context as AuthContext } from "../../contexts/deprecatedContext/AuthContext";

function SignUpScreen(props: { route: any; navigation: any }) {
  const { navigation } = props;
  const [password1, onChangePassword1] = React.useState("password3");
  const [password2, onChangePassword2] = React.useState("password3");
  const [email, onChangeEmail] = React.useState("advev@mail.ru");

  const { state, signup } = useContext(AuthContext);

  const emptyUser = {
    email: "",
    password: "",
    password_confirmation: "",
  };
  const [user, setUser] = useState(emptyUser);

  // function signUp() {
  //   signOut();
  //   doSignUp();
  // }

  // function signOut() {
  //   setUser(emptyUser);
  // }

  const doSignUp = async () => {
    try {
      const response = await fetch(apiUrl + "signup", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: {
            email: "email@gmail.com",
            password: "password12",
            password_confirmation: "password12",
          },
        }),
      });
      const json = await response.json();
      console.log(json);
      setUser(json);

      if (typeof json["user"] !== "undefined") {
        setUser(json.user);

        alert(
          'You are successfully signed up as a user "' + json.user.email + '"'
        );
      } else if (typeof json["message"] !== "undefined") {
        alert(json.message);
      } else console.log(json);
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  return (
    <SafeAreaView>
      <TextInput
        style={styles.input}
        onChangeText={onChangeEmail}
        value={email}
        placeholder="Enter email"
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangePassword1}
        value={password1}
        placeholder="Enter password"
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangePassword2}
        value={password2}
        placeholder="Enter password again"
      />
      {/* <Button
        onPress={signUp}
        title="Sign up"
        color="#841584"
        accessibilityLabel="Learn more"
      /> */}
      <Button
        title="Sign UUPP"
        onPress={() => {
          console.log("Clicked to sign up");
          signup(email, password1, password2);
          // doSignUp();
          // () => navigation.navigate('Signin')
        }}
      />
      <View style={styles.text}>
        <Text>
          {" "}
          {user.password === "" ? "" : "User password: " + user.password}{" "}
        </Text>
        <Text> {user.email === "" ? "" : "User email: " + user.email} </Text>
      </View>
    </SafeAreaView>
  );
}

export default SignUpScreen;

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  text: {
    margin: 12,
  },
});
