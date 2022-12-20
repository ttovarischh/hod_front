import styled from 'styled-components/native';

export const Font = styled.Text`
  color: red;
  font-size: 14px;
`;

export const NoteText = styled(Font)`
  color: #5A5A5E;
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
  color: #FFFFFF;
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