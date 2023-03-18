import React, { useEffect, useState } from "react";
import { TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { FlexBox, TitleText, LittleText } from "../../common";
import styled from "styled-components/native";
import A_Loader from "../../components/A_Loader";
import axios from "axios";
import { useTranslation } from "react-i18next";
import Selector from "../../i18/LanguageSelector";
import A_Header from "../../components/A_Header";
import { StackActions } from "@react-navigation/routers";
import useAuth from "../../contexts/newAuthContext/useAuth";
import A_Icon from "../../components/A_Icon";
import A_Selector from "../../components/A_Selector";

const ProfileScreenWrapper = styled(FlexBox)`
  background-color: ${({ theme }) => theme.appBg};
  flex: 1;
  height: 100%;
  color: white;
  position: relative;
  padding-left: 12px;
  padding-right: 12px;
`;

const SettingsItem = styled(FlexBox)`
  margin-bottom: 24;
  display: flex;
  flex-direction: row;
  height: 36px;
  border-bottom: 1px solid #1a1a1a;
  width: 100%;
`;

const SettingsItemText = styled.Text`
  font-size: 20px;
  line-height: 20px;
  color: white;
  margin-right: 24;
`;

const SettingsItemLink = styled.TouchableOpacity`
  display: flex;
  width: 100%;
  flex: 1;
  flex-wrap: no-wrap;
  margin-bottom: 24;
  flex-direction: row;
  height: 36px;
  justify-content: space-between;
`;

const SecondaryButton = styled(FlexBox)`
  width: 406px;
  height: 72px;
  justify-content: center;
  align-items: center;
  align-content: center;
  background: #1a1a1a;
  border-radius: 20px;
  margin-bottom: 32px;
`;

const SettingsTextArea = styled.TextInput`
  font-size: 20px;
  line-height: 20px;
  margin-right: 24;
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

  return (
    <>
      {isLoading ? (
        <A_Loader></A_Loader>
      ) : (
        <>
          <A_Header
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
          ></A_Header>
          <ProfileScreenWrapper>
            <ScrollView>
              <SettingsItem offsetTop="40" style={styles.buttonContainer}>
                <SettingsTextArea
                  autoCapitalize={"none"}
                  multiline={true}
                  placeholderTextColor="#404040"
                  style={{
                    color:
                      userSettings.username == initialState.username
                        ? "#404040"
                        : "white",
                    fontFamily: "PP",
                  }}
                  numberOfLines={4}
                  onChangeText={(text: any) => handleType("username", text)}
                  placeholder={usersData?.username}
                  value={
                    userSettings.username == initialState.username
                      ? ""
                      : userSettings.username
                  }
                />
              </SettingsItem>
              <SettingsItemLink
                style={[
                  styles.buttonContainer,
                  { display: "flex", width: "100%" },
                ]}
                onPress={() =>
                  navigation.push("ChangeEmail", {
                    email: usersData?.email,
                  })
                }
              >
                <SettingsItemText
                  style={{
                    fontFamily: "PP",
                    marginRight: 0,
                  }}
                >
                  {email}
                </SettingsItemText>
                <A_Icon iconName="navigate" />
              </SettingsItemLink>
              <SettingsItem style={styles.buttonContainer}>
                <SettingsTextArea
                  multiline={true}
                  placeholderTextColor="#404040"
                  style={{
                    color:
                      userSettings.about == initialState.about
                        ? "#404040"
                        : "white",
                    fontFamily: "PP",
                  }}
                  numberOfLines={4}
                  onChangeText={(text: any) => handleType("about", text)}
                  placeholder={
                    usersData?.about ? usersData?.about : t("common:about")
                  }
                  value={
                    userSettings.about == initialState.about
                      ? ""
                      : userSettings.about
                  }
                />
              </SettingsItem>
              <FlexBox style={{ width: 290 }}>
                <LittleText
                  lineHeight={19}
                  color="#404040"
                  offsetTop={38}
                  offsetBottom={16}
                >
                  {t("common:chooseInfo")}
                </LittleText>
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
              <Selector></Selector>
              <SecondaryButton>
                <TitleText color="white" center offsetLeft={12}>
                  {t("common:changePassword")}
                </TitleText>
              </SecondaryButton>
              <FlexBox
                direction="column"
                justifyContent="center"
                alignItems="center"
                style={{ width: "100%", alignContent: "center" }}
              >
                <TouchableOpacity onPress={() => logout("polinasot@gmail.com")}>
                  <SettingsItemText
                    style={{
                      fontFamily: "PP",
                      textAlign: "center",
                      width: "100%",
                      marginRight: 0,
                    }}
                  >
                    {t("common:logout")}
                  </SettingsItemText>
                </TouchableOpacity>
                <TitleText
                  color="#D64141"
                  center
                  offsetLeft={12}
                  offsetTop={22}
                  offsetBottom={118}
                >
                  {t("common:deleteAccount")}
                </TitleText>
              </FlexBox>

              <FlexBox
                direction="column"
                justifyContent="center"
                alignItems="center"
                offsetBottom="160"
                style={{ width: "100%", alignContent: "center" }}
              >
                <LittleText center color="#5F5F5F" offsetBottom={12}>
                  FAQ
                </LittleText>
                <LittleText center color="#5F5F5F">
                  {t("common:pp")}
                </LittleText>
              </FlexBox>
            </ScrollView>
          </ProfileScreenWrapper>
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    height: 36,
    borderBottomWidth: 1,
    borderBottomColor: "#1A1A1A",
    width: "100%",
  },
});
