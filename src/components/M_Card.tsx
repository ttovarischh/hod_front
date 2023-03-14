import React, { useContext } from "react";
import { Text, StyleSheet } from "react-native";
import styled, { ThemeContext } from "styled-components/native";
import { FlexBox, NavBarText, NavSecondaryText } from "../common";
import A_Input from "./A_Input";
import A_Icon from "./A_Icon";

type CardProps = {
  type?: string;
  handleImagePickerPress?: any;
  handleFirstInputChange?: any;
  handleSecondInputChange?: any;
  handleThirdInputChange?: any;
  handleFourthInputChange?: any;
  handleFifthInputChange?: any;
  handleSixthInputChange?: any;
  handleClear?: any;
  val1?: any;
  val2?: any;
  val3?: any;
  val4?: any;
  val5?: any;
  val6?: any;
  err1?: any;
  err2?: any;
  err3?: any;
  err4?: any;
  key?: any;
  trueVal1?: any;
  trueVal2?: any;
  trueVal3?: any;
  trueVal4?: any;
  trueVal5?: any;
  children?: React.ReactNode;
  avatar?: any;
  imagePresent?: string;
};

const PlayerWrapper = styled(FlexBox)`
  flex-direction: column;
  background-color: ${({ theme }) => theme.card.bg};
  border-radius: 20px;
  padding: 12px;
  width: 100%;
  margin-bottom: 8px;
`;

const TextAreaFlexBox = styled(FlexBox)`
  position: relative;
  background-color: ${({ theme }) => theme.input.fill};
  border-radius: 12px;
`;

const PlayerRealInputWrapper = styled.TextInput`
  width: 100%;
  height: 55px;
  background-color: ${({ theme }) => theme.input.fill};
  border-radius: 12px;
  font-size: 18;
`;

const ClearButton = styled.TouchableOpacity`
  margin-top: 6px;
  height: 27px;
  display: flex;
  justify-content: flex-end;
  align-items; center;
  width: 100%;
`;

const PlayerInputWrapper = styled(FlexBox)`
  width: 100%;
  height: 55px;
  max-height: 55px;
  padding-left: 16px;
  background-color: ${({ theme }) => theme.input.fill};
  border-radius: 12px;
  flex-direction: column;
  justify-content: center;
`;

const PlayerTextareaWrapper = styled(FlexBox)`
  width: 100%;
  padding-left: 16px;
  padding-top: 14px;
  padding-bottom: 6px;
  background-color: ${({ theme }) => theme.input.fill};
  border-radius: 12px;
  flex-direction: column;
  justify-content: center;
`;

const HeaderInputsWrapper = styled(FlexBox)`
  width: 100%;
`;

const ImagePicker = styled.TouchableOpacity`
  width: 120px;
  height: 120px;
  background-color: ${({ theme }) => theme.input.fill};
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const ImagePickerText = styled.Text`
  font-size: 11px;
  line-height: 11px;
  text-align: center;
  letter-spacing: -0.011em;
  color: #383838;
  width: 70%;
`;

const PlayerAvatarWrapper = styled(FlexBox)`
  width: 116px;
  height: 116px;
  background-color: ${({ theme }) => theme.input.fill};
  border-radius: 20px;
  display: flex;
  justify-content: center;
  overflow: hidden;
  align-items: center;
`;

const PlayerAvatar = styled.Image`
  width: 100%;
  height: 100%;
