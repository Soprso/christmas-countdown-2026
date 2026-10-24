import { View, Text, Pressable, StyleSheet } from "react-native";
import { ThemeBackground } from "../components/ThemeBackground";
import { useTheme } from "../hooks/useTheme";
import { router } from "expo-router";
import Constants from "expo-constants";

export default function About() {
  const { theme } = useTheme();
  const version = Constants.expoConfig?.version || "1.0.0";
  return (
    <ThemeBackground>
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()}><Text style={{ color: theme.colors.text }}>← Back</Text></Pressable>
          <Text style={[styles.title, { color: theme.colors.text }]}>About</Text>
          <View style={{ width: 40 }} />
        </View>
        <View style={styles.content}>
          <Text style={[styles.appName, { color: theme.colors.text }]}>Christmas Countdown</Text>
          <Text style={{ color: theme.colors.textSecondary, marginTop: 4 }}>Developer: Shadow Studio Labs</Text>
          <Text style={[styles.desc, { color: theme.colors.textSecondary }]}>
            A festive countdown to Christmas with four themes, background music, and a downloadable wallpaper gallery.
          </Text>
          <Text style={{ color: theme.colors.textSecondary, marginTop: 12 }}>Version: {version}</Text>
          <Text style={{ color: theme.colors.textSecondary, marginTop: 20 }}>Privacy Policy (placeholder)</Text>
        </View>
      </View>
    </ThemeBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 40 },
  title: { fontSize: 22, fontWeight: "700" },
  content: { marginTop: 30 },
  appName: { fontSize: 24, fontWeight: "800" },
  desc: { marginTop: 12, lineHeight: 20 },
});
