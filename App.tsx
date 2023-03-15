import * as React from "react";
import { useState, useEffect, useCallback } from "react";
import { StatusBar, LogBox } from "react-native";
import styled, { ThemeProvider } from "styled-components/native";
import theme from "./src/common/themes/mainTheme";
import { NavigationContainer } from "@react-navigation/native";
import Navigation from "./src/components/Navigation";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import "./src/i18/IMLocalize";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import useAuth, {AuthProvider} from "./src/contexts/newAuthContext/useAuth";

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
  const { user, loadingInitial } = useAuth();
  console.log("user from context" + JSON.stringify(user));

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setAppIsReady(true);
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady && fontsLoaded && !loadingInitial) {
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
