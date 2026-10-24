import { ImageBackground, View, StyleSheet } from "react-native";
import { useTheme } from "../hooks/useTheme";

export function ThemeBackground({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  return (
    <ImageBackground source={theme.background} style={styles.bg} resizeMode="cover">
      <View style={[StyleSheet.absoluteFill, styles.overlay, { backgroundColor: theme.colors.overlay }]} />
      {children}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1, width: "100%", height: "100%" },
  overlay: {},
});
