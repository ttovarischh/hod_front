import React, { useState } from "react";
import useAuth from "../../contexts/newAuthContext/useAuth";
import styled from "styled-components/native";
import { FlexBox, B_Text, D_Text } from "../../common";
import A_Input from "../../components/Atoms/A_Input";
import A_Button from "../../components/Atoms/A_Button";
import { ImageBackground } from "react-native";
import { useTranslation } from "react-i18next";

const AuthScreensWrapper = styled(FlexBox)`
  background-color: ${({ theme }) => theme.appBg};
  flex: 1;
  height: 100%;
  width: 100%;
`;

const SecondaryButton = styled.TouchableOpacity`
  display: flex;
  width: 100%;
  height: 62px;
  justify-content: center;
  align-items: center;
  align-content: center;
  background: #edf2dc;
  border-radius: 20px;
  margin-bottom: 32px;
`;

export default function SignUpScreen(props: { route: any; navigation: any }) {
  const { navigation } = props;
  const { signUp } = useAuth();
  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
    password_confirmation: "",
    username: "",
  });
  const { t } = useTranslation();

  const handleType = (key: any, value: any) => {
    setNewUser((prevState) => ({
      ...prevState,
      [key]: value,
    }));
    console.log(newUser);
  };

  return (
    <AuthScreensWrapper>
      <ImageBackground
        style={{ flex: 1, width: "100%", height: "100%", position: "absolute" }}
        source={require("../../../assets/images/authbg.png")}
      >
        <FlexBox style={{ paddingLeft: 12, paddingRight: 12 }}>
          <FlexBox
            justifyContent="center"
            style={{ width: "100%" }}
            offsetTop="168"
            offsetBottom="183"
          >
            <B_Text offsetBottom={18} center>
              {t("common:register")}
            </B_Text>
            <A_Input
              value={newUser.email}
              handleChange={(text: any) => handleType("email", text)}
              placeholder={t("common:email")}
              label={t("common:email")}
            />
            <A_Input
              value={newUser.password}
              handleChange={(text: any) => handleType("password", text)}
              placeholder={t("common:password")}
              label={t("common:password")}
              secure
            />
            <A_Input
              value={newUser.password_confirmation}
              handleChange={(text: any) =>
                handleType("password_confirmation", text)
              }
              placeholder={t("common:repeatPassword")}
              label={t("common:repeatPassword")}
              secure
            />
            <A_Input
              value={newUser.username}
              handleChange={(text: any) => handleType("username", text)}
              placeholder={t("common:nick")}
              label={t("common:nick")}
            />
            <A_Button
              offsetTop={4}
              disabled={
                newUser.email == "" ||
                newUser.username == "" ||
                newUser.password.trim().length < 6 ||
                newUser.password_confirmation.trim().length < 6
              }
              handleButtonClick={() => {
                console.log("Clicked to sign UP");
                signUp(
                  newUser.email,
                  newUser.password,
                  newUser.password_confirmation,
                  newUser.username
                );
              }}
            >
              {t("common:signUp")}
            </A_Button>
          </FlexBox>
          <SecondaryButton onPress={() => navigation.navigate("Signin")}>
            <D_Text color="black" center offsetLeft={12}>
              {t("common:doLogin")}
            </D_Text>
          </SecondaryButton>
        </FlexBox>
      </ImageBackground>
    </AuthScreensWrapper>
  );
}
