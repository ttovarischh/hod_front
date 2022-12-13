import React, { useContext, FC } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { ThemeContext } from "styled-components";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
// import EffectsScreen from "../screens/EffectsScreen";
import A_Icon from "./A_Icon";
import { FlexBox, SmallText } from "../common";
import styled, { ThemeProvider } from "styled-components/native";
import { createStackNavigator } from "@react-navigation/stack";
import SingleEffectsScreen from "../screens/SingleEffectScreen";
import EffectsList from "../screens/EffectsList";
import GamesScreen from "../screens/Home/GamesScreen";
import JoinGameScreen from "../screens/Home/JoinGameScreen";
import SingleGameScreen from "../screens/Home/SingleGame";

const FooterWrapper = styled(FlexBox)`
  width: 100%;
  position: fixed;
  bottom: 0;
  background-color: ${({ theme }) => theme.bottomBar.bg};
  border-bottom-left-radius: 22%;
  border-bottom-right-radius: 22%;
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
  padding-left: ${({ isPrima = false }: TabProps) => (isPrima ? "32px" : "0")};
  padding-right: ${({ isPrima = false }: TabProps) => (isPrima ? "32px" : "0")};
  background-color: ${({ isPrima = false }: TabProps) =>
    isPrima ? ({ theme }) => theme.bottomBar.tab : "transparent"};
  min-width: ${({ isPrima = false }: TabProps) => (isPrima ? "126px" : "0")};
  flex-shrink: 0;
`;

const TabText = styled(SmallText)`
  margin-top: 12px;
`;

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
    <FooterWrapper alignItems="center" justifyContent="space-between" style={[styles.card, styles.shadowProp]}>
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
              <TabText
                style={{
                  color: isFocused ? theme.text.active : theme.text.inactive,
                }}
              >
                {label}
              </TabText>
            </TouchableOpacity>
          </Tab>
        );
      })}
    </FooterWrapper>
  );
}

const EffectsNavigator = createStackNavigator();

function EffectsScreen() {
  return (
    <EffectsNavigator.Navigator
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: "horizontal",
        headerShown: false,
      }}
    >
      <EffectsNavigator.Screen name="EffectsList" component={EffectsList} />
      <EffectsNavigator.Screen name="Single" component={SingleEffectsScreen} />
    </EffectsNavigator.Navigator>
  );
}

const HomeNavigator = createStackNavigator();

function Home() {
  return (
    <HomeNavigator.Navigator
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: "horizontal",
        headerShown: false,
      }}
    >
      <HomeNavigator.Screen name="Home" component={HomeScreen} />
      <HomeNavigator.Screen name="Games" component={GamesScreen} />
      <HomeNavigator.Screen name="Join" component={JoinGameScreen} />
      <HomeNavigator.Screen name="SGame" component={SingleGameScreen}/>
    </HomeNavigator.Navigator>
  );
}

export default function O_BottomBar() {
  // const Tab = createMaterialBottomTabNavigator();
  const Tab = createBottomTabNavigator();
  const theme = useContext(ThemeContext);
  return (
    <ThemeProvider theme={theme}>
      <Tab.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="home"
        tabBar={(props) => <CustomTabBar {...props} />}
      >
        <Tab.Screen
          name="effects"
          component={EffectsScreen}
          options={{
            tabBarIcon: () => (
              <A_Icon iconName="effects" fill={theme.bottomBar.ic}></A_Icon>
            ),
          }}
        />
        <Tab.Screen
          name="home"
          component={Home}
          options={{
            tabBarIcon: () => (
              <A_Icon iconName="home" fill={theme.bottomBar.ic}></A_Icon>
            ),
          }}
        />
        <Tab.Screen
          name="profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: () => (
              <A_Icon iconName="profile" fill={theme.bottomBar.ic}></A_Icon>
            ),
          }}
        />
      </Tab.Navigator>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 24,
  },
  shadowProp: {
    shadowColor: "#151516",
    shadowOffset: { width: 5, height: -8 },
    shadowOpacity: 0.5,
    shadowRadius: 5.62,
  },
});
