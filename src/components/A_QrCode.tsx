import React from 'react';
import QRCode from 'react-native-qrcode-svg';

const A_QrCode = (props: {value: any, getRef: any}) => {
    return(
        <QRCode
        value={props.value}
        size={150}
        color="black"
        backgroundColor="white"
        getRef={props.getRef}
        />
        )
    }

export default A_QrCode