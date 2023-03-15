import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { StyleSheet, Text, View, ScrollView, FlatList } from "react-native";
import { FlexBox } from "../../common";
import styled from "styled-components/native";
import axios from "axios";
import A_Loader from "../../components/A_Loader";
import A_Button from "../../components/A_Button";
import A_Header from "../../components/A_Header";
import M_Card from "../../components/M_Card";
import O_BottomSheet from "../../components/O_BottomSheet";
import { StackActions } from "@react-navigation/native";
import { apiUrl } from "../const";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

const HomeScreenWrapper = styled.View`
  background-color: ${({ theme }) => theme.appBg};
  height: 100%;
  min-height: 100%;
  color: white;
  padding-left: 12px;
  padding-right: 12px;
`;

const PlayerAvatar = styled.Image`
  width: 129px;
  height: 129px;
`;

const PlayerAvatarWrapper = styled.TouchableOpacity`
  background: #0e0e0e;
  width: 129px;
  height: 129px;
  border-radius: 20px;
  overflow: hidden;
  margin-bottom: 8px;
`;

export default function CreateGameScreen(props: {
  route: any;
  navigation: any;
}) {
  // constants_and_states
  const { route, navigation } = props;
  const params = route.params || {};
  const scrollViewRef = useRef<ScrollView>(null);
  const [empty, setEmpty] = useState(false);
  const dateTime = new Date().toJSON();
  const [code, setCode] = useState("QE731");
  const [gameData, setGameData] = useState<any[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [initialState, setInitialState] = useState({
    playerName: "",
    lang: "",
    ins: "",
    perc: "",
    inv: "",
    username: "",
    imagestring: "",
  });
  const [player, setPlayer] = useState({
    playerName: "",
    lang: "",
    ins: "",
    perc: "",
    inv: "",
    username: "",
    imagestring: "",
  });

  const Item = ({ imageString }: any) => (
    <PlayerAvatarWrapper
      onPress={() => {
        setPlayer((prevState) => ({
          ...prevState,
          imagestring: imageString,
        }));
        console.log(player);
        handleCloseModalPress();
      }}
    >
      <PlayerAvatar
        source={{
          uri: `${imageString}`,
        }}
      />
    </PlayerAvatarWrapper>
  );

  const DATA = [
    {
      id: "1",
      imageString: "https://ttovarischh.github.io/WikiMEDIUMM/images/img.png",
    },
    {
      id: "2",
      imageString: "https://ttovarischh.github.io/WikiMEDIUMM/images/1hod.png",
    },
    {
      id: "3",
      imageString: "https://ttovarischh.github.io/WikiMEDIUMM/images/2hod.png",
    },
    {
      id: "4",
      imageString: "https://ttovarischh.github.io/WikiMEDIUMM/images/3hod.png",
    },
    {
      id: "5",
      imageString: "https://ttovarischh.github.io/WikiMEDIUMM/images/4hod.png",
    },
    {
      id: "6",
      imageString: "https://ttovarischh.github.io/WikiMEDIUMM/images/img.png",
    },
    {
      id: "7",
      imageString: "https://ttovarischh.github.io/WikiMEDIUMM/images/1hod.png",
    },
    {
      id: "8",
      imageString: "https://ttovarischh.github.io/WikiMEDIUMM/images/2hod.png",
    },
    {
      id: "9",
      imageString: "https://ttovarischh.github.io/WikiMEDIUMM/images/3hod.png",
    },
    {
      id: "10",
      imageString: "https://ttovarischh.github.io/WikiMEDIUMM/images/4hod.png",
    },
    {
      id: "11",
      imageString: "https://ttovarischh.github.io/WikiMEDIUMM/images/3hod.png",
    },
    {
      id: "12",
      imageString: "https://ttovarischh.github.io/WikiMEDIUMM/images/4hod.png",
    },
  ];

  const createdPlayersList = () => {
    return gameData.map((player: any) => {
      let langs = player.language.split(" ");
      return (
        <>
          <M_Card
            type="ch_creation_show"
            key={player.id}
            trueVal1={player.name}
            trueVal2={player.username}
            trueVal3={player.ins}
            trueVal4={player.inv}
            trueVal5={player.perc}
            avatar={player.imagestring}
          >
            {langs.map((sublang: any) => (
              <FlexBox offsetRight="8" offsetBottom="8">
                <View style={styles.container}>
                  <Text style={{ fontSize: 18, color: "#EDF2DC" }}>
                    {sublang}
                  </Text>
                </View>
              </FlexBox>
            ))}
          </M_Card>
        </>
      );
    });
  };

  // bottomsheet_related
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["25.1%", "92%"], []);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleCloseModalPress = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);

  // axios.interceptors.request.use((x) => {
  //   console.log(x);
  //   return x;
  // });

  // main_functions
  useEffect(() => {
    console.log("Game's ready");
    axios
      .post(apiUrl + "/games", {
        game: {
          name: dateTime,
        },
      })
      .then(function (response) {
        console.log(response.data.code);
        setCode(response.data.code);
        console.log(code);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(() => setLoading(false));
  }, []);

  // for test
  // useEffect(() => {
  //   console.log("ready");
  //   axios
  //     .get("http://localhost:3000/api/v1/games/" + code + "/players")
  //     .then(({ data }) => {
  //       setGameData(data);
  //     })
  //     .catch((error) => console.error(error))
  //     .finally(() => {
  //       console.log("Done get");
  //       console.log(gameData);
  //     });
  // }, []);

  const handleType = (key: any, value: any) => {
    console.log(player);
    setEmpty(false);
    setPlayer((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleClear = (key: any, value: any) => {
    setPlayer(initialState);
  };

  function handleGetPlayers() {
    axios
      .get("http://localhost:3000/api/v1/games/" + code + "/players")
      .then(({ data }) => {
        setGameData(data);
      })
      .catch((error) => console.error(error))
      .finally(() => {
        console.log("Done get");
        console.log(gameData);
      });
  }

  const handlePostPlayerClick = () => {
    if ((player.ins || player.inv || player.perc || player.playerName) == "") {
      setEmpty(true);
      console.log("smth is wrong");
    } else {
      axios
        .post("http://localhost:3000/api/v1/games/" + code + "/players", {
          player: {
            name: player.playerName,
            language: player.lang,
            inv: player.inv,
            ins: player.ins,
            perc: player.perc,
            username: player.username,
            imagestring: player.imagestring,
          },
        })
        .then(function (response) {
          console.log("Done post");
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(() => {
          handleGetPlayers();
          setPlayer(initialState);
        });
    }
  };

  return (
    <>
      {isLoading ? (
        <A_Loader></A_Loader>
      ) : (
        <>
          <A_Header
            left="Отмена"
            center="Создание игроков"
            handleLeftPress={() => navigation.dispatch(StackActions.popToTop())}
          />
          <ScrollView
            style={{ flex: 1 }}
            bounces={false}
            ref={scrollViewRef}
            onContentSizeChange={() =>
              scrollViewRef.current?.scrollToEnd({ animated: true })
            }
          >
            <HomeScreenWrapper>
              <>
                <FlexBox direction="column">{createdPlayersList()}</FlexBox>
                <M_Card
                  type="ch_creation"
                  handleImagePickerPress={handlePresentModalPress}
                  handleFirstInputChange={(text: any) =>
                    handleType("playerName", text)
                  }
                  handleSecondInputChange={(text: any) =>
                    handleType("ins", text)
                  }
                  handleThirdInputChange={(text: any) =>
                    handleType("inv", text)
                  }
                  handleFourthInputChange={(text: any) =>
                    handleType("perc", text)
                  }
                  handleFifthInputChange={(text: any) =>
                    handleType("lang", text)
                  }
                  handleSixthInputChange={(text: any) =>
                    handleType("username", text)
                  }
                  handleClear={handleClear}
                  val1={player.playerName}
                  val2={player.ins}
                  val3={player.inv}
                  val4={player.perc}
                  val5={player.lang}
                  val6={player.username}
                  err1={empty && player.playerName == ""}
                  err2={empty && player.ins == ""}
                  err3={empty && player.inv == ""}
                  err4={empty && player.perc == ""}
                  imagePresent={player.imagestring}
                ></M_Card>
                <A_Button
                  handleButtonClick={handlePostPlayerClick}
                  offsetBottom={8}
                >
                  Сохранить игрока
                </A_Button>
                <A_Button
                  bright
                  offsetBottom={107}
                  handleButtonClick={() =>
                    navigation.push("SGame", { code: code })
                  }
                >
                  Начать игру
                </A_Button>
              </>
            </HomeScreenWrapper>
          </ScrollView>
          <O_BottomSheet
            mainHeader="Выбери аватарку персонажа"
            ref={bottomSheetModalRef}
            index={1}
            snapPoints={snapPoints}
            handleButtonClick={handleCloseModalPress}
          >
            <FlatList
              style={{ width: "100%" }}
              columnWrapperStyle={styles.tagView}
              data={DATA}
              numColumns={3}
              renderItem={({ item }) => <Item imageString={item.imageString} />}
              keyExtractor={(item) => item.id}
            />
          </O_BottomSheet>
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignSelf: "flex-start",
    backgroundColor: "#383838",
    padding: 8,
    paddingLeft: 12,
    paddingRight: 12,
    borderRadius: 10,
    alignItems: "baseline",
  },
  tagView: {
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});
