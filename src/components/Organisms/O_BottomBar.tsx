import React, { useContext } from "react";
import { ThemeContext } from "styled-components";
import styled from "styled-components/native";
import { BlurView } from "expo-blur";
import A_Icon from "../Atoms/A_Icon";
import { FlexBox } from "../../common";

const BottomBarContainer = styled(FlexBox)`
  width: 100%;
  height: 85px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
`;

const FooterWrapper = styled(FlexBox)`
  width: 100%;
  background-color: rgba(69, 69, 69, 0.6);
  height: 85px;
`;

const Tab = styled(FlexBox)`
  flex: 1;
  height: 51px;
`;

const TabLink = styled.TouchableOpacity`
  width: 100%;
  height: 100%;
  padding-top: 10;
  display: flex;
  align_items: center;
`;

export default function M_BottomBar(props: {
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
    <BottomBarContainer>
      <BlurView
        intensity={40}
        tint="dark"
        style={{ width: "100%", height: 85 }}
      >
        <FooterWrapper>
          {state.routes.map((route: any, index: any) => {
            const { options } = descriptors[route.key];
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
              <Tab key={route.name}>
                <TabLink
                  accessibilityRole="button"
                  accessibilityState={isFocused ? { selected: true } : {}}
                  accessibilityLabel={options.tabBarAccessibilityLabel}
                  testID={options.tabBarTestID}
                  onPress={onPress}
                  onLongPress={onLongPress}
                >
                  <A_Icon
                    iconName={route.name}
                    fill={isFocused ? theme.icons.white : theme.icons.grey}
                  ></A_Icon>
                </TabLink>
              </Tab>
            );
          })}
        </FooterWrapper>
      </BlurView>
    </BottomBarContainer>
  );
}
