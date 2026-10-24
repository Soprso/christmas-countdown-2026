import { View, Text, Pressable, StyleSheet } from "react-native";
import { ThemeBackground } from "../components/ThemeBackground";
import { Countdown } from "../components/Countdown";
import { BRAND_NAME } from "../constants/themes";
import { router } from "expo-router";
import { useAudioManager } from "../hooks/useAudioManager";
import { useTheme } from "../hooks/useTheme";

export default function Home() {
  useAudioManager();
  const { theme } = useTheme();
  return (
    <ThemeBackground>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.colors.text }]}>Christmas is Coming</Text>
          <Pressable onPress={() => router.push("/settings")} style={styles.settingsBtn} accessibilityLabel="Settings">
            <Text style={{ color: theme.colors.text, fontSize: 20 }}>⚙</Text>
          </Pressable>
        </View>
        <View style={styles.center}>
          <Countdown />
          <Pressable style={styles.cta} onPress={() => router.push("/gallery")}>
            <Text style={styles.ctaText}>Explore Wallpapers</Text>
          </Pressable>
        </View>
        <Text style={[styles.brand, { color: theme.colors.textSecondary }]}>{BRAND_NAME}</Text>
      </View>
    </ThemeBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 40 },
  title: { fontSize: 26, fontWeight: "800" },
  settingsBtn: { padding: 8 },
  center: { flex: 1, alignItems: "center", justifyContent: "center", gap: 20 },
  cta: { backgroundColor: "rgba(0,0,0,0.5)", paddingHorizontal: 18, paddingVertical: 12, borderRadius: 12, borderWidth: 1, borderColor: "rgba(255,255,255,0.5)" },
  ctaText: { color: "#fff", fontWeight: "700" },
  brand: { textAlign: "center", marginBottom: 12, fontSize: 12 },
});
