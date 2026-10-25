import { View, Text, Pressable, StyleSheet, Switch } from "react-native";
import { ThemeBackground } from "../components/ThemeBackground";
import { ThemeSelector } from "../components/ThemeSelector";
import { useTheme } from "../hooks/useTheme";
import { router } from "expo-router";
import { BRAND_NAME } from "../constants/themes";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Settings() {
  const { theme, muted, setMuted } = useTheme();
  const insets = useSafeAreaInsets();
  return (
    <ThemeBackground>
      <View style={[styles.container, { paddingTop: insets.top + 8 }]}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backBtn} accessibilityLabel="Back" hitSlop={8}>
            <Text style={{ color: "#f5f3ee", fontSize: 18 }}>←</Text>
          </Pressable>
          <Text style={styles.title}>Settings</Text>
          <View style={{ width: 44 }} />
        </View>
        <Text style={styles.section}>Theme</Text>
        <ThemeSelector />
        <View style={styles.row}>
          <Text style={styles.label}>Music</Text>
          <View style={styles.muteRow}>
            <Text style={{ color: "#f5f3ee", opacity: 0.9 }}>{muted ? "Muted" : "On"}</Text>
            <Switch value={!muted} onValueChange={(v) => setMuted(!v)} />
          </View>
        </View>
        <Pressable style={styles.link} onPress={() => router.push("/about")}><Text style={styles.linkText}>About</Text></Pressable>
        <Pressable style={styles.link}><Text style={[styles.linkText, { opacity: 0.8 }]}>Privacy Policy (placeholder)</Text></Pressable>
        <View style={[styles.footer, { bottom: insets.bottom + 12 }]}>
          <Text style={{ color: "#f5f3ee", opacity: 0.8 }}>{BRAND_NAME}</Text>
        </View>
      </View>
    </ThemeBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 16 },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingBottom: 10 },
  backBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: "rgba(0,0,0,0.4)", borderWidth: 1, borderColor: "#d4af37", alignItems: "center", justifyContent: "center" },
  title: { color: "#f5f3ee", fontSize: 18, fontWeight: "800", letterSpacing: 1 },
  section: { color: "#f5f3ee", fontSize: 18, fontWeight: "800", marginTop: 20, marginBottom: 12 },
  row: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 24 },
  label: { color: "#f5f3ee", fontSize: 16, fontWeight: "700" },
  muteRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  link: { marginTop: 18 },
  linkText: { color: "#f5f3ee", fontWeight: "600" },
  footer: { position: "absolute", left: 0, right: 0, alignItems: "center" },
});
