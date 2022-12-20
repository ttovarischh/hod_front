import React, {FC} from 'react';
import Svg, { Path } from 'react-native-svg';

type PropsT = {
  fill?: string;
};

const ProfileIcon: FC<PropsT> = ({ fill = 'currentColor' }) => (
  <Svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <Path d="M10.9999 10.9999C13.9466 10.9999 16.3333 8.61325 16.3333 5.66659C16.3333 2.71992 13.9466 0.333252 10.9999 0.333252C8.05325 0.333252 5.66659 2.71992 5.66659 5.66659C5.66659 8.61325 8.05325 10.9999 10.9999 10.9999ZM10.9999 13.6666C7.43992 13.6666 0.333252 15.4533 0.333252 18.9999V21.6666H21.6666V18.9999C21.6666 15.4533 14.5599 13.6666 10.9999 13.6666Z" fill={fill}/>
  </Svg>
);

export default ProfileIcon;