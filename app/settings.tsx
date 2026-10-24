import { View, Text, Pressable, StyleSheet, Switch } from "react-native";
import { ThemeBackground } from "../components/ThemeBackground";
import { ThemeSelector } from "../components/ThemeSelector";
import { useTheme } from "../hooks/useTheme";
import { router } from "expo-router";
import { BRAND_NAME } from "../constants/themes";

export default function Settings() {
  const { theme, muted, setMuted } = useTheme();
  return (
    <ThemeBackground>
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()}><Text style={{ color: theme.colors.text }}>← Back</Text></Pressable>
          <Text style={[styles.title, { color: theme.colors.text }]}>Settings</Text>
          <View style={{ width: 40 }} />
        </View>
        <Text style={[styles.section, { color: theme.colors.text }]}>Theme</Text>
        <ThemeSelector />
        <View style={styles.row}>
          <Text style={[styles.label, { color: theme.colors.text }]}>Music</Text>
          <View style={styles.muteRow}>
            <Text style={{ color: theme.colors.textSecondary }}>{muted ? "Muted" : "On"}</Text>
            <Switch value={!muted} onValueChange={(v) => setMuted(!v)} />
          </View>
        </View>
        <Pressable style={styles.link} onPress={() => router.push("/about")}><Text style={{ color: theme.colors.text }}>About</Text></Pressable>
        <Pressable style={styles.link}><Text style={{ color: theme.colors.textSecondary }}>Privacy Policy (placeholder)</Text></Pressable>
        <View style={styles.footer}>
          <Text style={{ color: theme.colors.textSecondary }}>{BRAND_NAME}</Text>
        </View>
      </View>
    </ThemeBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 40 },
  title: { fontSize: 22, fontWeight: "700" },
  section: { fontSize: 18, fontWeight: "700", marginTop: 20, marginBottom: 10 },
  row: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 20 },
  label: { fontSize: 16 },
  muteRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  link: { marginTop: 16 },
  footer: { position: "absolute", bottom: 12, left: 0, right: 0, alignItems: "center" },
});
