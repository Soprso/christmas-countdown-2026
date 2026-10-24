import { Stack } from "expo-router";
import { ThemeProvider } from "../hooks/useTheme";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
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
