import React, {FC} from 'react';
import Svg, { Path } from 'react-native-svg';

type PropsT = {
  fill?: string;
};

const HomeIcon: FC<PropsT> = ({ fill = 'currentColor' }) => (
  <Svg width="28" height="23" viewBox="0 0 28 23" fill="none">
    <Path d="M11.3334 22.6667V14.6667H16.6667V22.6667H23.3334V12H27.3334L14.0001 0L0.666748 12H4.66675V22.6667H11.3334Z" fill={fill}/>
  </Svg>
);

export default HomeIcon;