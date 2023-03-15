import React, { useEffect, useState, useContext } from "react";
import { TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  FlexBox,
  NavBarText,
  HugeText,
  TitleText,
  SuperBigText,
} from "../../common";
import styled from "styled-components/native";
import { Context as AuthContext } from "../../contexts/deprecatedContext/AuthContext";
import A_Icon from "../../components/A_Icon";
import A_Loader from "../../components/A_Loader";
import axios from "axios";
import { useTranslation } from "react-i18next";
import Selector from "../../i18/LanguageSelector";
import A_Header from "../../components/A_Header";
import { StackActions } from "@react-navigation/routers";
import useAuth from "../../contexts/newAuthContext/useAuth";

const ProfileScreenWrapper = styled(FlexBox)`
  background-color: ${({ theme }) => theme.appBg};
  flex: 1;
  height: 100%;
  color: white;
  position: relative;
  padding-left: 14px;
  padding-right: 14px;
`;

const SettingsItem = styled(FlexBox)`
  margin-top: 10;
  display: flex;
  flexdirection: row;
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

export default function SettingsScreen(props: { navigation: any; route: any }) {
  const { navigation, route } = props;
  const params = route.params || {};
  const { email, userName } = params;
  const [isLoading, setLoading] = useState(false);
  const [usersData, setUsersData] = useState<UserProps>();
  // const { signout } = useContext(AuthContext);
  const [gamesData, setGamesData] = useState<any[]>([]);
  const { t } = useTranslation();

  const { user, loading, error, login, signUp, logout } = useAuth();


  type UserProps = {
    email: string;
    id: number;
    username: string;
    created_at: any;
    updated_at: any;
    jti: any;
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
            // @ts-ignore
            left={t("common:cancel")}
          ></A_Header>
          <ProfileScreenWrapper>
            <SettingsItem>
              <SettingsItemText style={{ fontFamily: "PP" }}>
                {userName}
              </SettingsItemText>
            </SettingsItem>
            <SettingsItem>
              <SettingsItemText style={{ fontFamily: "PP" }}>
                {email}
              </SettingsItemText>
            </SettingsItem>
            <SettingsItem>
              <TouchableOpacity onPress={() => logout("polinasot@gmail.com")}>
                <SettingsItemText style={{ fontFamily: "PP" }}>
                  Sign out
                </SettingsItemText>
              </TouchableOpacity>
            </SettingsItem>
            <Selector></Selector>
          </ProfileScreenWrapper>
        </>
      )}
    </>
  );
}
