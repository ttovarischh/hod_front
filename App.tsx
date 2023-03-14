import * as React from "react";
import { useState, useEffect, useCallback } from "react";
import { StatusBar, LogBox } from "react-native";
import styled, { ThemeProvider } from "styled-components/native";
import theme from "./src/common/themes/mainTheme";
import { NavigationContainer } from "@react-navigation/native";
import Navigation from "./src/components/Navigation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from "expo-splash-screen";
import { Provider as AuthProvider } from "./src/contexts/AuthContext";
import { Context as AuthContext } from "./src/contexts/AuthContext";
import { useFonts } from "expo-font";
import "./src/i18/IMLocalize";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

LogBox.ignoreLogs([`to contain units`, `key`]);

const MainAppContainer = styled.View`
  position: relative;
  flex: 1;
  min-height: 100%;
  background: red;
`;

function App() {
  const [fontsLoaded] = useFonts({
    PP: require("./assets/fonts/PPNeueMontreal-Medium.otf"),
  });
  const [appIsReady, setAppIsReady] = useState(false);
  const { state, restore } = React.useContext(AuthContext);

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
      await retrieveData();
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setAppIsReady(true);
    }
    prepare();
  }, []);

  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("@AuthData");
      if (value !== null) {
        const _authData = JSON.parse(value);
        const email = _authData.username;
        const token = _authData.jti;
        restore(email, token);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady && fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <NavigationContainer>
      <ThemeProvider theme={theme}>
        <MainAppContainer onLayout={onLayoutRootView}>
          <StatusBar barStyle="light-content" translucent={true} />
          <Navigation></Navigation>
        </MainAppContainer>
      </ThemeProvider>
    </NavigationContainer>
  );
}

export default () => {
  return (
    <AuthProvider>
      <BottomSheetModalProvider>
        <App />
      </BottomSheetModalProvider>
    </AuthProvider>
  );
};
