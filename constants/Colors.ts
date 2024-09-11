/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4'; //blue
const tintColorDark = '#fff'; //white

export const Colors = {
  light: {
    text: '#282828', //black
    background: '#FFFFFF', //white
    themeColor: '#FF8A8A', //peach
    tabBackground: '#efeded', //broken white
    backgroundCard: '#E8E8E8', //light gray
    shadowColor: '#000',
    tint: tintColorLight,
    icon: '#e79aff', //lilac
    tabIconDefault: '#979797', //gray
    tabIconSelected: '#000', //black
  },
  dark: {
    text: '#FFFFFF', //white
    background: '#1F1A24', //dark
    themeColor: '#FF8A8A', //peach
    tabBackground: '#282828', //dark gray
    backgroundCard: '#9BA1A6', //gray a little bit light
    shadowColor: '#fff',
    tint: tintColorDark,
    icon: '#9BA1A6', //gray a little bit light
    tabIconDefault: '#9BA1A6', //gray a little bit light
    tabIconSelected: tintColorDark,
  },
};
