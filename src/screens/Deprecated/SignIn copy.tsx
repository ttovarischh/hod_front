// import * as React from "react";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import {
//   SafeAreaView,
//   Text,
//   View,
//   TextInput,
//   Button,
//   StyleSheet,
// } from "react-native";
// import { apiUrl } from "../const";

// function SignInScreen(props: { route: any; navigation: any }) {
//   const [email, onChangeEmail] = React.useState("polinasot@gmail.com");
//   const [password, onChangePassword] = React.useState("polinka6677");
//   const [passwordConf, onChangePasswordConf] = React.useState("polinka6677");
//   const [token, setToken] = React.useState("");
//   const [newToken, setNewToken] = React.useState("");
//   const [isLogged, setIsLogged] = React.useState(false);

//   // const storageExpirationTimeInMinutes = 2;
//   // const now = new Date();
//   // now.setMinutes(now.getMinutes() + storageExpirationTimeInMinutes); // add the expiration time to the current Date time
//   // const expiryTimeInTimestamp = Math.floor(now.getTime() / 1000); // convert the expiry time in UNIX timestamp

//   // function saveData() {
//   //   _storeData = async () => {
//   //     try {
//   //       await AsyncStorage.setItem("token", token);
//   //     } catch (error) {
//   //       console.log(error);
//   //     }
//   //   };
//   // }

//   // const items = [['k1', 'val1'], ['k2', 'val2']]

// //   AsyncStorage.multiSet(items, () => {
// //     //to do something
// // });

// // .then((response) => AsyncStorage.setItem(LOGIN_TOKEN, response))

// // const storeData = async (value) => {
// //   try {
// //     await AsyncStorage.setItem('@storage_Key', value)
// //   } catch (e) {
// //     // saving error
// //   }
// // }

//   // const saveData = async (token: any) => {
//   //   // const tokenSet = ["token", token];
//   //   // const stateSet = ["state", isLogged];
//   //   // const itemsSet = [["token", token], ["state", isLogged]]
//   //   try {
//   //     await AsyncStorage.setItem("token", token);
//   //     console.log(token);
//   //     console.log("Succesfullu stored");
//   //     // getData();
//   //   } catch (error) {
//   //     console.log(error);
//   //   }
//   //   console.log("Done.");
//   // };

//   // const getToken = () => {
//   //   console.log("ur STATE token is")
//   //   console.log(token)
//   //   // saveData(token);
//   // }

//   const getData = async () => {
//     try {
//       const gotToken = await AsyncStorage.getItem('@AuthData');
//       if (gotToken !== null) {
//         console.log(gotToken);
//       } else {
//         console.log("AAAA SUKA")
//       }
//     } catch (e) {}
//   };

//   // const storeData = async (value) => {
//   //   try {
//   //     await AsyncStorage.setItem("@storage_Key", value);
//   //   } catch (e) {}
//   // };








//   // function signIn() {
//   //   doSignIn();
//   // }

//   function signOut() {
//     setToken("");
//     alert("You've successfully signed out");
//   }

//   // const doSignIn = async () => {
//   //   try {
//   //     const response = await fetch(apiUrl + "login", {
//   //       method: "POST",
//   //       headers: {
//   //         Accept: "application/json",
//   //         "Content-Type": "application/json",
//   //       },
//   //       body: JSON.stringify({
//   //         user: {
//   //           email: email,
//   //           password: password,
//   //         },
//   //       }),
//   //     });
//   //     let json = await response.json(); // получаем тело ответа
//   //     console.log(json);

//   //     if (typeof json["jti"] !== "undefined") {
//   //       setToken(json.jti);
//   //       AsyncStorage.setItem('@AuthData', JSON.stringify(json));
//   //       alert('You are successfully logged in as a user "' + json.email + '"');
//   //     } else if (typeof json["message"] !== "undefined") {
//   //       alert(json.message);
//   //     } else console.log(json);
//   //   } catch (error) {
//   //     alert(error);
//   //   } finally {
//   //   }
//   // };

//   return (
//     <SafeAreaView>
//       <TextInput
//         style={styles.input}
//         onChangeText={onChangeEmail}
//         value={email}
//         placeholder="Enter email"
//       />
//       <TextInput
//         style={styles.input}
//         onChangeText={onChangePassword}
//         value={password}
//         placeholder="Enter password"
//       />
//       <TextInput
//         style={styles.input}
//         onChangeText={onChangePasswordConf}
//         value={passwordConf}
//         placeholder="Enter password again"
//       />
//       <Button
//         onPress={token === "" ? signIn : signOut}
//         title={token === "" ? "Sign In" : "Sign out"}
//         color="#841584"
//         accessibilityLabel="Learn more"
//       />
//       {/* <Button
//         onPress={getToken}
//         title={token === "" ? "GET TOKEN FROM STATE" : "GET TOKEN FROM STATE"}
//         color="#841584"
//         accessibilityLabel="Learn more"
//       /> */}
//       <Button
//         onPress={getData}
//         title={token === "" ? "GET TOKEN" : "GET TOKEN"}
//         color="#841584"
//         accessibilityLabel="Learn more"
//       />
//       <View style={styles.text}>
//         <Text> {token === "" ? "no active user" : "Token: " + token} </Text>
//         {/* <Text> {userId === 0 ? "" : "User id: " + userId} </Text>
//         <Text> {userName === "" ? "" : "User name: " + userName} </Text> */}
//         <Text>from ASYNC STORAGE</Text>
//         <Text>{newToken === "" ? "no ASYNC STORAGE DATA" : newToken}</Text>
//       </View>
//     </SafeAreaView>
//   );
// }

// export default SignInScreen;

// const styles = StyleSheet.create({
//   input: {
//     height: 40,
//     margin: 12,
//     borderWidth: 1,
//     borderRadius: 5,
//     padding: 10,
//   },
//   text: {
//     margin: 12,
//   },
// });
