import React, { useContext } from "react";
import { Text } from "react-native";
import { ThemeContext } from "styled-components/native";
import { FlexBox } from "../common";
import styled from "styled-components/native";
import A_Input from "./A_Input";
import { NavSecondaryText } from "../common";
import { NavBarText } from "../common";

type CardProps = {
  type?: string;
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
  ...rest
}: CardProps) => {
  const theme = useContext(ThemeContext);
  if (type == "ch_creation") {
    return (
      <PlayerWrapper direction="column" offsetBottom="8">
        <A_Input
          placeholder="Имя персонажа"
          label="Имя персонажа"
          handleChange={handleFirstInputChange}
          value={val1}
          isError={err1}
        ></A_Input>
        <A_Input
          placeholder="Имя игрока"
          label="Имя игрока"
          value={val6}
          handleChange={handleSixthInputChange}
        ></A_Input>
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
      <PlayerWrapper direction="column" key={key}>
        <PlayerInputWrapper offsetBottom="6">
          <NavBarText color="#EDF2DC">{trueVal1}</NavBarText>
        </PlayerInputWrapper>
        <PlayerInputWrapper offsetBottom="6">
          <NavBarText color="#EDF2DC">{trueVal2}</NavBarText>
          <Text style={{ color: "#383838", fontSize: 11 }}>Имя игрока</Text>
        </PlayerInputWrapper>
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
