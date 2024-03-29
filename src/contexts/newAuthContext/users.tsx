import { apiUrl } from "../../screens/const";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getCurrentUser() {
  const value = await AsyncStorage.getItem("@AuthData");
  console.log(value);
  // @ts-ignore
  return JSON.parse(value);
}

export async function getFirstT() {
  const value = await AsyncStorage.getItem("@firstTCompleted");
  console.log(value);
  // @ts-ignore
  return JSON.parse(value);
}

export async function getSecondT() {
  const value = await AsyncStorage.getItem("@secondTCompleted");
  console.log(value);
  // @ts-ignore
  return JSON.parse(value);
}

export async function getOnboardingCompleted() {
  const value = await AsyncStorage.getItem("@OnboardingCompleted");
  console.log(value);
  // @ts-ignore
  return JSON.parse(value);
}

export async function signUp(params: {
  email: string;
  password: string;
  password_confirmation: string;
  username: string;
}) {
  try {
    const response = await fetch(apiUrl + "signup", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          email: params.email,
          password: params.password,
          password_confirmation: params.password_confirmation,
          username: params.username,
        },
      }),
    });
    const json = await response.json();
    console.log(json);
    if (typeof json["user"] !== "undefined") {
      AsyncStorage.setItem("@AuthData", JSON.stringify(json));
    } else if (typeof json["message"] !== "undefined") {
      alert(json.message);
    } else console.log(json);
  } catch (error) {
    console.error(error);
  } finally {
    console.log("Signup");
  }
}
