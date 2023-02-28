import React, { useContext, FC, useState } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { ThemeContext } from "styled-components";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/Home/HomeScreen";
import ProfileScreen from "../screens/Profile/ProfileScreen";
import A_Icon from "./A_Icon";
import { FlexBox, SmallText, NavBarText } from "../common";
import styled, { ThemeProvider } from "styled-components/native";
import { createStackNavigator } from "@react-navigation/stack";
import SingleEffectsScreen from "../screens/Effect/SingleEffectScreen";
import EffectsList from "../screens/Effect/EffectsList";
import CreateGameScreen from "../screens/Home/CreateGameScreen";
import JoinGameScreen from "../screens/Home/JoinGameScreen";
import SingleGameScreen from "../screens/Home/SingleGame";
// import SmallSingleGame from "../screens/Home/SmallSingleGame";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import Signin from "../screens/Auth/SignIn";
import SignUpScreen from "../screens/Auth/SignUp";
import { Context as AuthContext } from "../contexts/AuthContext";
import Tab1 from "../screens/Tab1";
import Tab2 from "../screens/Tab2";
import Tab3 from "../screens/Tab3";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text } from "react-native";

const FooterWrapper = styled(FlexBox)`
  width: 100%;
  position: relative;
  // bottom: 0px;
  background-color: ${({ theme }) => theme.bottomBar.bg};
  opacity: 1;
  border-bottom-left-radius: 22%;
  border-bottom-right-radius: 22%;
  height: 85px;
  padding-left: 60px;
  padding-right: 60px;
`;

const HeaderWrapper = styled.View`
  width: 100%;
  background-color: black;
  height: 44px;
`;

interface TabProps {
  isPrima?: boolean;
  isLeft?: boolean;
  isRight?: boolean;
}

const Tab = styled(FlexBox)`
  padding-top: 16px;
  padding-bottom: 16px;
  border-top-right-radius: ${({ isLeft = false }: TabProps) =>
    isLeft ? "10px" : "0"};
  border-top-left-radius: ${({ isRight = false }: TabProps) =>
    isRight ? "10px" : "0"};
  border-bottom-right-radius: ${({ isLeft = false }: TabProps) =>
    isLeft ? "10px" : "22%"};
  border-bottom-left-radius: ${({ isRight = false }: TabProps) =>
    isRight ? "10px" : "22%"};
  padding-left: ${({ isPrima = false }: TabProps) => (isPrima ? "42px" : "0")};
  padding-right: ${({ isPrima = false }: TabProps) => (isPrima ? "42px" : "0")};
  background-color: ${({ isPrima = false }: TabProps) =>
    isPrima ? ({ theme }) => theme.bottomBar.tab : "transparent"};
  // min-width: ${({ isPrima = false }: TabProps) => (isPrima ? "126px" : "0")};
  flex-shrink: 0;
`;

const TabText = styled(SmallText)`
  margin-top: 12px;
`;

function LogoTitle(props: { navigation: any; route: any; options: any }) {
  const { route, navigation, options } = props;
  return <NavBarText>{options.title}</NavBarText>;
}

// function NavHeader(props: { navigation: any; route: any, options: any }) {
//   const { route, navigation, options } = props;
//   return (
//     <HeaderWrapper>
//       <NavBarText>{options.title}</NavBarText>
//     </HeaderWrapper>
//   );
// }

function CustomTabBar(props: {
  state: any;
  descriptors: any;
  navigation: any;
}) {
  const { state, descriptors, navigation } = props;
  const focusedOptions = descriptors[state.routes[state.index].key].options;
  const theme = useContext(ThemeContext);

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <FooterWrapper
      alignItems="center"
      justifyContent="space-between"
      // style={styles.card}
    >
      {state.routes.map((route: any, index: any) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <Tab
            key={route.name}
            direction="column"
            alignItems="center"
            isLeft={route.name === "effects" ? true : false}
            isRight={route.name === "profile" ? true : false}
            isPrima={
              route.name === "effects" || route.name === "profile"
                ? true
                : false
            }
          >
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <A_Icon
                iconName={route.name}
                fill={isFocused ? theme.text.active : theme.text.inactive}
              ></A_Icon>
              {/* <TabText
                style={{
                  color: isFocused ? theme.text.active : theme.text.inactive,
                }}
              >
                {label}
              </TabText> */}
            </TouchableOpacity>
          </Tab>
        );
      })}
    </FooterWrapper>
  );
}

const EffectsNavigator = createStackNavigator();

function EffectsStack() {
  return (
    <EffectsNavigator.Navigator
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: "horizontal",
        headerShown: true,
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
          headerShown: true,
          title: "Эффекты",
        }}
      />
      <EffectsNavigator.Screen
        name="Single"
        component={SingleEffectsScreen}
        options={{
          headerShown: true,
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
      {/* <HomeNavigator.Screen
        name="Test"
        component={SmallSingleGame}
        options={{ headerShown: false }}
      /> */}
    </HomeNavigator.Navigator>
  );
}

const TabNavigator = createBottomTabNavigator();

function MainFlow() {
  return (
    <TabNavigator.Navigator
      screenOptions={{
        // header: (props) => <NavHeader {...props} />,
        headerShown: false,
      }}
      initialRouteName="HomeStack"
      tabBar={(props) => <CustomTabBar {...props} />}
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
      {/* <TabNavigator.Screen
        name="Tab1"
        component={Tab1}
        options={{ headerShown: false }}
      /> */}

      {/* <TabNavigator.Screen
        name="Tab2"
        component={Tab2}
        options={{ headerShown: false }}
      /> */}

      {/* <TabNavigator.Screen
        name="Tab3"
        component={Tab3}
        options={{ headerShown: false }}
      /> */}
      <TabNavigator.Screen
        name="ProfileStack"
        component={ProfileScreen}
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

export default function O_Navigation() {
  const MainStack = createStackNavigator();
  const [authData, setAuthData] = useState<null>();

  const theme = useContext(ThemeContext);

  const { state, restore } = React.useContext(AuthContext);

  return (
    <ThemeProvider theme={theme}>
      <MainStack.Navigator>
        {state.token === null ? (
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

const styles = StyleSheet.create({
  card: {
    paddingBottom: 30,
    marginBottom: -35,
    borderTopColor: "#383841",
    borderTopWidth: 1,
  },
});
