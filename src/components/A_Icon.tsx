import React, { useContext } from "react";
import Svg, { Path } from "react-native-svg";
import { ThemeContext } from "styled-components/native";

type PropsT = {
  fill?: string;
  iconName?: string;
};

const A_Icon = (props: PropsT) => {
  const theme = useContext(ThemeContext);
  if (props.iconName == "home") {
    return (
      <Svg width="28" height="23" viewBox="0 0 28 23" fill="none">
        <Path
          d="M11.3334 22.6667V14.6667H16.6667V22.6667H23.3334V12H27.3334L14.0001 0L0.666748 12H4.66675V22.6667H11.3334Z"
          fill={props.fill || theme.icons.white}
        />
      </Svg>
    );
  } else if (props.iconName == "effects") {
    return (
      <Svg width="22" height="23" viewBox="0 0 22 23" fill="none">
        <Path
          d="M7.43461 11.0884L10.7014 10.1689C11.2579 10.0237 11.2579 9.22519 10.7014 9.05572L7.43461 8.13634C7.24101 8.0879 7.09585 7.94274 7.04741 7.74914L6.1037 4.48256C5.95855 3.92606 5.16 3.92606 4.99053 4.48256L4.07098 7.74931C4.02254 7.94292 3.87738 8.08807 3.68378 8.13651L0.417375 9.05589C-0.139125 9.20105 -0.139125 9.99959 0.417375 10.1691L3.68413 11.0886C3.87773 11.1371 4.02289 11.2822 4.07133 11.4758L5.01486 14.7665C5.16002 15.323 5.95856 15.323 6.12803 14.7665L7.04758 11.4998C7.09586 11.3061 7.24102 11.1369 7.43461 11.0884L7.43461 11.0884Z"
          fill={props.fill || theme.icons.white}
        />
        <Path
          d="M17.5975 16.8959L14.3307 15.9764C14.1371 15.9279 13.992 15.7828 13.9435 15.5892L13.024 12.3224C12.8788 11.7659 12.0803 11.7659 11.9108 12.3224L10.9913 15.5892C10.9428 15.7828 10.7976 15.9279 10.6041 15.9764L7.3373 16.8959C6.7808 17.0411 6.7808 17.8396 7.3373 18.0091L10.6041 18.9286C10.7977 18.9771 10.9428 19.1222 10.9913 19.3158L11.9108 22.5826C12.056 23.1391 12.8545 23.1391 13.024 22.5826L13.9435 19.3158C13.992 19.1222 14.1371 18.9771 14.3307 18.9286L17.5975 17.9848C18.1542 17.8396 18.1542 17.041 17.5975 16.8959V16.8959Z"
          fill={props.fill || theme.icons.white}
        />
        <Path
          d="M20.7433 5.01499L17.4765 4.09544C17.2829 4.047 17.1378 3.90184 17.0893 3.70824L16.1458 0.417375C16.0006 -0.139125 15.2021 -0.139125 15.0326 0.417375L14.1131 3.68413C14.0646 3.87773 13.9195 4.02289 13.7259 4.07133L10.4591 4.99088C9.90262 5.13604 9.90262 5.93458 10.4591 6.10405L13.726 7.02325C13.9196 7.0717 14.0648 7.21686 14.1132 7.41045L15.0328 10.6772C15.1779 11.2337 15.9765 11.2337 16.1459 10.6772L17.0655 7.41045C17.1139 7.21685 17.2591 7.0717 17.4527 7.02325L20.7432 6.10388C21.2997 5.95872 21.2997 5.16017 20.7432 5.01503L20.7433 5.01499Z"
          fill={props.fill || theme.icons.white}
        />
      </Svg>
    );
  } else if (props.iconName == "profile") {
    return (
      <Svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <Path
          d="M10.9999 10.9999C13.9466 10.9999 16.3333 8.61325 16.3333 5.66659C16.3333 2.71992 13.9466 0.333252 10.9999 0.333252C8.05325 0.333252 5.66659 2.71992 5.66659 5.66659C5.66659 8.61325 8.05325 10.9999 10.9999 10.9999ZM10.9999 13.6666C7.43992 13.6666 0.333252 15.4533 0.333252 18.9999V21.6666H21.6666V18.9999C21.6666 15.4533 14.5599 13.6666 10.9999 13.6666Z"
          fill={props.fill || theme.icons.white}
        />
      </Svg>
    );
  } else if (props.iconName == "error") {
    return (
      <Svg width="183" height="137" viewBox="0 0 183 137" fill="none">
        <Path
          d="M157.231 0H25.9547C11.6614 0 0 12.9496 0 28.7137V108.287C0 124.05 11.6603 137 25.9547 137H157.043C171.336 137 182.998 124.05 182.998 108.287V28.7137C183.185 12.7623 171.525 0 157.232 0H157.231ZM25.9547 10.1336H157.043C165.696 10.1336 172.841 18.3914 172.841 28.7134V33.4052H10.3441V28.7134C10.3441 18.3911 17.3039 10.1336 25.9544 10.1336H25.9547ZM157.231 126.677H25.9547C17.3026 126.677 10.1567 118.419 10.1567 108.098V43.7264H172.842V108.285C172.843 118.419 165.883 126.677 157.233 126.677L157.231 126.677Z"
          fill={props.fill || theme.icons.white}
        />
        <Path
          d="M82.0258 64L75.9046 70.0684L69.9748 64L65 69.1211L70.9304 75.0003L65 80.8789L69.9748 86L75.9046 79.9304L82.0258 86L87 80.8789L80.8776 75.0003L87 69.1211L82.0258 64Z"
          fill={props.fill || theme.icons.white}
        />
        <Path
          d="M118 69.1212L113.026 64L107.095 70.068L100.975 64L96 69.1212L102.122 75L96 80.8788L100.975 86L107.095 79.9302L113.026 86L118 80.8788L112.07 75L118 69.1212Z"
          fill={props.fill || theme.icons.white}
        />
        <Path d="M67 98H116V105H67V98Z" fill={props.fill} />
      </Svg>
    );
  } else if (props.iconName == "exit") {
    return (
      <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <Path
          d="M9.6125 16.4875L11.375 18.25L17.625 12L11.375 5.75L9.6125 7.5125L12.8375 10.75H0.75V13.25H12.8375L9.6125 16.4875ZM20.75 0.75H3.25C1.8625 0.75 0.75 1.875 0.75 3.25V8.25H3.25V3.25H20.75V20.75H3.25V15.75H0.75V20.75C0.75 22.125 1.8625 23.25 3.25 23.25H20.75C22.125 23.25 23.25 22.125 23.25 20.75V3.25C23.25 1.875 22.125 0.75 20.75 0.75Z"
          fill={props.fill || theme.icons.white}
        />
      </Svg>
    );
  } else if (props.iconName == "inc") {
    return (
      <Svg width="16" height="28" viewBox="0 0 16 28" fill="none">
        <Path
          d="M0 0.666664V8.66666H0.0133336L0 8.68L5.33333 14L0 19.3333L0.0133336 19.3467H0V27.3333H16V19.3467H15.9867L16 19.3333L10.6667 14L16 8.68L15.9867 8.66666H16V0.666664H0Z"
          fill={props.fill || theme.icons.white}
        />
      </Svg>
    );
  } else if (props.iconName == "plus") {
    return (
      <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <Path
          d="M6.24214 15.4667V0.533325H9.21335V15.4667H6.24214ZM0.266602 9.48007V6.50887H15.1999V9.48007H0.266602Z"
          fill={props.fill || theme.icons.white}
        />
      </Svg>
    );
  } else if (props.iconName == "logo") {
    return (
      <Svg width="27" height="22" viewBox="0 0 1390 1125" fill="none">
        <Path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M302.922 723.746C301.156 555.528 240.247 356.18 0.000244141 222.15L37.5786 154.518C307.743 305.238 378.186 534.114 380.169 722.932C381.153 816.608 365.421 900.534 349.576 960.856C341.634 991.093 333.608 1015.6 327.511 1032.69C324.461 1041.24 321.888 1047.94 320.042 1052.6C319.119 1054.92 318.377 1056.74 317.847 1058.01C317.582 1058.65 317.37 1059.15 317.215 1059.52L317.025 1059.96L316.964 1060.1L316.941 1060.16C316.932 1060.18 316.924 1060.2 281.494 1044.78C246.063 1029.37 246.057 1029.38 246.052 1029.39L246.128 1029.22C246.207 1029.03 246.343 1028.71 246.531 1028.26C246.907 1027.35 247.494 1025.92 248.26 1023.99C249.793 1020.13 252.044 1014.27 254.77 1006.63C260.226 991.339 267.565 968.962 274.869 941.153C289.519 885.383 303.813 808.588 302.922 723.746Z"
          fill={props.fill || theme.icons.white}
        />
        <Path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M617.488 730.19C727.197 730.19 816.134 641.073 816.134 531.141C816.134 421.209 727.197 332.092 617.488 332.092C507.779 332.092 418.842 421.209 418.842 531.141C418.842 641.073 507.779 730.19 617.488 730.19ZM617.488 807.598C769.862 807.598 893.385 683.824 893.385 531.141C893.385 378.458 769.862 254.684 617.488 254.684C465.114 254.684 341.591 378.458 341.59 531.141C341.59 683.824 465.114 807.598 617.488 807.598Z"
          fill={props.fill || theme.icons.white}
        />
        <Path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M1091.93 228.215C958.102 131.31 782.898 72.4987 618.716 77.7308L618.102 77.7503H617.488C334.072 77.7503 104.319 307.97 104.319 591.961H27.0675C27.0676 265.424 291.075 0.675628 616.872 0.342602C799.51 -5.31916 990.985 59.6171 1137.18 165.474C1283.02 271.072 1390 422.346 1390 591.961V630.665L964.492 630.665V553.257L1310.42 553.257C1295.81 431.565 1213.47 316.213 1091.93 228.215Z"
          fill={props.fill || theme.icons.white}
        />
        <Path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M152.144 915.415L219.046 876.711L301.179 1019.26L443.439 936.958L482.064 1004L272.903 1125L152.144 915.415Z"
          fill={props.fill || theme.icons.white}
        />
        <Path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M1081.27 415.307L1135.9 470.043L1019.74 586.433L1135.9 702.822L1081.27 757.558L910.494 586.433L1081.27 415.307Z"
          fill={props.fill || theme.icons.white}
        />
      </Svg>
    );
  } else if (props.iconName == "eye") {
    return (
      <Svg width="35" height="39" viewBox="0 0 35 39" fill="none">
        <Path
          d="M15.2305 3.84784V15.2319H3.84639"
          stroke={props.fill || theme.icons.white}
          stroke-width="2"
        />
        <Path
          d="M15.2305 35.1506V23.7665H3.84639"
          stroke={props.fill || theme.icons.white}
          stroke-width="2"
        />
        <Path
          d="M15.2301 23.7697L1 37.9998"
          stroke={props.fill || theme.icons.white}
          stroke-width="2"
        />
        <Path
          d="M1.00037 1.00018L15.2305 15.2303"
          stroke={props.fill || theme.icons.white}
          stroke-width="2"
        />
        <Path
          d="M19.2305 3.84784V15.2319H30.6146"
          stroke={props.fill || theme.icons.white}
          stroke-width="2"
        />
        <Path
          d="M19.2305 35.1506V23.7665H30.6146"
          stroke={props.fill || theme.icons.white}
          stroke-width="2"
        />
        <Path
          d="M19.2308 23.7697L33.4609 37.9998"
          stroke={props.fill || theme.icons.white}
          stroke-width="2"
        />
        <Path
          d="M33.4606 1.00018L19.2305 15.2303"
          stroke={props.fill || theme.icons.white}
          stroke-width="2"
        />
      </Svg>
    );
  } else if (props.iconName == "lupa") {
    return (
      <Svg width="17" height="17" viewBox="0 0 17 17" fill="none">
        <Path
          d="M12.2083 10.8333H11.4842L11.2275 10.5858C12.1258 9.54083 12.6667 8.18417 12.6667 6.70833C12.6667 3.4175 9.99917 0.75 6.70833 0.75C3.4175 0.75 0.75 3.4175 0.75 6.70833C0.75 9.99917 3.4175 12.6667 6.70833 12.6667C8.18417 12.6667 9.54083 12.1258 10.5858 11.2275L10.8333 11.4842V12.2083L15.4167 16.7825L16.7825 15.4167L12.2083 10.8333ZM6.70833 10.8333C4.42583 10.8333 2.58333 8.99083 2.58333 6.70833C2.58333 4.42583 4.42583 2.58333 6.70833 2.58333C8.99083 2.58333 10.8333 4.42583 10.8333 6.70833C10.8333 8.99083 8.99083 10.8333 6.70833 10.8333Z"
          fill={props.fill || theme.icons.white}
        />
      </Svg>
    );
  } else if (props.iconName == "chel") {
    return (
      <Svg width="14" height="17" viewBox="0 0 14 17" fill="none">
        <Path
          d="M13.5691 5.52297C13.2948 2.66348 11.023 0.352467 8.16354 0.0392152C7.92852 -2.40145e-08 7.6935 0 7.45847 0C4.08993 0 1.3086 2.74198 1.3086 6.14987C1.3086 6.46319 1.23031 6.77665 1.11279 7.05075C0.838556 7.59909 0.525238 8.10835 0.211919 8.5784C0.0161112 8.85264 -0.0623193 9.16595 0.0551921 9.47927C0.172703 9.79259 0.407726 10.0276 0.76026 10.106L1.19109 10.2236C1.3086 10.2628 1.3869 10.3411 1.3869 10.4586L1.62192 12.6521C1.70022 13.3179 2.24869 13.8272 2.95376 13.8272H3.85464C4.08966 13.8272 4.28547 13.9839 4.32468 14.1797L4.40298 14.454C4.5597 15.159 4.7163 15.8641 4.79473 16.6475C4.83394 16.8433 4.99054 17 5.18648 17H11.5714C11.6889 17 11.7672 16.9608 11.8456 16.8825C11.9239 16.8042 11.9631 16.6867 11.9631 16.6082L11.7281 14.2972C11.5714 12.5738 11.9631 10.7326 12.864 9.00923C13.4516 7.95176 13.6866 6.73743 13.5691 5.52317V5.52297Z"
          fill={props.fill || theme.icons.white}
        />
      </Svg>
    );
  } else if (props.iconName == "heart") {
    return (
      <Svg width="19" height="17" viewBox="0 0 19 17" fill="none">
        <Path
          d="M9.5 16.1813L8.23125 15.0263C3.725 10.94 0.75 8.245 0.75 4.9375C0.75 2.2425 2.8675 0.125 5.5625 0.125C7.085 0.125 8.54625 0.83375 9.5 1.95375C10.4537 0.83375 11.915 0.125 13.4375 0.125C16.1325 0.125 18.25 2.2425 18.25 4.9375C18.25 8.245 15.275 10.94 10.7688 15.035L9.5 16.1813Z"
          fill={props.fill || theme.icons.white}
        />
      </Svg>
    );
  } else if (props.iconName == "star") {
    return (
      <Svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <Path
          d="M14 0H13C13 4.90137 12.0136 8.07218 10.0429 10.0429C8.07218 12.0136 4.90137 13 0 13V14V15C4.90137 15 8.07218 15.9864 10.0429 17.9571C12.0136 19.9278 13 23.0986 13 28H14H15C15 23.0986 15.9864 19.9278 17.9571 17.9571C19.9278 15.9864 23.0986 15 28 15V14V13C23.0986 13 19.9278 12.0136 17.9571 10.0429C15.9864 8.07218 15 4.90137 15 0H14Z"
          stroke={props.fill || theme.icons.white}
          stroke-width="2"
        />
      </Svg>
    );
  } else if (props.iconName == "book") {
    return (
      <Svg width="27" height="28" viewBox="0 0 27 28" fill="none">
        <Path
          d="M3 27H24.5L23.5 25L24.5 23H3C1.89543 23 1 23.8954 1 25C1 26.1046 1.89543 27 3 27Z"
          stroke={props.fill || theme.icons.white}
          stroke-width="2"
        />
        <Path
          d="M1 25V4V4C1 2.34315 2.34315 1 4 1V1H5H25V22"
          stroke={props.fill || theme.icons.white}
          stroke-width="2"
        />
        <Path d="M5 1V24" stroke={props.fill} stroke-width="2" />
        <Path
          d="M14 5C14 7.40137 13.5136 8.82218 12.6679 9.66789C11.8222 10.5136 10.4014 11 8 11V12V13C10.4014 13 11.8222 13.4864 12.6679 14.3321C13.5136 15.1778 14 16.5986 14 19H15H16C16 16.5986 16.4864 15.1778 17.3321 14.3321C18.1778 13.4864 19.5986 13 22 13V12V11C19.5986 11 18.1778 10.5136 17.3321 9.66789C16.4864 8.82218 16 7.40137 16 5H15H14Z"
          stroke={props.fill || theme.icons.white}
          stroke-width="2"
        />
      </Svg>
    );
  } else if (props.iconName == "EffectsStack") {
    return (
      <Svg width="28" height="32" viewBox="0 0 28 32" fill="none">
        <Path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M0.0195312 4.44444V28.5379C0.0066272 28.653 0 28.7699 0 28.8885C0 30.6067 1.39289 31.9996 3.11111 31.9996H25.9902C26.7253 31.9996 27.2092 31.233 26.8929 30.5693L26.2969 29.3187C26.1671 29.0465 26.1671 28.7304 26.2969 28.4582L27.4771 25.9819C27.5411 25.8475 27.5743 25.7005 27.5743 25.5517L27.5751 1.00003C27.5751 0.447733 27.1274 0 26.5751 0H4.46398C2.00938 0 0.0195312 1.98985 0.0195312 4.44444ZM4.01953 2.99639C4.01953 2.37802 3.44142 1.90437 2.93506 2.25932C2.24709 2.74159 1.79731 3.54049 1.79731 4.44444V24.7113C1.79731 25.3433 2.47914 25.7773 3.11111 25.7773V25.7773V25.7773C3.61282 25.7773 4.01953 25.3706 4.01953 24.8689V2.99639ZM23.6225 27.5551C24.1493 27.5551 24.4961 28.1045 24.2694 28.5801V28.5801C24.1764 28.7752 24.1764 29.0017 24.2694 29.1968V29.1968C24.4961 29.6724 24.1493 30.2218 23.6224 30.2218H3.11111C2.37473 30.2218 1.77778 29.6248 1.77778 28.8885C1.77778 28.1521 2.37473 27.5551 3.11111 27.5551H23.6225ZM12.9445 14.4809C11.7143 13.8081 10.0785 13.5 7.98047 13.5C10.0785 13.5 11.7143 13.1919 12.9445 12.5191C13.8348 12.0322 14.5127 11.3544 14.9996 10.4641C15.6724 9.23384 15.9805 7.598 15.9805 5.5C15.9805 7.598 16.2886 9.23384 16.9614 10.4641C17.4483 11.3544 18.1261 12.0322 19.0164 12.5191C20.2466 13.1919 21.8825 13.5 23.9805 13.5C21.8825 13.5 20.2466 13.8081 19.0164 14.4809C18.1261 14.9678 17.4483 15.6457 16.9614 16.5359C16.2886 17.7662 15.9805 19.402 15.9805 21.5C15.9805 19.402 15.6724 17.7662 14.9996 16.5359C14.5127 15.6457 13.8348 14.9678 12.9445 14.4809ZM14.1746 20.4999C14.2073 21.0512 14.6504 21.5 15.2027 21.5H15.9805H16.7582C17.3105 21.5 17.7537 21.0512 17.7863 20.4999C17.9074 18.4545 18.41 17.2989 19.0947 16.6142C19.7794 15.9295 20.935 15.4269 22.9804 15.3058C23.5317 15.2732 23.9805 14.8301 23.9805 14.2778V13.5V12.7222C23.9805 12.1699 23.5317 11.7268 22.9804 11.6942C20.935 11.5731 19.7794 11.0705 19.0947 10.3858C18.41 9.70107 17.9074 8.54547 17.7863 6.50008C17.7537 5.94876 17.3105 5.5 16.7582 5.5H15.9805H15.2027C14.6504 5.5 14.2073 5.94876 14.1746 6.50008C14.0535 8.54547 13.551 9.70107 12.8662 10.3858C12.1815 11.0705 11.0259 11.5731 8.98054 11.6942C8.42922 11.7268 7.98047 12.1699 7.98047 12.7222V13.5V14.2778C7.98047 14.8301 8.42922 15.2732 8.98054 15.3058C11.0259 15.4269 12.1815 15.9295 12.8662 16.6142C13.551 17.2989 14.0535 18.4545 14.1746 20.4999Z"
          fill={props.fill || theme.icons.white}
        />
      </Svg>
    );
  } else if (props.iconName == "HomeStack") {
    return (
      <Svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <Path
          d="M32 31V10.0985C32 9.64692 31.6973 9.25136 31.2614 9.1333L30.2571 8.86129C25.7487 7.64026 21.9447 4.63184 19.7149 0.547819C19.5334 0.215367 19.1893 0 18.8105 0H13.1895C12.8107 0 12.4666 0.215368 12.2851 0.547819C10.0553 4.63184 6.25135 7.64026 1.74293 8.86129L0.738584 9.1333C0.302682 9.25136 0 9.64692 0 10.0985V31C0 31.5523 0.447716 32 1 32H11.3178C11.8701 32 12.3178 31.5523 12.3178 31V30.2222V20.5716C12.3178 18.5378 13.9665 16.8891 16.0004 16.8891C18.0342 16.8891 19.6829 18.5378 19.6829 20.5716V30.2222V31C19.6829 31.5523 20.1306 32 20.6829 32H31C31.5523 32 32 31.5523 32 31Z"
          fill={props.fill || theme.icons.white}
        />
      </Svg>
    );
  } else if (props.iconName == "ProfileStack") {
    return (
      <Svg width="30" height="32" viewBox="0 0 30 32" fill="none">
        <Path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M19.069 0H9.9774C3.8135 0 -0.875151 5.53477 0.138188 11.6148L1.72939 21.162C2.77174 27.4161 8.18282 32 14.5232 32C20.8636 32 26.2747 27.4161 27.317 21.162L28.9082 11.6148C29.9216 5.53476 25.2329 0 19.069 0ZM10.1237 21.5853C9.16763 20.6293 8.55483 19.3942 8.36458 18.0715C8.29469 17.5855 7.90325 17.1855 7.41233 17.1855C6.92141 17.1855 6.51832 17.5848 6.57275 18.0727C6.77302 19.868 7.57689 21.5527 8.86658 22.8424C10.3669 24.3427 12.4017 25.1855 14.5234 25.1855C16.6452 25.1855 18.68 24.3427 20.1803 22.8424C21.47 21.5527 22.2739 19.868 22.4741 18.0727C22.5286 17.5848 22.1255 17.1855 21.6345 17.1855C21.1436 17.1855 20.7522 17.5855 20.6823 18.0715C20.492 19.3942 19.8792 20.6293 18.9232 21.5853C17.7563 22.7522 16.1737 23.4078 14.5234 23.4078C12.8732 23.4078 11.2906 22.7522 10.1237 21.5853ZM10.9673 11.259C10.9673 12.5682 9.90605 13.6294 8.59693 13.6294C7.28781 13.6294 6.22656 12.5682 6.22656 11.259C6.22656 9.94992 7.28781 8.88867 8.59693 8.88867C9.90605 8.88867 10.9673 9.94992 10.9673 11.259ZM20.4495 13.6294C21.7586 13.6294 22.8198 12.5682 22.8198 11.259C22.8198 9.94992 21.7586 8.88867 20.4495 8.88867C19.1404 8.88867 18.0791 9.94992 18.0791 11.259C18.0791 12.5682 19.1404 13.6294 20.4495 13.6294Z"
          fill={props.fill || theme.icons.white}
        />
      </Svg>
    );
  } else if (props.iconName == "settings") {
    return (
      <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <Path
          d="M10 6C11.0904 6 12.1361 6.42143 12.9071 7.17157C13.6781 7.92172 14.1113 8.93913 14.1113 10C14.1113 11.0609 13.6781 12.0783 12.9071 12.8284C12.1361 13.5786 11.0904 14 10 14C8.90962 14 7.8639 13.5786 7.09289 12.8284C6.32187 12.0783 5.88872 11.0609 5.88872 10C5.88872 8.93913 6.32187 7.92172 7.09289 7.17157C7.8639 6.42143 8.90962 6 10 6ZM10 8C9.45481 8 8.93195 8.21071 8.54644 8.58579C8.16094 8.96086 7.94436 9.46957 7.94436 10C7.94436 10.5304 8.16094 11.0391 8.54644 11.4142C8.93195 11.7893 9.45481 12 10 12C10.5452 12 11.068 11.7893 11.4536 11.4142C11.8391 11.0391 12.0556 10.5304 12.0556 10C12.0556 9.46957 11.8391 8.96086 11.4536 8.58579C11.068 8.21071 10.5452 8 10 8ZM7.94436 20C7.6874 20 7.47156 19.82 7.43045 19.58L7.05016 16.93C6.40263 16.68 5.84761 16.34 5.31314 15.94L2.75387 16.95C2.52775 17.03 2.25024 16.95 2.1269 16.73L0.0712603 13.27C-0.0623562 13.05 -0.000686894 12.78 0.194599 12.63L2.3633 10.97L2.29135 10L2.3633 9L0.194599 7.37C-0.000686894 7.22 -0.0623562 6.95 0.0712603 6.73L2.1269 3.27C2.25024 3.05 2.52775 2.96 2.75387 3.05L5.31314 4.05C5.84761 3.66 6.40263 3.32 7.05016 3.07L7.43045 0.42C7.47156 0.18 7.6874 0 7.94436 0H12.0556C12.3126 0 12.5284 0.18 12.5695 0.42L12.9498 3.07C13.5974 3.32 14.1524 3.66 14.6869 4.05L17.2461 3.05C17.4722 2.96 17.7498 3.05 17.8731 3.27L19.9287 6.73C20.0624 6.95 20.0007 7.22 19.8054 7.37L17.6367 9L17.7086 10L17.6367 11L19.8054 12.63C20.0007 12.78 20.0624 13.05 19.9287 13.27L17.8731 16.73C17.7498 16.95 17.4722 17.04 17.2461 16.95L14.6869 15.95C14.1524 16.34 13.5974 16.68 12.9498 16.93L12.5695 19.58C12.5284 19.82 12.3126 20 12.0556 20H7.94436ZM9.22913 2L8.84884 4.61C7.61546 4.86 6.52597 5.5 5.73455 6.39L3.2575 5.35L2.48664 6.65L4.65534 8.2C4.24421 9.37 4.24421 10.64 4.65534 11.8L2.47636 13.36L3.24722 14.66L5.74483 13.62C6.53625 14.5 7.61546 15.14 8.83856 15.38L9.21886 18H10.7811L11.1614 15.39C12.3845 15.14 13.4638 14.5 14.2552 13.62L16.7528 14.66L17.5236 13.36L15.3447 11.81C15.7558 10.64 15.7558 9.37 15.3447 8.2L17.5134 6.65L16.7425 5.35L14.2655 6.39C13.474 5.5 12.3845 4.86 11.1512 4.62L10.7709 2H9.22913Z"
          fill={props.fill || theme.icons.white}
        />
      </Svg>
    );
  } else if (props.iconName == "back") {
    return (
      <Svg width="12" height="18" viewBox="0 0 12 18" fill="none">
        <Path
          d="M11 17L2 9L11 0.999999"
          stroke={props.fill || theme.icons.white}
          stroke-width="1.5"
        />
      </Svg>
    );
  } else if (props.iconName == "clock") {
    return (
      <Svg width="26" height="36" viewBox="0 0 26 36" fill="none">
        <Path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M19.8552 16.8324C24.4055 14.0014 25.6773 6.66152 25.9413 2C25.9835 1.25518 26 0.578746 26 0H0C0 0.578746 0.0164631 1.25518 0.0586524 2C0.3227 6.66152 1.59446 14.0014 6.14485 16.8324C7.32819 17.5687 8.73326 18 10.4 18C8.71261 18 7.2934 18.3979 6.10095 19.087C1.48619 21.7541 0.267387 28.7839 0.0426004 34C0.0122245 34.7049 0 35.3766 0 36H26C26 35.3766 25.9878 34.7049 25.9574 34C25.7326 28.7839 24.5138 21.7541 19.899 19.087C18.7066 18.3979 17.2874 18 15.6 18C17.2667 18 18.6718 17.5687 19.8552 16.8324ZM15.6 20V18V16C18.9175 16 21.0005 13.7586 22.3424 10.2195C23.3662 7.51952 23.7935 4.4146 23.9379 2H2.06206C2.20647 4.4146 2.63384 7.51952 3.65758 10.2195C4.99948 13.7586 7.08246 16 10.4 16V18V20C8.58971 20 7.26174 20.5609 6.2274 21.4356C5.15624 22.3415 4.30178 23.6707 3.64723 25.3251C2.59044 27.9961 2.17056 31.2136 2.04466 34H23.9553C23.8294 31.2136 23.4096 27.9961 22.3528 25.3251C21.6982 23.6707 20.8438 22.3415 19.7726 21.4356C18.7383 20.5609 17.4103 20 15.6 20Z"
          fill={props.fill || theme.icons.white}
        />
      </Svg>
    );
  } else if (props.iconName == "bigstar") {
    return (
      <Svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <Path
          d="M18 0H17C17 6.32994 15.7279 10.5008 13.1143 13.1143C10.5008 15.7279 6.32994 17 0 17V18V19C6.32994 19 10.5008 20.2721 13.1143 22.8857C15.7279 25.4992 17 29.6701 17 36H18H19C19 29.6701 20.2721 25.4992 22.8857 22.8857C25.4992 20.2721 29.6701 19 36 19V18V17C29.6701 17 25.4992 15.7279 22.8857 13.1143C20.2721 10.5008 19 6.32994 19 0H18Z"
          stroke={props.fill || theme.icons.white}
          stroke-width="2"
        />
      </Svg>
    );
  } else if (props.iconName == "avatarplaceholder") {
    return (
      <Svg width="22" height="28" viewBox="0 0 22 28" fill="none">
        <Path
          d="M20.625 2.88633C19.8 2.88633 19.25 3.44441 19.25 4.28153V5.67674H17.1875L15.2625 1.49112C15.125 1.21208 14.9875 0.933043 14.7125 0.793522C14.025 0.0959203 12.925 -0.0436 11.9625 0.374961L11 0.654002L10.0375 0.235441C9.075 -0.183121 7.975 -0.0435999 7.2875 0.654002C7.0125 0.933043 6.875 1.21208 6.7375 1.49112L4.8125 5.67674H2.75V4.28153C2.75 3.44441 2.2 2.88633 1.375 2.88633C0.55 2.88633 0 3.44441 0 4.28153V5.67674C0 7.21146 1.2375 8.46714 2.75 8.46714H19.25C20.7625 8.46714 22 7.21146 22 5.67674V4.28153C22 3.58393 21.45 2.88633 20.625 2.88633ZM0 28V23.8144C0 20.0892 7.32875 18.2336 11 18.2336C14.6713 18.2336 22 20.0892 22 23.8144V28H0ZM19.3875 25.3491V23.8144C19.3875 22.9215 15.0837 20.8845 11 20.8845C6.91625 20.8845 2.6125 22.9215 2.6125 23.8144V25.3491H19.3875ZM16.5 9.86235V11.2576C16.5 14.341 14.0387 16.8384 11 16.8384C7.96125 16.8384 5.5 14.341 5.5 11.2576V9.86235H8.25V11.2576C8.25 12.8062 9.4875 14.048 11 14.048C12.5125 14.048 13.75 12.8062 13.75 11.2576V9.86235H16.5Z"
          fill={props.fill || "#383838"}
        />
      </Svg>
    );
  } else if (props.iconName == "plusBig") {
    return (
      <Svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <Path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M20 17C19.4477 17 19 16.5523 19 16V0H17V16C17 16.5523 16.5523 17 16 17L0 17V19L16 19C16.5517 19 16.9991 19.4468 17 19.9983V20V36H19V20L19 19.9983C19.0009 19.4468 19.4483 19 20 19H36V17H20Z"
          fill={props.fill || "white"}
        />
      </Svg>
    );
  } else if (props.iconName == "arrow") {
    return (
      <Svg width="37" height="38" viewBox="0 0 37 38" fill="none">
        <Path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M36.3945 19L18.7177 37.1968L17.2831 35.8032L32.6348 20L0.000374069 20L0.000374045 18L32.6348 18L17.2831 2.19679L18.7177 0.803223L36.3945 19Z"
          fill={props.fill || "white"}
        />
      </Svg>
    );
  } else if (props.iconName == "navigate") {
    return (
      <Svg width="13" height="18" viewBox="0 0 13 18" fill="none">
        <Path
          d="M1 17C5 14 7 12.5 12 9C8 6 5 4 0.999999 1"
          stroke={props.fill || "white"}
          stroke-width="2"
          stroke-linejoin="bevel"
        />
      </Svg>
    );
  }
  return <></>;
};

export default A_Icon;
