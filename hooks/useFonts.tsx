import { useFonts } from "expo-font";

export function useAppFonts() {
  const [loaded, error] = useFonts({
    "MountainsOfChristmas-Regular": require("../assets/fonts/MountainsofChristmas-Regular.ttf"),
    "MountainsOfChristmas-Bold": require("../assets/fonts/MountainsofChristmas-Bold.ttf"),
  });
  return { loaded, error };
}

export const Fonts = {
  display: "MountainsOfChristmas-Bold",
  displayRegular: "MountainsOfChristmas-Regular",
  body: "System",
};
