/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#881425';
const tintColorDark = '#ffdfe4';

export const Colors = {
  light: {
    text: '#881425',
    background: '#ffdfe4',
    tint: tintColorLight,
    icon: '#881425',
    tabIconDefault: '#881425',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ffdfe4',
    background: '#4b040f',
    tint: tintColorDark,
    icon: '#ff647b',
    tabIconDefault: '#ff647b',
    tabIconSelected: tintColorDark,
  },
};
