import React from "react";
import styled from "styled-components/native";
import { Text } from "react-native";

const MyText = ({ children }: TextProps) => {
  return (
    <Text style={{ fontFamily: "PP", fontSize: 30, color: "white" }}>
      {children}
    </Text>
  );
};

// export default MyText;

export const NavText = ({ children }: TextProps) => {
  return (
    <Text style={{ fontFamily: "PP", fontSize: 24, color: "white", lineHeight: 24 }}>
      {children}
    </Text>
  );
};

export const NavSecondaryText = ({ children }: TextProps) => {
  return (
    <Text style={{ fontFamily: "PP", fontSize: 16, color: "#383838", lineHeight: 19 }}>
      {children}
    </Text>
  );
};

export const LittleText = ({ children }: TextProps) => {
  return (
    <Text style={{ fontFamily: "PP", fontSize: 18, color: "#EDF2DC", lineHeight: 27 }}>
      {children}
    </Text>
  );
};

export const Breadcrumb = ({ children }: TextProps) => {
  return (
    <Text style={{ fontFamily: "PP", fontSize: 16, color: "#5D5D5D", lineHeight: 24 }}>
      {children}
    </Text>
  );
};

export const BigText = ({ children }: TextProps) => {
  return (
    <Text style={{ fontFamily: "PP", fontSize: 48, color: "#EDF2DC", lineHeight: 48, paddingTop: 8 }}>
      {children}
    </Text>
  );
};

// export default NavText;

export const NewNewText = styled(MyText)`
  color: red;
  font-size: 30px;
`;

// export const NavText = styled(MyText)`
//   font-size: 20px;
//   line-height: 24px;
//   text-align: center;
//   color: #ffffff;
// `;

export const Font = styled.Text`
  color: red;
  font-size: 14px;
`;

export const NoteText = styled(Font)`
  color: #5a5a5e;
  font-size: 14px;
  font-weight: 400;
  // font-family: "Inter_400Regular";
`;

export const SmallText = styled(Font)`
  color: white;
  font-size: 16px;
  font-weight: 400;
  // font-family: "Inter_400Regular";
`;

export const HeaderText = styled(Font)`
  color: white;
  font-size: 28px;
  line-height: 33px;
  letter-spacing: 0.36px;
  font-weight: 700;
  // font-family: "Inter_700Bold";
`;

export const ButtonText = styled(Font)`
  color: #ffffff;
  font-size: 20px;
  line-height: 20px;
  letter-spacing: 0.36px;
  font-weight: 500;
  // font-family: "Inter_500Medium";
  text-align: center;
`;

export const TitleText = styled(Font)`
  color: #989899;
  font-size: 20px;
  line-height: 33px;
  letter-spacing: 0.36px;
  font-weight: 500;
  // font-family: "Inter_500Medium";
  text-transform: uppercase;
`;

export const TestText = styled(Font)`
  font-style: normal;
  font-weight: 500;
  font-size: 28px;
  line-height: 34px;
  text-align: center;
  color: #ffffff;
`;

export const FigureText = styled(Font)`
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  color: #ffffff;
`;

export const NavBarText = styled(Font)`
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  color: #ffffff;
`;

export const ProfileText = styled(MyText)`
  font-style: normal;
  font-weight: 500;
  font-size: 36px;
  line-height: 43px;
  color: red;
`;

interface TextProps {
  children: React.ReactNode;
}


