import { View, Text, StyleSheet } from "react-native";
import { useCountdown } from "../hooks/useCountdown";
import { useTheme } from "../hooks/useTheme";

function Box({ label, value }: { label: string; value: number }) {
  const { theme } = useTheme();
  return (
    <View style={[styles.box, { backgroundColor: "rgba(0,0,0,0.35)", borderColor: "rgba(255,255,255,0.4)" }]}>
      <Text style={[styles.num, { color: theme.colors.text, fontFamily: "System" }]}>{String(value).padStart(2, "0")}</Text>
      <Text style={[styles.label, { color: theme.colors.textSecondary }]}>{label}</Text>
    </View>
  );
}

export function Countdown() {
  const { days, hours, minutes, seconds, finished } = useCountdown();
  const { theme } = useTheme();
  if (finished) {
    return (
      <View style={styles.wrap}>
        <Text style={[styles.finished, { color: theme.colors.text }]}>Merry Christmas!</Text>
      </View>
    );
  }
  return (
    <View style={styles.row}>
      <Box label="Days" value={days} />
      <Box label="Hours" value={hours} />
      <Box label="Minutes" value={minutes} />
      <Box label="Seconds" value={seconds} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", gap: 8, justifyContent: "center", alignItems: "center" },
  box: { paddingVertical: 10, paddingHorizontal: 12, borderRadius: 10, alignItems: "center", minWidth: 70, borderWidth: 1 },
  num: { fontSize: 22, fontWeight: "700" },
  label: { fontSize: 11, marginTop: 2, textTransform: "uppercase" },
  wrap: { alignItems: "center" },
  finished: { fontSize: 28, fontWeight: "800" },
});
