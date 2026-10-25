import { View, Text, Pressable, StyleSheet } from "react-native";
import { ThemeBackground } from "../components/ThemeBackground";
import { Countdown } from "../components/Countdown";
import { BRAND_NAME } from "../constants/themes";
import { router } from "expo-router";
import { useAudioManager } from "../hooks/useAudioManager";
import { useTheme } from "../hooks/useTheme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Snowfall } from "../components/Snowfall";
import { Fonts } from "../hooks/useFonts";

export default function Home() {
  useAudioManager();
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  return (
    <ThemeBackground>
      <Snowfall />
      <View style={[styles.container, { paddingTop: insets.top + 12 }]}>
        <View style={styles.header}>
          <View style={{ flex: 1 }} />
          <Pressable onPress={() => router.push("/settings")} style={styles.settingsBtn} accessibilityLabel="Settings" hitSlop={8}>
            <Text style={{ color: "#f5f3ee", fontSize: 20 }}>⚙</Text>
          </Pressable>
        </View>
        <View style={styles.center}>
          <Text style={styles.heading}>CHRISTMAS IS COMING</Text>
          <Countdown />
          <Pressable style={styles.cta} onPress={() => router.push("/gallery")}>
            <Text style={styles.ctaText}>EXPLORE WALLPAPERS</Text>
          </Pressable>
        </View>
        <Text style={[styles.brand, { color: "#f5f3ee", marginBottom: insets.bottom + 12 }]}>{BRAND_NAME}</Text>
      </View>
    </ThemeBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 16, zIndex: 1 },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "flex-end" },
  heading: { color: "#f5f3ee", fontSize: 30, fontFamily: Fonts.display, textAlign: "center", marginBottom: 18, letterSpacing: 1 },
  settingsBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: "rgba(0,0,0,0.4)", borderWidth: 1, borderColor: "#d4af37", alignItems: "center", justifyContent: "center" },
  center: { flex: 1, alignItems: "center", justifyContent: "center", gap: 22 },
  cta: { backgroundColor: "#7c1c2b", paddingHorizontal: 22, paddingVertical: 14, borderRadius: 14, borderWidth: 1, borderColor: "#d4af37" },
  ctaText: { color: "#f5f3ee", fontWeight: "800", letterSpacing: 1 },
  brand: { textAlign: "center", fontSize: 11 },
});
