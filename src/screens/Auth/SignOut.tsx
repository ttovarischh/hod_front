import React from 'react';
import {Button, Text, View} from 'react-native';

import { useAuth } from '../../contexts/Auth';


const SignOutScreen = () => {
  const auth = useAuth();
  const signOut = () => {
    auth.signOut();
  };

  return (
    <View>
      <Text>HOME SCREEN</Text>
      <Button title="Sign Out" onPress={signOut} />
    </View>
  );
};

export default SignOutScreen;