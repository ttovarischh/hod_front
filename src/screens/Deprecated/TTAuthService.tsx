// import { Auth } from 'aws-amplify';
import { apiUrl } from '../screens/const';
import AsyncStorage from "@react-native-async-storage/async-storage";

const signIn = async (email, password) => {
  try {
    const response = await fetch(apiUrl + "login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          email: email,
          password: password,
        },
      }),
    });
    let json = await response.json(); // получаем тело ответа
    console.log(json);

    if (typeof json["jti"] !== "undefined") {
      setToken(json.jti);
      AsyncStorage.setItem('@AuthData', JSON.stringify(json));
      alert('You are successfully logged in as a user "' + json.email + '"');
    } else if (typeof json["message"] !== "undefined") {
      alert(json.message);
    } else console.log(json);
  } catch (error) {
    alert(error);
  } finally {
  }
};


// const signIn = async (email, password) => {
//   try {
//     const response = await Auth.signIn(email, password);
//     return response;
//   } catch (error) {
//     throw new Error(error.message);
//   }
// };

const signUp = async (username, password) => {
  try {
    const response = await Auth.signUp({ username, password });
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

const confirmSignUp = async (email, code) => {
  try {
    const response = await Auth.confirmSignUp(email, code, {
      forceAliasCreation: true
    });
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

const signOut = async () => {
  try {
    const response = await Auth.signOut();
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

const checkAuth = async () => {
  try {
    const response = await Auth.currentAuthenticatedUser();
    const { attributes, signInUserSession } = response;
    return { attributes, jwtToken: signInUserSession.accessToken.jwtToken };
  } catch (error) {
    throw new Error(error.message);
  }
};

export { signIn, signOut, checkAuth, signUp, confirmSignUp };