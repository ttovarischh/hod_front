import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, FlatList } from "react-native";
import styled from "styled-components/native";
import axios from "axios";

const HomeScreenWrapper = styled.View`
  background: red;
  height: 100%;
  color: white;
`;
const HomeScreenText = styled.Text`
  color: white;
`;

// class HomeScreen extends React.Component {
//   render() {
//     return (
//       // <View style={styles.container}>
//       <HomeScreenWrapper>
//         <HomeScreenText>SUKA BLYA!</HomeScreenText>
//         <HomeScreenText>Hellow world</HomeScreenText>
//       </HomeScreenWrapper>
//       // </View>
//     );
//   }
// }

function HomeScreen() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [testData, setTestData] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3000/api/v1/games')
      .then(({ data }) => {
        console.log(JSON.stringify(data))
        setData(data)
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  // async function fetchData() {
  //   try {
  //     const response = await axios.get("http://localhost:3000/api/v1/games");
  //     setTestData(response.data);
  //     console.log(JSON.stringify(testData));
  //   } catch (err) {
  //     const errorMessage = "Error: " + err.message;
  //     setError(errorMessage);
  //     console.log(errorMessage);
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  // useEffect(() => {
  //   fetchData();
  // }, []);

  interface IUser {
    id: string;
    index: string;
    indexInner: any;
    name: string;
    code: string;
    created_at: any;
    players: any;
  }

  return (
    // <View style={styles.container}>
    <HomeScreenWrapper>
      <HomeScreenText>SUKA BLYA!</HomeScreenText>
      <HomeScreenText>Hellow world</HomeScreenText>
      <Text>Fetched super duper good!</Text>
        <FlatList
          data={data}
          // keyExtractor={({ id, }: { id: number; }, index: number, indexInner: any) => id}
          keyExtractor={(item: IUser) => item.id}
          renderItem={({ item }) => (
            <>
            <Text>! {item.name} - {item.code} - {item.created_at} - {item.players.name}</Text>
            {item.players?.map((player: any, i: any) => (
              <>
                <Text>name: {player.name} hp: {player.hp}</Text>
              </>
            ))}
            </>
          )}
        />
    </HomeScreenWrapper>
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#eaeaea",
  },
});

export default HomeScreen;
