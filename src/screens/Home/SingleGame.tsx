import React, { useState, useEffect, useContext } from "react";
import { Text, View, Image, StyleSheet, ScrollView } from "react-native";
import styled from "styled-components/native";
import axios from "axios";
import { FlexBox, HeaderText, TitleText, SmallText } from "../../common";
import Svg, { Path } from "react-native-svg";
import { TouchableOpacity } from "react-native";
import { Item } from "react-native-paper/lib/typescript/components/List/List";

const EffectScreenWrapper = styled.View`
  background-color: ${({ theme }) => theme.appBg};
  height: 100%;
  color: white;
`;

const SingleEffectHeaderWrapper = styled(FlexBox)`
  position: relative;
  width: 100%;
  height: 350px;
  padding: 13px 13px 19px 13px;
`;

const BackButton = styled.TouchableOpacity`
  width: 50px;
  height: 50px;
  background: #cfcfcf;
  border-radius: 100%;
  padding-right: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DescrWrapper = styled(FlexBox)`
  position: relative;
  width: 100%;
  height: 100%;
  background: #cfcfcf;
  padding: 20px 13px 19px 13px;
  border-top-right-radius: 12px;
  border-top-left-radius: 12px;
`;

const Img = styled.Image`
  position: absolute;
  opacity: 0.5;
  width: 100%;
  height: 400px;
  min-width: 390px;
  border-top-right-radius: 12px;
  border-top-left-radius: 12px;
`;


function SingleGameScreen(props: { route: any; navigation: any }) {
  const { route, navigation } = props;
  const params = route.params || {};
  const { code = {} } = params;

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [testData, setTestData] = useState(null);

  const [scode, setSCode] = React.useState("");

  useEffect(() => {
    axios.get(`http://localhost:3000/api/v1/games`)
      .then(({ data }) => {
        // console.log(JSON.stringify(data))
        setTestData(data)
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

//   data.filter((data) => data.code.match(/KR984/));
// const result = data.filter(data.code => data.code.length === "KR984");

    useEffect(() => {
        let newArray = data.filter(function (el) {
            return el.code === code;
        });
        setTestData(newArray)
    }, [testData])



  const list = () => {
    return data.map((game) => {
      return (
          <View
            key={game.id}
          >
          <HeaderText style={{ marginBottom: 0, marginTop: "auto" }}>
            {game.id}
          </HeaderText>
          <HeaderText style={{ marginBottom: 0, marginTop: "auto" }}>
            {game.name}
          </HeaderText>
          <HeaderText style={{ marginBottom: 0, marginTop: "auto" }}>
            {game.code}
          </HeaderText>
          </View>
      );
    });
  };


  return (
    <View>
      <ScrollView>
        <>
            {list}
            <TouchableOpacity onPress={() => console.log("It's success" + JSON.stringify(testData))}>
                <Text>Press this button></Text>
            </TouchableOpacity>
        </>
    </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 24,
  },
  shadowProp: {
    shadowColor: "#eaeaea",
    shadowOffset: { width: 5, height: -8 },
    shadowOpacity: 0.15,
    shadowRadius: 5.62,
  },
});

export default SingleGameScreen;
