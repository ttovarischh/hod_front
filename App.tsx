import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import styled, {ThemeProvider} from 'styled-components/native';
import O_Footer from './src/components/O_Footer'
import { theme } from './src/common/themes';


const MainAppContainer = styled.SafeAreaView`
  position: relative;
  flex: 1;
  min-height: 100%;
  background: black;
`;


export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <MainAppContainer>
        <StatusBar 
          style="light"
        />
        <ScrollView></ScrollView>
        <O_Footer theme={theme}></O_Footer>
      </MainAppContainer>
    </ThemeProvider>
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
