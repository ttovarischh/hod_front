// common_stuff
import React, { useContext } from "react";
import { ThemeContext, ThemeProvider } from "styled-components/native";
import useAuth from "../contexts/newAuthContext/useAuth";
import { useTranslation } from "react-i18next";
// react_navigation
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import M_BottomBar from "./M_BottomBar";
// screens
import Signin from "../screens/Auth/SignIn";
import SignUpScreen from "../screens/Auth/SignUp";
import SingleEffectsScreen from "../screens/Effect/SingleEffectScreen";
import EffectsList from "../screens/Effect/EffectsList";
import CreateGameScreen from "../screens/Home/CreateGameScreen";
import JoinGameScreen from "../screens/Home/JoinGameScreen";
import SingleGameScreen from "../screens/Home/SingleGame";
import HomeScreen from "../screens/Home/HomeScreen";
import ProfileScreen from "../screens/Profile/ProfileScreen";
import SettingsScreen from "../screens/Profile/SettingsScreen";
import PlayerConcScreen from "../screens/Home/PlayerConcScreen";
import ChangeEmailScreen from "../screens/Profile/ChangeEmailScreen";

const ProfileNavigator = createStackNavigator();
function ProfileStack() {
  const { t } = useTranslation();
  return (
    <ProfileNavigator.Navigator
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: "horizontal",
        headerShown: false,
        headerStyle: {
          backgroundColor: "black",
          height: 80,
        },
        headerShadowVisible: false,
        headerBackTitleVisible: false,
        headerTintColor: "#636364",
      }}
      initialRouteName="EffectsList"
    >
      <ProfileNavigator.Screen name="Profile" component={ProfileScreen} />
      <ProfileNavigator.Screen name="Settings" component={SettingsScreen} />
      <ProfileNavigator.Screen
        name="ChangeEmail"
        component={ChangeEmailScreen}
      />
    </ProfileNavigator.Navigator>
  );
}

const EffectsNavigator = createStackNavigator();
function EffectsStack() {
  return (
    <EffectsNavigator.Navigator
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: "horizontal",
        headerShown: false,
        headerStyle: {
          backgroundColor: "black",
          height: 80,
        },
        headerShadowVisible: false,
        headerBackTitleVisible: false,
        headerTintColor: "#636364",
      }}
      initialRouteName="EffectsList"
    >
      <EffectsNavigator.Screen
        name="EffectsList"
        component={EffectsList}
        options={{
          headerShown: false,
          title: "Эффекты",
        }}
      />
      <EffectsNavigator.Screen
        name="Single"
        component={SingleEffectsScreen}
        options={{
          headerShown: false,
          title: "Отдельный эффект",
        }}
      />
    </EffectsNavigator.Navigator>
  );
}

const HomeNavigator = createStackNavigator();
function HomeStack(props: { route: any; navigation: any }) {
  const { navigation, route } = props;
  const routeName = getFocusedRouteNameFromRoute(route);
  React.useEffect(() => {
    if (routeName === "SGame") {
      navigation.setOptions({
        tabBarVisible: false,
      });
    } else if (routeName === "PlayerConc") {
      navigation.setOptions({
        tabBarVisible: false,
      });
    } else {
      navigation.setOptions({
        tabBarVisible: true,
      });
    }
  }, [navigation, route]);

  return (
    <HomeNavigator.Navigator
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: "horizontal",
      }}
    >
      <HomeNavigator.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <HomeNavigator.Screen
        name="Create"
        component={CreateGameScreen}
        options={{ headerShown: false }}
      />
      <HomeNavigator.Screen
        name="Join"
        component={JoinGameScreen}
        options={{ headerShown: false }}
      />
      <HomeNavigator.Screen
        name="SGame"
        component={SingleGameScreen}
        options={{ headerShown: false }}
      />
      <HomeNavigator.Screen
        name="PlayerConc"
        component={PlayerConcScreen}
        options={{ headerShown: false }}
      />
    </HomeNavigator.Navigator>
  );
}

const TabNavigator = createBottomTabNavigator();
function MainFlow() {
  return (
    <TabNavigator.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          backgroundColor: "yellow",
        },
      }}
      initialRouteName="HomeStack"
      tabBar={(props) => <M_BottomBar {...props} />}
    >
      <TabNavigator.Screen
        name="EffectsStack"
        component={EffectsStack}
        options={{
          headerShown: false,
          title: "Эффекты",
        }}
      />
      <TabNavigator.Screen
        name="HomeStack"
        component={HomeStack}
        options={{ headerShown: false }}
      />
      <TabNavigator.Screen
        name="ProfileStack"
        component={ProfileStack}
        options={{ headerShown: false }}
      />
    </TabNavigator.Navigator>
  );
}

const AuthStack = createStackNavigator();
function AuthFlow() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        options={{ headerShown: false }}
        name="Signin"
        component={Signin}
      />
      <AuthStack.Screen
        options={{ headerShown: false }}
        name="SignUp"
        component={SignUpScreen}
      />
    </AuthStack.Navigator>
  );
}

export default function Navigation() {
  const MainStack = createStackNavigator();
  const theme = useContext(ThemeContext);
  const { user } = useAuth();

  return (
    <ThemeProvider theme={theme}>
      <MainStack.Navigator>
        {!user ? (
          <>
            <MainStack.Screen
              options={{ headerShown: false }}
              name="AuthFlow"
              component={AuthFlow}
            />
          </>
        ) : (
          <MainStack.Screen
            options={{
              headerShown: false,
            }}
            name="MainFlow"
            component={MainFlow}
          />
        )}
      </MainStack.Navigator>
    </ThemeProvider>
  );
}
