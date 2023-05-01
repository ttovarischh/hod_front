import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { ScrollView } from "react-native";
import styled from "styled-components/native";
import axios from "axios";
import { FlexBox } from "../../common";
import Error from "../Errors/Error";
import { StackActions } from "@react-navigation/native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import A_Loader from "../../components/Atoms/A_Loader";
import O_Header from "../../components/Organisms/O_Header";
import O_Card from "../../components/Organisms/O_Card";
import O_BottomSheet from "../../components/Organisms/O_BottomSheet";
import M_Card from "../../components/Molecules/M_Card";
import A_Button from "../../components/Atoms/A_Button";
import { useTranslation } from "react-i18next";

const SingleGameWrapper = styled.View`
  background-color: ${({ theme }) => theme.appBg};
  height: 100%;
  color: white;
`;

export default function CreateMonstersScreen(props: {
  route: any;
  navigation: any;
}) {
  // constants_and_states
  const { route, navigation } = props;
  const params = route.params || {};
  const { code = {} } = params;
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = React.useState<any>([]);
  const [empty, setEmpty] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const { t } = useTranslation();
  const [initialState, setInitialState] = useState({
    name: "",
    initiative: "",
    hp: "",
    armor: "",
  });
  const [player, setPlayer] = useState({
    name: "",
    initiative: "",
    hp: "",
    armor: "",
  });

  const handleType = (key: any, value: any) => {
    console.log(player);
    setEmpty(false);
    setPlayer((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const monsterList = () => {
    return data.monsters?.map((player: any, i: any) => {
      return (
        <O_Card
          type="ExpandedMonster"
          name={player.name}
          player_id={player.id}
          arm={player.armor}
          hp={player.hp}
          initiativeVal={player.initiative}
          key={player.id}
        ></O_Card>
      );
    });
  };

  // bottomsheet_related
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["23%", "92%"], []);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleCloseModalPress = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);

  // main_functions
  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/v1/games/${code}`)
      .then(({ data }) => {
        if (data != null) {
          setData(data);
        }
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const getUpdatedInfo = () => {
    axios
      .get(`http://localhost:3000/api/v1/games/${code}`)
      .then(({ data }) => {
        if (data != null) {
          setData(data);
        }
      })
      .catch((error) => console.error(error))
      .finally(() => {
        console.log("Updated");
      });
  };

  const handlePostPlayerClick = () => {
    if ((player.name || player.hp || player.armor || player.initiative) == "") {
      setEmpty(true);
      console.log("smth is wrong");
    } else {
      axios
        .post("http://localhost:3000/api/v1/games/" + code + "/monsters", {
          monster: {
            name: player.name,
            hp: player.hp,
            armor: player.armor,
            initiative: player.initiative,
          },
        })
        .then(function (response) {
          console.log("Done post");
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(() => {
          getUpdatedInfo();
          setPlayer(initialState);
        });
    }
  };

  if (isLoading) {
    return <A_Loader />;
  }

  if (!data.id) {
    return (
      <Error
        errorid="404"
        handleButtonClick={() => navigation.dispatch(StackActions.popToTop())}
      ></Error>
    );
  }

  return (
    <>
      <O_Header
        left={t("common:back")}
        center={t("common:addNpc")}
        handleLeftPress={handlePresentModalPress}
        turn={data.fight ? `${data.turn} ${t("common:round")}` : ""}
      />
      <SingleGameWrapper>
        <ScrollView
          ref={scrollViewRef}
          onContentSizeChange={() =>
            scrollViewRef.current?.scrollToEnd({ animated: true })
          }
        >
          {monsterList()}
          <M_Card
            type="NpcCreation"
            npcName={player.name}
            npcArmor={player.armor}
            npcHealth={player.hp}
            npcInitiative={player.initiative}
            handleNpcNameChange={(text: any) => handleType("name", text)}
            handleNpcArmorChange={(text: any) => handleType("armor", text)}
            handleNpcHealthChange={(text: any) => handleType("hp", text)}
            handleNpcInitiativeChange={(text: any) =>
              handleType("initiative", text)
            }
          />
          <A_Button handleButtonClick={handlePostPlayerClick} offsetBottom={8}>
            {t("common:saveNpc")}
          </A_Button>
          <A_Button
            bright
            offsetBottom={107}
            handleButtonClick={() => navigation.push("SGame", { code: code })}
          >
            {t("common:continueGame")}
          </A_Button>
          <FlexBox style={{ height: 200 }}></FlexBox>
        </ScrollView>
        <O_BottomSheet
          mainHeader={t("common:uSure")}
          subHeader={t("common:unsavedGame")}
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          handleButtonClick={handleCloseModalPress}
          twoButtons={true}
        />
      </SingleGameWrapper>
    </>
  );
}
