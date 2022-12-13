import * as React from "react";
import { StatusBar } from "expo-status-bar";
import styled, { ThemeProvider } from "styled-components/native";
import theme from "./src/common/themes/mainTheme";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import O_BottomBar from "./src/components/O_BottomBar";
import {
  useFonts,
  Inter_100Thin,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
} from '@expo-google-fonts/inter';

const MainAppContainer = styled.SafeAreaView`
  position: relative;
  flex: 1;
  min-height: 100%;
  background: black;
`;

export default function App() {
  // const Stack = createNativeStackNavigator();
  // const Tab = createBottomTabNavigator();
  let [fontsLoaded] = useFonts({
    Inter_100Thin,
    Inter_200ExtraLight,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black,
  });
  return (
    <NavigationContainer>
      <ThemeProvider theme={theme}>
        <MainAppContainer>
          <StatusBar style="light" />
          <O_BottomBar></O_BottomBar>
        </MainAppContainer>
      </ThemeProvider>
    </NavigationContainer>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//     minHeight: '100vh',
//   },
// });
