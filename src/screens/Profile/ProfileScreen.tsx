import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button, ScrollView } from "react-native";
import axios from "axios";
import {
  FlexBox,
  HeaderText,
  SmallText,
  TitleText,
  NoteText,
} from "../../common";
import styled from "styled-components/native";
import Svg, { Path } from "react-native-svg";

const ProfileScreenWrapper = styled.View`
  background-color: ${({ theme }) => theme.appBg};
  height: 100%;
  color: white;
`;

const SingleEffectHeaderWrapper = styled(FlexBox)`
  position: relative;
  width: 100%;
  height: 300px;
  padding: 13px 13px 19px 13px;
  background-color: ${({ theme }) => theme.button.small};
  border-top-right-radius: 12px;
  border-top-left-radius: 12px;
`;

const ProfileAbsoluteWrapper = styled(FlexBox)`
  position: absolute;
  left: 27%;
  top: 13px;
  border-radius: 100%;
`;

const BackButton = styled.TouchableOpacity`
  width: 50px;
  height: 50px;
  background: #cfcfcf;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const UserRows = styled(FlexBox)`
  padding-bottom: 12px;
`;

const Avatar = styled.Image`
  border-radius: 100%;
  width: 44px;
  height: 44px;
  opacity: 0.9;
`;

const AvatarFlex = styled(FlexBox)`
  background-color: #f0ff00;
  border-radius: 100%;
`;

const BigAvatarWrapper = styled(FlexBox)`
  border-radius: 100%;
  background: white;
  margin-bottom: 8px;
`;

const BigAvatar = styled(Avatar)`
  border-radius: 100%;
  width: 200px;
  height: 200px;
  opacity: 1;
`;

const ModalBlur = styled(FlexBox)`
  position: absolute;
  background: rgba(31, 31, 31, 0.5);
  // opacity: 0.8;
  width: 100%;
  height: 100%;
  z-index: 100;
`;

const QrModalWrapper = styled(FlexBox)`
  position: absolute;
  padding: 19px;
  padding-top: 12px;
  background: red;
  width: 60%;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.bottomBar.bg};
`;

const CardWrapper = styled.View`
  background-color: ${({ theme }) => theme.card.bg};
  width: 100%;
  border-radius: 12px;
  padding: 16px;
  padding-bottom: 16px;
  height: 100%;
`;

const GameWrapper = styled(FlexBox)`
  border-top-right-radius: 12px;
  border-top-left-radius: 12px;
  margin-top: -4px;
  height: 100%;
`;

const PlayerWrapper = styled(FlexBox)`
  background-color: ${({ theme }) => theme.button.solid};
  border-radius: 20px;
  padding: 8px 20px 8px 20px;
  margin-right: 8px;
  margin-bottom: 8px;
`;

const UserRow = styled(FlexBox)`
  border-radius: 12px;
  padding-top: 12px;
  padding-bottom: 12px;
  width: 100%;
  flex-wrap: wrap;
  border-bottom: 2px solid white;
