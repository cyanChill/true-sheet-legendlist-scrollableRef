import type { ExpoConfig } from "expo/config";
import buildPropertiesPlugin from "expo-build-properties/plugin";

export default (): ExpoConfig => ({
  name: "true-sheet-legendlist-scroll",
  slug: "true-sheet-legendlist-scroll",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "light",
  ios: {
    supportsTablet: true,
  },
  android: {
    adaptiveIcon: {
      backgroundColor: "#E6F4FE",
      foregroundImage: "./assets/android-icon-foreground.png",
      backgroundImage: "./assets/android-icon-background.png",
      monochromeImage: "./assets/android-icon-monochrome.png",
    },
    predictiveBackGestureEnabled: false,
    package: "com.missingcore.truesheetlegendlistscroll",
  },
  web: {
    favicon: "./assets/favicon.png",
  },
  plugins: [
    buildPropertiesPlugin({
      android: {
        cmakeVersion: "3.31.6",
        enableBundleCompression: true,
        enableMinifyInReleaseBuilds: true,
        enableShrinkResourcesInReleaseBuilds: true,
      },
    }),
  ],
});
