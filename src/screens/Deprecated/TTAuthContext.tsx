import createDataContext from './TTcreateDataContext';
import { apiUrl } from '../screens/const';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';

const AuthReducer = (state, action) => {
  switch (action.type) {
    case 'signout':
      return {token: null, email: ''};
    case 'signin':
    case 'signup':
      return {
        token: action.payload.token,
        email: action.payload.email,
      };
    default:
      return state;
  }
};

const signup = (dispatch: any) => {
  return ({email, password}) => {
    console.log('Signup');
  };
};

const [token, setToken] = useState('');

// const doSignIn = async (email: any, password: any) => {
//   try {
//     const response = await fetch(apiUrl + "login", {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         user: {
//           email: email,
//           password: password,
//         },
//       }),
//     });
//     let json = await response.json();
//     console.log(json);

//     if (typeof json["jti"] !== "undefined") {
//       setToken(json.jti);
//       AsyncStorage.setItem('@AuthData', JSON.stringify(json));
//       alert('You are successfully logged in as a user "' + json.email + '"');
//     } else if (typeof json["message"] !== "undefined") {
//       alert(json.message);
//     } else console.log(json);
//   } catch (error) {
//     alert(error);
//   } finally {
//   }
// };

const signin = (dispatch: any) => {
  return ({email, password}) => {
    // Do some API Request here
    // doSignIn(email, password);
    console.log('Signin Success');
    dispatch({
      type: 'signin',
      payload: {
        token: token,
        email,
      },
    });
  };
};

const signout = (dispatch: any) => {
  return () => {
    dispatch({type: 'signout'});
  };
};

export const {Provider, Context} = createDataContext(
  AuthReducer,
  {signin, signout, signup},
  {token: null, email: ''},
);