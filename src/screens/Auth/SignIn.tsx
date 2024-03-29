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

const Signin = (props: { navigation: any }) => {
  const { navigation } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const { t } = useTranslation();

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
            offsetTop="294"
            offsetBottom="183"
          >
            <B_Text offsetBottom={18} center>
              {t("common:auth")}
            </B_Text>
            <A_Input
              value={email}
              handleChange={setEmail}
              placeholder={t("common:email")}
              label={t("common:email")}
            />
            <A_Input
              value={password}
              handleChange={setPassword}
              placeholder={t("common:password")}
              label={t("common:password")}
              secure
            />
            <A_Button
              bright
              disabled={email == "" || password.trim().length < 6}
              offsetTop={4}
              handleButtonClick={() => {
                console.log("Clicked to login");
                login(email, password);
              }}
            >
              {t("common:login")}
            </A_Button>
          </FlexBox>
          <SecondaryButton onPress={() => navigation.navigate("SignUp")}>
            <D_Text color="black" center offsetLeft={12}>
              {t("common:signUp")}
            </D_Text>
          </SecondaryButton>
        </FlexBox>
      </ImageBackground>
    </AuthScreensWrapper>
  );
};

export default Signin;
