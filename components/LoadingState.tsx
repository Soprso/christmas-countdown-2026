import { View, Text, StyleSheet } from "react-native";

export function LoadingState({ text = "Loading..." }: { text?: string }) {
  return (
    <View style={styles.center}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

export function ErrorState({ text = "Something went wrong", onRetry }: { text?: string; onRetry?: () => void }) {
  return (
    <View style={styles.center}>
      <Text style={styles.text}>{text}</Text>
      {onRetry && <Text style={styles.retry} onPress={onRetry}>Retry</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  text: { color: "#fff" },
  retry: { color: "#ffd93b", marginTop: 10 },
});
