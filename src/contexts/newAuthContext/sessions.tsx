import AsyncStorage from "@react-native-async-storage/async-storage";

export async function login(params: { email: string; password: string }) {
    try {
      const response = await fetch("http://localhost:3000/api/v1/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: {
            email: params.email,
            password: params.password,
          },
        }),
      });
      let json = await response.json();
      console.log(json);
      if (typeof json["jti"] !== "undefined") {
        AsyncStorage.setItem("@AuthData", JSON.stringify(json));
        console.log('You are successfully logged in as a user "' + json.email + '"');
      } else if (typeof json["message"] !== "undefined") {
        alert(json.message);
      } else console.log(json);
      return json;
    } catch (error) {
      alert(error);
    } finally {
    }
  }
  
  export async function logout(params: { email: string }) {
    try {
      const response = await fetch("http://localhost:3000/api/v1/logout", {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: {
            email: params.email,
          },
        }),
      });
      await AsyncStorage.removeItem("@AuthData");
      console.log("You successfully logged out");
    } catch (error) {
      alert(error);
    } finally {
    }
  }
  