// TODO: write documentation about fonts and typography along with guides on how to add custom fonts in own
// markdown file and add links from here

import { Platform } from "react-native"
import { FontSource, useFonts } from "expo-font"

export const customFontsToLoad: Record<string, FontSource> =
  Platform.OS === "web"
    ? {
        SpaceGrotesk_300Light: require("../../assets/fonts/SpaceGrotesk_300Light.ttf"),
        SpaceGrotesk_400Regular: require("../../assets/fonts/SpaceGrotesk_400Regular.ttf"),
        SpaceGrotesk_500Medium: require("../../assets/fonts/SpaceGrotesk_500Medium.ttf"),
        SpaceGrotesk_600SemiBold: require("../../assets/fonts/SpaceGrotesk_600SemiBold.ttf"),
        SpaceGrotesk_700Bold: require("../../assets/fonts/SpaceGrotesk_700Bold.ttf"),
      }
    : {}

/**
 * On iOS and Android, the fonts are embedded as part of the app binary
 * using the expo config plugin in `app.json`. See the project
 * [`app.json`](../../app.json) for the expo-fonts configuration. The assets
 * are added via the `app/assets/fonts` folder. This config plugin
 * does NOT work for web, so we have to dynamically load the fonts via this hook.
 *
 * For more info: https://docs.expo.dev/versions/latest/sdk/font/
 */
export const useCustomFonts = (): [boolean, Error | null] => {
  const [areFontsLoaded, fontError] = useFonts(customFontsToLoad)
  if (Platform.OS === "web") {
    return [areFontsLoaded, fontError]
  }

  // On native, fonts are precompiled and ready
  return [true, null]
}

const fonts = {
  spaceGrotesk: {
    light: Platform.select({
      ios: "SpaceGrotesk-Light",
      android: "SpaceGrotesk_300Light",
    }),
    normal: Platform.select({
      ios: "SpaceGrotesk-Regular",
      android: "SpaceGrotesk_400Regular",
    }),
    medium: Platform.select({
      ios: "SpaceGrotesk-Medium",
      android: "SpaceGrotesk_500Medium",
    }),
    semiBold: Platform.select({
      ios: "SpaceGrotesk-SemiBold",
      android: "SpaceGrotesk_600SemiBold",
    }),
    bold: Platform.select({
      ios: "SpaceGrotesk-Bold",
      android: "SpaceGrotesk_700Bold",
    }),
  },
  helveticaNeue: {
    // iOS only font.
    thin: "HelveticaNeue-Thin",
    light: "HelveticaNeue-Light",
    normal: "Helvetica Neue",
    medium: "HelveticaNeue-Medium",
  },
  courier: {
    // iOS only font.
    normal: "Courier",
  },
  sansSerif: {
    // Android only font.
    thin: "sans-serif-thin",
    light: "sans-serif-light",
    normal: "sans-serif",
    medium: "sans-serif-medium",
  },
  monospace: {
    // Android only font.
    normal: "monospace",
  },
}

export const typography = {
  /**
   * The fonts are available to use, but prefer using the semantic name.
   */
  fonts,
  /**
   * The primary font. Used in most places.
   */
  primary: fonts.spaceGrotesk,
  /**
   * An alternate font used for perhaps titles and stuff.
   */
  secondary: Platform.select({ ios: fonts.helveticaNeue, android: fonts.sansSerif }),
  /**
   * Lets get fancy with a monospace font!
   */
  code: Platform.select({ ios: fonts.courier, android: fonts.monospace }),
}
