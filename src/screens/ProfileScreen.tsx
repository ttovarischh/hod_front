import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

function ProfileScreen(props: { navigation: any, route: any }) {
  const { navigation } = props;

  const hideTabBar = () => {
    navigation.setOptions({
      tabBarVisible: false
    });
  };
  const showTabBar = () => {
    navigation.setOptions({
      tabBarVisible: true
    });
  };

  // React.useEffect(() => {
  //   navigation.setOptions({
  //     tabBarVisible: false
  //   });
  //   console.log("Hidden")
  // }, []);

    return (
      <View>
        <Text>UR profile</Text>
        <Button onPress={hideTabBar} title="Hide Tab Bar" color="#841584" />
        <Button onPress={showTabBar} title="Show Tab Bar" color="#841584" />
      </View>
    );

}

export default ProfileScreen;