`;

const M_Card = ({
  type,
  handleFirstInputChange,
  handleSecondInputChange,
  handleThirdInputChange,
  handleFourthInputChange,
  handleFifthInputChange,
  handleSixthInputChange,
  handleClear,
  val1,
  val2,
  val3,
  val4,
  val5,
  val6,
  err1,
  err2,
  err3,
  err4,
  key,
  trueVal1,
  trueVal2,
  trueVal3,
  trueVal4,
  trueVal5,
  children,
  handleImagePickerPress,
  avatar,
  imagePresent,
  ...rest
}: CardProps) => {
  const theme = useContext(ThemeContext);
  if (type == "ch_creation") {
    return (
      <PlayerWrapper direction="column" offsetBottom="8">
        <HeaderInputsWrapper>
          <ImagePicker onPress={handleImagePickerPress}>
            {imagePresent ? (
              <PlayerAvatar
                source={{
                  uri: `${imagePresent}`,
                }}
              />
            ) : (
              <FlexBox
                direction="column"
                justifyContent="center"
                alignItems="center"
              >
                <A_Icon iconName="avatarplaceholder" />
                <ImagePickerText style={{ marginTop: 6, width: 51 }}>
                  Выбрать аватар
                </ImagePickerText>
              </FlexBox>
            )}
          </ImagePicker>
          <FlexBox offsetLeft="8" direction="column" style={{ flex: 1 }}>
            <A_Input
              placeholder="Ник игрока"
              label="Ник игрока"
              value={val6}
              handleChange={handleSixthInputChange}
            ></A_Input>
            <A_Input
              placeholder="Имя персонажа"
              label="Имя персонажа"
              handleChange={handleFirstInputChange}
              value={val1}
              isError={err1}
            ></A_Input>
          </FlexBox>
        </HeaderInputsWrapper>
        <A_Input
          placeholder="Проницательность"
          label="Проницательность"
          value={val2}
          handleChange={handleSecondInputChange}
          isError={err2}
          keyboardType="numeric"
          maxLength={2}
        ></A_Input>
        <A_Input
          placeholder="Расследование"
          label="Расследование"
          value={val3}
          handleChange={handleThirdInputChange}
          isError={err3}
          keyboardType="numeric"
          maxLength={2}
        ></A_Input>
        <A_Input
          placeholder="Восприятие"
          label="Восприятие"
          value={val4}
          handleChange={handleFourthInputChange}
          isError={err4}
          keyboardType="numeric"
          maxLength={2}
        ></A_Input>
        <TextAreaFlexBox>
          <Text
            style={{
              fontSize: 18,
              color: "#717171",
              marginLeft: 12,
              marginTop: 8,
            }}
          >
            Языки
          </Text>
          <PlayerRealInputWrapper
            placeholder="Введите через пробел..."
            value={val5}
            placeholderTextColor="#383838"
            style={{ color: "#EDF2DC", paddingLeft: 12, height: 45 }}
            onChangeText={handleFifthInputChange}
            autoCapitalize="none"
            autoComplete="off"
            autoCorrect={false}
          />
        </TextAreaFlexBox>
        <ClearButton onPress={handleClear}>
          <NavSecondaryText color="#383838" center>
            Удалить
          </NavSecondaryText>
        </ClearButton>
      </PlayerWrapper>
    );
  } else if (type == "ch_creation_show") {
    return (
      <PlayerWrapper direction="column" key={key} style={{ opacity: 0.5 }}>
        <HeaderInputsWrapper>
          <PlayerAvatarWrapper>
            <PlayerAvatar
              source={{
                uri: `${avatar}`,
              }}
            />
          </PlayerAvatarWrapper>
          <FlexBox offsetLeft="8" direction="column" style={{ flex: 1 }}>
            <PlayerInputWrapper offsetBottom="6">
              <NavBarText color="#EDF2DC">{trueVal2}</NavBarText>
              <Text style={{ color: "#383838", fontSize: 11 }}>Ник игрока</Text>
            </PlayerInputWrapper>
            <PlayerInputWrapper offsetBottom="6">
              <NavBarText color="#EDF2DC">{trueVal1}</NavBarText>
              <Text style={{ color: "#383838", fontSize: 11 }}>
                Имя персонажа
              </Text>
            </PlayerInputWrapper>
          </FlexBox>
        </HeaderInputsWrapper>
        <PlayerInputWrapper offsetBottom="6">
          <NavBarText color="#EDF2DC">{trueVal3}</NavBarText>
          <Text style={{ color: "#383838", fontSize: 11 }}>
            Проницательность
          </Text>
        </PlayerInputWrapper>
        <PlayerInputWrapper offsetBottom="6">
          <NavBarText color="#EDF2DC">{trueVal4}</NavBarText>
          <Text style={{ color: "#383838", fontSize: 11 }}>Расследование</Text>
        </PlayerInputWrapper>
        <PlayerInputWrapper offsetBottom="6">
          <NavBarText color="#EDF2DC">{trueVal5}</NavBarText>
          <Text style={{ color: "#383838", fontSize: 11 }}>Восприятие</Text>
        </PlayerInputWrapper>
        <PlayerTextareaWrapper>
          <FlexBox style={{ marginBottom: 12 }}>
            <NavBarText color="#717171">Языки</NavBarText>
          </FlexBox>
          <NavBarText>{children}</NavBarText>
        </PlayerTextareaWrapper>
      </PlayerWrapper>
    );
  } else {
    <Text style={{ color: "white" }}>aya yay yayya </Text>;
  }
  return <></>;
};

export default M_Card;

const styles = StyleSheet.create({
  brd: {
    borderBottomColor: "#282828",
    borderBottomWidth: 1,
  },
});
