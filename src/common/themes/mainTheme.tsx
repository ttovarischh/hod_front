import { Colors } from './colors';

export type ThemeType = typeof dark;

export const dark = {
    appBg: Colors.bg,
    icons: Colors.black,
    bottomBar: {
        bg: Colors.greyBg,
        ic: Colors.white,
        tab: Colors.lightBg,
    },
    text: {
        active: Colors.white,
        inactive: Colors.inactive
    },
    card: {
        bg: Colors.greyBg
    },
    button: {
        solid: Colors.lightBg,
        border: Colors.inactive,
    }
};

export const light: ThemeType = {
    appBg: Colors.bg,
    icons: Colors.black,
    bottomBar: {
        bg: Colors.greyBg,
        ic: Colors.white,
        tab: Colors.lightBg,
    },
    text: {
        active: Colors.white,
        inactive: Colors.inactive
    },
    card: {
        bg: Colors.greyBg
    },
    button: {
        solid: Colors.lightBg,
        border: Colors.inactive,
    }
}

const theme = dark;
export default theme;
