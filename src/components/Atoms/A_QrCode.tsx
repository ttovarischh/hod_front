import React, { useContext } from "react";
import { ThemeContext } from "styled-components/native";
import QRCode from "react-native-qrcode-svg";

const A_QrCode = (props: { value: any; getRef: any }) => {
  const theme = useContext(ThemeContext);
  return (
    <QRCode
      value={props.value}
      size={280}
      color="white"
      backgroundColor="#1C1C1E"
      getRef={props.getRef}
    />
  );
};

export default A_QrCode;