`;

function ProfileScreen(props: { navigation: any; route: any }) {
  const { navigation } = props;
  const [isLoading, setLoading] = useState(true);
  const [usersData, setUsersData] = useState<any[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/users")
      .then(({ data }) => {
        console.log(JSON.stringify(data));
        setUsersData(data);
      })
      .catch((error) => console.error(error))
      .finally(() => console.log(JSON.stringify(usersData)));
  }, []);

  const list = () => {
    return usersData.map((user) => {
      return (
        <UserRow style={styles.card}>
          <AvatarFlex>
            <Avatar
              source={{ uri: "http://localhost:3000/" + user.avatar.url }}
            />
          </AvatarFlex>
          <FlexBox
            direction="column"
            justifyContent="space-between"
            offsetLeft="12"
          >
            <SmallText>{user.username}</SmallText>
            <NoteText>{user.email}</NoteText>
          </FlexBox>
        </UserRow>
      );
    });
  };

  const newarray = () => {
    return usersData
      .filter((user) => user.id == 1)
      .map((filteredUser) => {
        return (
          <ProfileAbsoluteWrapper direction="column" alignItems="center">
            <BigAvatarWrapper style={styles.shadowProp}>
              <BigAvatar
                source={{
                  uri: "http://localhost:3000/" + filteredUser.avatar.url,
                }}
              />
            </BigAvatarWrapper>
            <TitleText style={{ color: "white" }}>
              {filteredUser.username}
            </TitleText>
            <SmallText>{filteredUser.email}</SmallText>
          </ProfileAbsoluteWrapper>
        );
      });
  };

  return (
    <ProfileScreenWrapper>
      <ScrollView>
        <SingleEffectHeaderWrapper direction="column">
          {newarray()}
          <BackButton>
            <Svg width="21" height="21" viewBox="0 0 21 21" fill="none">
              <Path
                d="M20.4075 8.72285L18.4984 8.55822C18.235 8.52539 18.0047 8.36076 17.9388 8.13023C17.8073 7.6694 17.6096 7.20855 17.3793 6.78057C17.2477 6.55004 17.2805 6.25385 17.4452 6.0564L18.6301 4.64109C18.8607 4.37772 18.8276 3.9828 18.5973 3.75227L17.1159 2.27106C16.8854 2.04053 16.4905 2.0077 16.2271 2.23823L14.8119 3.4561C14.6144 3.62073 14.3182 3.65356 14.0877 3.55483C13.6597 3.3243 13.1661 3.12684 12.7052 2.96244C12.4419 2.89654 12.2773 2.66624 12.2444 2.40288L12.0798 0.592389C12.047 0.263125 11.7505 0 11.4215 0H9.34778C9.01852 0 8.72232 0.263366 8.68952 0.592389L8.52489 2.40288C8.49206 2.66625 8.32743 2.89654 8.06408 2.96244C7.57043 3.12707 7.07654 3.32454 6.61572 3.55483C6.3852 3.6864 6.08901 3.65357 5.89157 3.48893L4.57505 2.36981C4.31169 2.13928 3.91679 2.17235 3.68626 2.40265L2.2379 3.8182C2.00737 4.04873 1.97454 4.44368 2.20506 4.70701L3.35724 6.05667C3.52187 6.25414 3.5547 6.55033 3.45597 6.78084C3.22545 7.24167 3.02799 7.76841 2.8636 8.26205C2.7977 8.52542 2.56741 8.69004 2.30406 8.72288L0.592369 8.85445C0.263115 8.88728 0 9.18371 0 9.51273V11.5866C0 11.9158 0.263356 12.212 0.592369 12.2448L2.33691 12.3764C2.60027 12.4092 2.83056 12.5739 2.89646 12.8044C3.06108 13.2981 3.25854 13.792 3.52192 14.2856C3.65348 14.5161 3.62065 14.8123 3.45602 15.0098L2.33694 16.3263C2.10641 16.5897 2.13948 16.9846 2.36977 17.2152L3.85093 18.6964C4.08145 18.9269 4.47639 18.9597 4.73972 18.7292L6.12219 17.577C6.31965 17.4124 6.583 17.3795 6.81354 17.5111C7.27435 17.7416 7.76799 17.9391 8.2619 18.0706C8.52526 18.1365 8.68988 18.3668 8.72272 18.6302L8.88734 20.4076C8.92017 20.7369 9.2166 21 9.5456 21H11.6194C11.9486 21 12.2448 20.7366 12.2776 20.4076L12.4092 18.5643C12.442 18.301 12.6067 18.0707 12.8372 18.0048C13.3308 17.8401 13.7916 17.6427 14.2196 17.4124C14.4502 17.2808 14.7463 17.3136 14.9438 17.4783L16.3263 18.6633C16.5896 18.8938 16.9845 18.8607 17.215 18.6304L18.6962 17.1492C18.9267 16.9187 18.9596 16.5238 18.729 16.2604L17.5112 14.812C17.3466 14.6145 17.3137 14.3512 17.4453 14.1206C17.6758 13.6926 17.8402 13.199 18.0049 12.7381C18.0708 12.4748 18.301 12.3101 18.5644 12.2773L20.4076 12.1127C20.7369 12.0798 21 11.7834 21 11.4544V9.38055C21 9.05175 20.7366 8.75554 20.4076 8.72274L20.4075 8.72285ZM5.1674 11.1916C4.77248 8.29488 6.8132 5.66169 9.70986 5.29949C12.6065 4.93739 15.2396 6.94534 15.6018 9.84209C15.964 12.7388 13.956 15.372 11.0594 15.7342C10.5985 15.8001 10.1377 15.8001 9.67688 15.7342C7.33997 15.405 5.49673 13.5614 5.16746 11.1916H5.1674Z"
                fill="black"
              />
            </Svg>
          </BackButton>
        </SingleEffectHeaderWrapper>
        <GameWrapper>
          <CardWrapper>
            <HeaderText>Пора играть</HeaderText>
            <UserRows offsetTop="4">{list()}</UserRows>
          </CardWrapper>
        </GameWrapper>
      </ScrollView>
    </ProfileScreenWrapper>
  );
}

const styles = StyleSheet.create({
  card: {
    borderBottomColor: "#383841",
    borderBottomWidth: 1,
  },
  shadowProp: {
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.25,
    shadowRadius: 15,
  },
});

export default ProfileScreen;
