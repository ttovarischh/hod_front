import React from 'react';
import QRCode from 'react-native-qrcode-svg';

const A_QrCode = (props: {value: any, getRef: any}) => {
    return(
        <QRCode
        value={props.value}
        size={280}
        color="white"
        backgroundColor="#1C1C1E"
        getRef={props.getRef}
        />
        )
    }

export default A_QrCode