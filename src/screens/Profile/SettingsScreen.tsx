import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { FlexBox, F_Text, D_Text, E_Text } from "../../common";
import styled from "styled-components/native";
import A_Loader from "../../components/Atoms/A_Loader";
import axios from "axios";
import { useTranslation } from "react-i18next";
import Selector from "../../i18/LanguageSelector";
import O_Header from "../../components/Organisms/O_Header";
import { StackActions } from "@react-navigation/routers";
import useAuth from "../../contexts/newAuthContext/useAuth";
import A_Selector from "../../components/Atoms/A_Selector";
import A_SettingsItem from "../../components/Atoms/A_SettingsItem";
import A_Button from "../../components/Atoms/A_Button";

const ProfileScreenWrapper = styled(FlexBox)`
  background-color: ${({ theme }) => theme.appBg};
  flex: 1;
  height: 100%;
  color: white;
  position: relative;
  padding-left: 12px;
  padding-right: 12px;
`;

export default function SettingsScreen(props: { navigation: any; route: any }) {
  const { navigation, route } = props;
  const params = route.params || {};
  const { email } = params;
  const [isLoading, setLoading] = useState(true);
  const [usersData, setUsersData] = useState<UserProps>();
  const { t } = useTranslation();
  const { user } = useAuth();
  const { logout } = useAuth();
  const [initialState, setInitialState] = useState({
    sex: "",
    showed: "",
    about: "",
    username: "",
  });
  const [userSettings, setUserSettings] = useState({
    sex: "",
    showed: "",
    about: "",
    username: "",
  });

  const SEXES = [
    { code: "male", label: t("common:male") },
    { code: "female", label: t("common:female") },
  ];

  const SHOWS = [
    { code: "hours", label: t("common:hours") },
    { code: "count", label: t("common:count") },
  ];

  type UserProps = {
    email: string;
    id: number;
    username: string;
    created_at: any;
    updated_at: any;
    jti: any;
    sex?: any;
    about?: any;
    show?: any;
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/users/" + user?.id)
      .then(({ data }) => {
        setUsersData(data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {});
  }, []);

  useEffect(() => {
    setInitialState({
      sex: usersData?.sex,
      showed: usersData?.show,
      about: usersData?.about,
      // @ts-ignore
      username: usersData?.username,
    });
    setUserSettings({
      sex: usersData?.sex,
      showed: usersData?.show,
      about: usersData?.about,
      // @ts-ignore
      username: usersData?.username,
    });
    console.log(userSettings);
    setLoading(false);
  }, [usersData]);

  const patchUserUpdate = () => {
    if (
      userSettings.sex !== initialState.sex ||
      userSettings.showed !== initialState.showed ||
      userSettings.about !== initialState.about ||
      userSettings.username !== initialState.username
    ) {
      axios
        .patch("http://localhost:3000/api/v1/users/" + user?.id, {
          user: {
            sex: userSettings.sex,
            show: userSettings.showed,
            about: userSettings.about,
            username: userSettings.username,
          },
        })
        .then(function (response) {
          console.log("Done post");
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(() => {
          navigation.navigate("Profile");
        });
    }
  };

  const handleType = (key: any, value: any) => {
    setUserSettings((prevState) => ({
      ...prevState,
      [key]: value,
    }));
    console.log(userSettings);
  };

  if (isLoading) {
    return <A_Loader />;
  }

  return (
    <>
      <O_Header
        center={t("common:settings")}
        handleLeftPress={() => navigation.dispatch(StackActions.popToTop())}
        left={
          userSettings.sex !== initialState.sex ||
          userSettings.showed !== initialState.showed ||
          userSettings.about !== initialState.about ||
          userSettings.username !== initialState.username
            ? t("common:cancel")
            : t("common:done")
        }
        right={
          userSettings.sex !== initialState.sex ||
          userSettings.showed !== initialState.showed ||
          userSettings.about !== initialState.about ||
          userSettings.username !== initialState.username
            ? t("common:done")
            : ""
        }
        handleRightPress={patchUserUpdate}
      ></O_Header>
      <ProfileScreenWrapper>
        <ScrollView>
          <A_SettingsItem
            onPress={(text: any) => handleType("username", text)}
            type="UsernameInput"
            colorCondition={userSettings.username == initialState.username}
            valueCondition={
              userSettings.username == initialState.username
                ? ""
                : userSettings.username
            }
            placeholder={usersData?.username}
          />
          <A_SettingsItem
            type="Link"
            placeholder={email}
            onPress={() =>
              navigation.push("ChangeEmail", {
                email: usersData?.email,
              })
            }
          />
          <A_SettingsItem
            onPress={(text: any) => handleType("about", text)}
            type="AboutInput"
            colorCondition={userSettings.about == initialState.about}
            valueCondition={
              userSettings.about == initialState.about ? "" : userSettings.about
            }
            placeholder={
              usersData?.about ? usersData?.about : t("common:about")
            }
          />
          <FlexBox style={{ width: 290 }}>
            <F_Text
              lineHeight={19}
              color="#404040"
              offsetTop={38}
              offsetBottom={16}
            >
              {t("common:chooseInfo")}
            </F_Text>
          </FlexBox>
          <FlexBox offsetBottom="24">
            <A_Selector
              arraymap={SHOWS}
              selectedCondition={userSettings.showed}
              setState={setUserSettings}
              toSet={"showed"}
            />
          </FlexBox>
          <FlexBox offsetBottom="24">
            <A_Selector
              arraymap={SEXES}
              selectedCondition={userSettings.sex}
              setState={setUserSettings}
              toSet={"sex"}
            />
          </FlexBox>
          <Selector />
          <A_Button bright handleButtonClick={() => console.log("Prank")}>
            {t("common:changePassword")}
          </A_Button>
          <A_Button
            offsetBottom={32}
            handleButtonClick={() => logout("polinasot@gmail.com")}
          >
            {t("common:logout")}
          </A_Button>
          <FlexBox
            direction="column"
            justifyContent="center"
            alignItems="center"
            style={{ width: "100%", alignContent: "center" }}
          >
            <D_Text
              color="#D64141"
              center
              offsetLeft={12}
              offsetTop={22}
              offsetBottom={118}
            >
              {t("common:deleteAccount")}
            </D_Text>
          </FlexBox>
          <FlexBox
            direction="column"
            justifyContent="center"
            alignItems="center"
            offsetBottom="160"
            style={{ width: "100%", alignContent: "center" }}
          >
            <E_Text center color="#5F5F5F" offsetBottom={12}>
              FAQ
            </E_Text>
            <E_Text center color="#5F5F5F">
              {t("common:pp")}
            </E_Text>
          </FlexBox>
        </ScrollView>
      </ProfileScreenWrapper>
    </>
  );
}
