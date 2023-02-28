import * as React from "react";
import { useState, useEffect, useCallback } from "react";
import { StatusBar } from "react-native";
import styled, { ThemeProvider } from "styled-components/native";
import theme from "./src/common/themes/mainTheme";
import { NavigationContainer } from "@react-navigation/native";
import O_Navigation from "./src/components/O_Navigation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from "expo-splash-screen";
import { LogBox } from "react-native";
import { Provider as AuthProvider } from "./src/contexts/AuthContext";
import { Context as AuthContext } from "./src/contexts/AuthContext";
import { useFonts } from 'expo-font';
import { Text } from "react-native";

LogBox.ignoreLogs([`to contain units`, `key`]);

const MainAppContainer = styled.View`
  position: relative;
  flex: 1;
  min-height: 100%;
  background: red;
`;

function App() {
  const [fontsLoaded] = useFonts({
    'PP': require('./assets/fonts/PPNeueMontreal-Medium.otf'),
  });

  const [appIsReady, setAppIsReady] = useState(false);
  const [authData, setAuthData] = useState<null>();

  const { state, restore } = React.useContext(AuthContext);
  console.log(state);


  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
      await loadStorageData();
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setAppIsReady(true);
    }
    prepare();
  }, []);

  async function restoreToken(_authData: any): Promise<void> {
    try {
      setAuthData(_authData);
      let email = _authData.email;
      let token = _authData.token;
      restore(email, token);
    } catch (error) {
    } finally {
    }
  }

  async function loadStorageData(): Promise<void> {
    try {
      const authDataSerialized = await AsyncStorage.getItem("@AuthData");
      if (authDataSerialized != null) {
        const _authData = JSON.parse(authDataSerialized);
        console.log("This is ur storage Polina");
        console.log(_authData);

        await restoreToken(_authData);
      } else {
        setAuthData(null);
      }
    } catch (error) {
    } finally {
    }
  }

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady && fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    // <AuthProvider>
    <NavigationContainer>
      <ThemeProvider theme={theme}>
        <MainAppContainer onLayout={onLayoutRootView}>
          <StatusBar barStyle="light-content" translucent={true} />
          {/* <MainAppContainer> */}
          {/* <StatusBar style="light" /> */}
          <O_Navigation></O_Navigation>
        </MainAppContainer>
      </ThemeProvider>
    </NavigationContainer>
    // </AuthProvider>
  );
}

export default () => {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
};
