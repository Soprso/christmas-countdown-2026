import { View, Text, StyleSheet } from "react-native";
import { useCountdown } from "../hooks/useCountdown";
import { Fonts } from "../hooks/useFonts";

function Box({ label, value }: { label: string; value: number }) {
  return (
    <View style={styles.box}>
      <Text style={styles.num}>{String(value).padStart(2, "0")}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

export function Countdown() {
  const { days, hours, minutes, seconds, finished } = useCountdown();
  if (finished) {
    return (
      <View style={styles.wrap}>
        <Text style={styles.finished}>Merry Christmas!</Text>
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
  box: { paddingVertical: 12, paddingHorizontal: 14, borderRadius: 12, alignItems: "center", minWidth: 74, borderWidth: 1.5, borderColor: "#d4af37", backgroundColor: "rgba(0,0,0,0.45)" },
  num: { fontSize: 26, fontFamily: Fonts.display, color: "#f5f3ee" },
  label: { fontSize: 9, marginTop: 2, textTransform: "uppercase", letterSpacing: 1, color: "#f5f3ee" },
  wrap: { alignItems: "center" },
  finished: { fontSize: 28, fontFamily: Fonts.display, color: "#f5f3ee" },
});
