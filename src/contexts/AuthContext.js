import createDataContext from "./createDataContext";
import { apiUrl } from "../screens/const";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { removeItem } from "./async-storage";

const authReducer = (state, action) => {
  switch (action.type) {
    case "signout":
      return { token: null, email: "" };
    case "restore":
    case "signin":
    case "signup":
      return {
        token: action.payload.token,
        email: action.payload.email,
      };
    default:
      return state;
  }
};

const doSignIn = async (email, password) => {
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
      // setToken(json.jti);
      AsyncStorage.setItem("@AuthData", JSON.stringify(json));
      alert('You are successfully logged in as a user "' + json.email + '"');
    } else if (typeof json["message"] !== "undefined") {
      alert(json.message);
    } else console.log(json);
  } catch (error) {
    alert(error);
  } finally {
  }
};

// const signin = (dispatch) => {
//     return (email, password) => {
//       doSignIn(email, password);

//       dispatch({
//         type: "signin",
//         payload: {
//           token: "some access token here",
//           email,
//         },
//       });
//     };
//   };

const signup = (dispatch) => {
  return (email, password1, password2) => {
    doSignUp(email, password1, password2);
    // console.log("Signup");

    dispatch({
      type: "signup",
      payload: {
        token: "some new awesome access token here",
        email,
      },
    });
  };
};

// const signup = dispatch => {
//     return ({email, password}) => {
//       console.log('Signup');
//     };
//   };

const doSignUp = async (email, password1, password2) => {
  try {
    const response = await fetch(apiUrl + "signup", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          email: email,
          password: password1,
          password_confirmation: password2,
        },
      }),
    });
    const json = await response.json();
    console.log(json);
    //   setUser(json);

    if (typeof json["user"] !== "undefined") {
      // setUser(json.user);
      AsyncStorage.setItem("@AuthData", JSON.stringify(json));
      alert(
        'You are successfully signed up as a user "' + json.user.email + '"'
      );
    } else if (typeof json["message"] !== "undefined") {
      alert(json.message);
    } else console.log(json);
  } catch (error) {
    console.error(error);
  } finally {
    console.log("Signup");
  }
};

// const restore = (dispatch) => {
//     return ({ email, token }) => {
//       console.log("Restored");
//     };
//   };

const restore = (dispatch) => {
  return ({ email, token }) => {
    //   doSignIn(email, password);
    console.log("Restored all");

    dispatch({
      type: "restore",
      payload: {
        token,
        email,
      },
    });
  };
};

const signin = (dispatch) => {
  return (email, password) => {
    doSignIn(email, password);

    dispatch({
      type: "signin",
      payload: {
        token: "some access token here",
        email,
      },
    });
  };
};

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
          email: "polinasot@gmail.com",
        },
      }),
    });
    await AsyncStorage.removeItem("@AuthData");
    // await removeItem();
    alert('You are successfully logged out as a user "' + json.email + '"');
  } catch (error) {
    alert(error);
  } finally {
  }
};

const signout = (dispatch) => {
  return () => {
    doSignOut();
    dispatch({ type: "signout" });
  };
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signin, signout, signup, restore },
  { token: null, email: "" }
);
