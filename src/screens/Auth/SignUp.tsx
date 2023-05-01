import React, { useState, useRef, useMemo, useCallback } from "react";
import useAuth from "../../contexts/newAuthContext/useAuth";
import styled from "styled-components/native";
import { FlexBox, B_Text, D_Text, E_Text } from "../../common";
import A_Input from "../../components/Atoms/A_Input";
import A_Button from "../../components/Atoms/A_Button";
import { ImageBackground } from "react-native";
import { useTranslation } from "react-i18next";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import O_BottomSheet from "../../components/Organisms/O_BottomSheet";

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
  margin-bottom: 85px;
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
  const [step, setStep] = useState(1);

  const handleType = (key: any, value: any) => {
    setNewUser((prevState) => ({
      ...prevState,
      [key]: value,
    }));
    console.log(newUser);
  };

  const handleNext = () => {
    if (step == 1) {
      setStep(2);
    } else if (step == 2) {
      setStep(3);
    }
  };

  const bottomSheetModalRef2 = useRef<BottomSheetModal>(null);
  const snapPoints2 = useMemo(() => ["23%", "93%"], []);
  const handlePresentModalPress2 = useCallback(() => {
    bottomSheetModalRef2.current?.present();
  }, []);

  return (
    <AuthScreensWrapper>
      <ImageBackground
        style={{ flex: 1, width: "100%", height: "100%", position: "absolute" }}
        source={require("../../../assets/images/authbg.png")}
      >
        <FlexBox
          style={{
            paddingLeft: 12,
            paddingRight: 12,
            height: "100%",
            alignContent: "space-between",
          }}
        >
          <FlexBox
            justifyContent="center"
            style={{ width: "100%" }}
            offsetTop="294"
          >
            <B_Text offsetBottom={18} center>
              {t("common:register")}
            </B_Text>
            {step == 1 && (
              <A_Input
                value={newUser.email}
                handleChange={(text: any) => handleType("email", text)}
                placeholder={t("common:email")}
                label={t("common:email")}
              />
            )}
            {step == 2 && (
              <A_Input
                value={newUser.username}
                handleChange={(text: any) => handleType("username", text)}
                placeholder={t("common:nick")}
                label={t("common:nick")}
              />
            )}
            {step == 3 && (
              <>
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
              </>
            )}
            {step == 1 && (
              <A_Button
                offsetTop={4}
                bright
                disabled={newUser.email == ""}
                handleButtonClick={handleNext}
              >
                {t("common:continue")}
              </A_Button>
            )}
            {step == 2 && (
              <A_Button
                offsetTop={4}
                bright
                disabled={newUser.username == ""}
                handleButtonClick={handleNext}
              >
                {t("common:continue")}
              </A_Button>
            )}
            {step == 3 && (
              <>
                <A_Button
                  offsetTop={4}
                  bright
                  disabled={
                    newUser.email == "" ||
                    newUser.username == "" ||
                    newUser.password.trim().length < 6 ||
                    newUser.password_confirmation.trim().length < 6 ||
                    newUser.password !== newUser.password_confirmation
                  }
                  handleButtonClick={async () => {
                    console.log("Clicked to sign UP");
                    await signUp(
                      newUser.email,
                      newUser.password,
                      newUser.password_confirmation,
                      newUser.username
                    );
                    handlePresentModalPress2();
                  }}
                >
                  {t("common:signUp")}
                </A_Button>
                <FlexBox
                  style={{
                    width: "75%",
                    justifyContent: "center",
                  }}
                >
                  <E_Text center>{t("common:repeat")}</E_Text>
                </FlexBox>
              </>
            )}
          </FlexBox>
          <SecondaryButton onPress={() => navigation.navigate("Signin")}>
            <D_Text color="black" center offsetLeft={12}>
              {t("common:doLogin")}
            </D_Text>
          </SecondaryButton>
        </FlexBox>
      </ImageBackground>
      <O_BottomSheet
        mainHeader={t("common:regDone")}
        subHeader={t("common:canAuth")}
        ref={bottomSheetModalRef2}
        index={1}
        snapPoints={snapPoints2}
        handleButtonClick={() => navigation.navigate("Signin")}
        twoButtons={true}
        oneButton={true}
        a={t("common:login")}
      />
    </AuthScreensWrapper>
  );
}
