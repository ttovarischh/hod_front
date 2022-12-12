import React, {FC} from 'react';
import Svg, { Path } from 'react-native-svg';

type PropsT = {
  fill?: string;
};

const EffectsTabIcon: FC<PropsT> = ({ fill = 'currentColor' }) => (
    <Svg width="22" height="23" viewBox="0 0 22 23" fill="none">
        <Path d="M7.43461 11.0884L10.7014 10.1689C11.2579 10.0237 11.2579 9.22519 10.7014 9.05572L7.43461 8.13634C7.24101 8.0879 7.09585 7.94274 7.04741 7.74914L6.1037 4.48256C5.95855 3.92606 5.16 3.92606 4.99053 4.48256L4.07098 7.74931C4.02254 7.94292 3.87738 8.08807 3.68378 8.13651L0.417375 9.05589C-0.139125 9.20105 -0.139125 9.99959 0.417375 10.1691L3.68413 11.0886C3.87773 11.1371 4.02289 11.2822 4.07133 11.4758L5.01486 14.7665C5.16002 15.323 5.95856 15.323 6.12803 14.7665L7.04758 11.4998C7.09586 11.3061 7.24102 11.1369 7.43461 11.0884L7.43461 11.0884Z" fill={fill}/>
        <Path d="M17.5975 16.8959L14.3307 15.9764C14.1371 15.9279 13.992 15.7828 13.9435 15.5892L13.024 12.3224C12.8788 11.7659 12.0803 11.7659 11.9108 12.3224L10.9913 15.5892C10.9428 15.7828 10.7976 15.9279 10.6041 15.9764L7.3373 16.8959C6.7808 17.0411 6.7808 17.8396 7.3373 18.0091L10.6041 18.9286C10.7977 18.9771 10.9428 19.1222 10.9913 19.3158L11.9108 22.5826C12.056 23.1391 12.8545 23.1391 13.024 22.5826L13.9435 19.3158C13.992 19.1222 14.1371 18.9771 14.3307 18.9286L17.5975 17.9848C18.1542 17.8396 18.1542 17.041 17.5975 16.8959V16.8959Z" fill={fill}/>
        <Path d="M20.7433 5.01499L17.4765 4.09544C17.2829 4.047 17.1378 3.90184 17.0893 3.70824L16.1458 0.417375C16.0006 -0.139125 15.2021 -0.139125 15.0326 0.417375L14.1131 3.68413C14.0646 3.87773 13.9195 4.02289 13.7259 4.07133L10.4591 4.99088C9.90262 5.13604 9.90262 5.93458 10.4591 6.10405L13.726 7.02325C13.9196 7.0717 14.0648 7.21686 14.1132 7.41045L15.0328 10.6772C15.1779 11.2337 15.9765 11.2337 16.1459 10.6772L17.0655 7.41045C17.1139 7.21685 17.2591 7.0717 17.4527 7.02325L20.7432 6.10388C21.2997 5.95872 21.2997 5.16017 20.7432 5.01503L20.7433 5.01499Z" fill={fill}/>
    </Svg>
);

export default EffectsTabIcon;