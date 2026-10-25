import { View, Text, StyleSheet } from "react-native";
import { useCountdown } from "../hooks/useCountdown";
import { useTheme } from "../hooks/useTheme";

function Box({ label, value }: { label: string; value: number }) {
  const { theme } = useTheme();
  return (
    <View style={[styles.box, { backgroundColor: "rgba(0,0,0,0.45)", borderColor: "#d4af37" }]}>
      <Text style={[styles.num, { color: "#f5f3ee" }]}>{String(value).padStart(2, "0")}</Text>
      <Text style={[styles.label, { color: "#f5f3ee" }]}>{label}</Text>
    </View>
  );
}

export function Countdown() {
  const { days, hours, minutes, seconds, finished } = useCountdown();
  const { theme } = useTheme();
  if (finished) {
    return (
      <View style={styles.wrap}>
        <Text style={[styles.finished, { color: "#f5f3ee" }]}>Merry Christmas!</Text>
      </View>
    );
  }
  return (
    <View style={styles.row}>
      <Box label="DAYS" value={days} />
      <Box label="HOURS" value={hours} />
      <Box label="MINUTES" value={minutes} />
      <Box label="SECONDS" value={seconds} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", gap: 10, justifyContent: "center", alignItems: "center", flexWrap: "wrap" },
  box: { paddingVertical: 12, paddingHorizontal: 14, borderRadius: 12, alignItems: "center", minWidth: 74, borderWidth: 1.5 },
  num: { fontSize: 24, fontWeight: "800" },
  label: { fontSize: 10, marginTop: 3, textTransform: "uppercase", letterSpacing: 1 },
  wrap: { alignItems: "center" },
  finished: { fontSize: 28, fontWeight: "800" },
});
