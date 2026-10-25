import { View, Text, Pressable, StyleSheet, Image } from "react-native";
import { ThemeBackground } from "../components/ThemeBackground";
import { router } from "expo-router";
import Constants from "expo-constants";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function About() {
  const version = Constants.expoConfig?.version || "1.0.0";
  const insets = useSafeAreaInsets();
  return (
    <ThemeBackground>
      <View style={[styles.container, { paddingTop: insets.top + 8 }]}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backBtn} accessibilityLabel="Back" hitSlop={8}>
            <Text style={{ color: "#f5f3ee", fontSize: 18 }}>←</Text>
          </Pressable>
          <Text style={styles.title}>About</Text>
          <View style={{ width: 44 }} />
        </View>
        <View style={styles.content}>
          <Image source={require("../assets/images/logo.png")} style={styles.logo} />
          <Text style={styles.appName}>Christmas Countdown 2026</Text>
          <Text style={styles.subtitle}>Developer: Shadow Studio Labs</Text>
          <Text style={styles.desc}>
            A festive countdown to Christmas with four themes, background music, and a downloadable Christmas wallpaper gallery.
          </Text>
          <Text style={styles.info}>Version: {version}</Text>
          <Text style={styles.link}>Privacy Policy (placeholder)</Text>
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
  content: { alignItems: "center", marginTop: 40, gap: 12 },
  logo: { width: 90, height: 90, borderRadius: 18 },
  appName: { color: "#f5f3ee", fontSize: 24, fontWeight: "900", textAlign: "center" },
  subtitle: { color: "#f5f3ee", opacity: 0.9 },
  desc: { color: "#f5f3ee", textAlign: "center", marginTop: 8, lineHeight: 22, paddingHorizontal: 12 },
  info: { color: "#f5f3ee", marginTop: 16 },
  link: { color: "#d4af37", marginTop: 12 },
});
