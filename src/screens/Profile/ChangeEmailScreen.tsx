import React, { useState } from "react";
import { FlexBox, E_Text } from "../../common";
import styled from "styled-components/native";
import axios from "axios";
import { useTranslation } from "react-i18next";
import O_Header from "../../components/Organisms/O_Header";
import useAuth from "../../contexts/newAuthContext/useAuth";
import A_Input from "../../components/Atoms/A_Input";

const ProfileScreenWrapper = styled(FlexBox)`
  background-color: ${({ theme }) => theme.appBg};
  flex: 1;
  height: 100%;
  color: white;
  position: relative;
  padding-left: 12px;
  padding-right: 12px;
  justify-content: center;
`;

export default function ChangeEmailScreen(props: {
  navigation: any;
  route: any;
}) {
  const { navigation, route } = props;
  const params = route.params || {};
  const { email } = params;
  const { t } = useTranslation();
  const { user } = useAuth();
  const [newEmail, setNewEmail] = useState("");

  const patchUserUpdate = () => {
    if (
      newEmail !== email &&
      // @ts-ignore
      newEmail !== ""
    ) {
      axios
        .patch("http://localhost:3000/api/v1/users/" + user?.id, {
          user: {
            email: newEmail,
          },
        })
        .then(function (response) {
          console.log("Done post");
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(() => {
          navigation.navigate("Settings");
        });
    }
  };

  return (
    <>
      <O_Header
        center="Изменить почту"
        handleLeftPress={() => navigation.navigate("Settings")}
        left={t("common:cancel")}
        right={newEmail !== email && newEmail !== "" ? t("common:done") : ""}
        handleRightPress={patchUserUpdate}
      ></O_Header>
      <ProfileScreenWrapper>
        <FlexBox style={{ width: 285 }} offsetBottom="16" offsetTop="50">
          <E_Text center>
            Введи адрес новой электронной почты, чтобы получить письмо
            с подтверждением
          </E_Text>
        </FlexBox>
        <A_Input
          value={newEmail}
          handleChange={(text: any) => setNewEmail(text)}
          placeholder={"New email"}
          label={newEmail !== email ? "Электронная почта" : email}
        />
      </ProfileScreenWrapper>
    </>
  );
}
