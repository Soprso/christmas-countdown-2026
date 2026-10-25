import { Stack } from "expo-router";
import { ThemeProvider } from "../hooks/useTheme";
import { StatusBar } from "expo-status-bar";
import { useAppFonts } from "../hooks/useFonts";
import { View } from "react-native";

export default function RootLayout() {
  const { loaded } = useAppFonts();
  if (!loaded) {
    return <View style={{ flex: 1, backgroundColor: "#061826" }} />;
  }
  return (
    <ThemeProvider>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="settings" />
        <Stack.Screen name="about" />
        <Stack.Screen name="gallery/index" />
        <Stack.Screen name="gallery/[id]" />
      </Stack>
    </ThemeProvider>
  );
}
