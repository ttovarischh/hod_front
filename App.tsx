import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import O_Footer from './src/components/O_Footer'

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
      <O_Footer></O_Footer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
