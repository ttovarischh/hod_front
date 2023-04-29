import { Colors } from "./colors";
export type ThemeType = typeof dark;

export const dark = {
  appBg: Colors.bg,
  icons: {
    white: Colors.beacon_of_hope,
    grey: Colors.beacon_of_hope_opacity,
    err: Colors.fire_storm,
    yellow: Colors.gentle_repose,
    filthy: Colors.dull_grey,
  },
  bottomBar: {
    bg: Colors.weirdGrey,
    ic: Colors.white,
    tab: Colors.lightBg,
  },
  text: {
    active: Colors.white,
    inactive: Colors.inactive,
  },
  card: {
    bg: Colors.greyBg,
  },
  button: {
    bright: Colors.acid_arrow,
    bright_text: Colors.ui_black,
    bright_hover: Colors.dull_arrow,
    dull: Colors.dull,
    dull_border: Colors.dull_border,
    dull_text: Colors.beacon_of_hope,
    dull_hover: Colors.dullest,
    disabled_fill: Colors.dark_star,
    disabled_text: Colors.dull,
    secondary_fill: Colors.gentle_repose,
    secondary_disabled: Colors.dark_star,
    error_fill: Colors.fire_storm,
  },
  nav: {
    header: Colors.beacon_of_hope,
    header_button: Colors.dull_grey,
    header_fill: Colors.ui_black,
    tabbar_fill: Colors.tabbar_grey,
  },
  input: {
    fill: Colors.teleport,
    placeholder: Colors.shadow_of_moil,
    text: Colors.gentle_repose,
    simple_border: Colors.acid_arrow,
    err_border: Colors.fire_storm,
    err_text: Colors.fire_storm,
  },
};

export const light: ThemeType = {
  appBg: Colors.bg,
  icons: {
    white: Colors.beacon_of_hope,
    grey: Colors.beacon_of_hope_opacity,
    err: Colors.fire_storm,
    yellow: Colors.gentle_repose,
    filthy: Colors.dull_grey,
  },
  bottomBar: {
    bg: Colors.weirdGrey,
    ic: Colors.white,
    tab: Colors.lightBg,
  },
  text: {
    active: Colors.white,
    inactive: Colors.inactive,
  },
  card: {
    bg: Colors.dull,
  },
  button: {
    bright: Colors.acid_arrow,
    bright_text: Colors.ui_black,
    bright_hover: Colors.dull_arrow,
    dull: Colors.dull,
    dull_border: Colors.dull_border,
    dull_text: Colors.beacon_of_hope,
    dull_hover: Colors.dullest,
    disabled_fill: Colors.dark_star,
    disabled_text: Colors.dull,
    secondary_fill: Colors.gentle_repose,
    secondary_disabled: Colors.dark_star,
    error_fill: Colors.fire_storm,
  },
  nav: {
    header: Colors.beacon_of_hope,
    header_button: Colors.dull_grey,
    header_fill: Colors.ui_black,
    tabbar_fill: Colors.tabbar_grey,
  },
  input: {
    fill: Colors.dark_star,
    placeholder: Colors.shadow_of_moil,
    text: Colors.gentle_repose,
    simple_border: Colors.acid_arrow,
    err_border: Colors.fire_storm,
    err_text: Colors.fire_storm,
  },
};

const theme = dark;
export default theme;
