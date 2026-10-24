import { Pressable, Text, View, StyleSheet } from "react-native";
import { useTheme } from "../hooks/useTheme";
import { THEMES, THEME_ORDER, ThemeId } from "../constants/themes";

export function ThemeSelector({ onChange }: { onChange?: (id: ThemeId) => void }) {
  const { themeId, setThemeId } = useTheme();
  return (
    <View style={styles.grid}>
      {THEME_ORDER.map((id) => {
        const t = THEMES[id];
        const selected = themeId === id;
        return (
          <Pressable
            key={id}
            onPress={async () => {
              await setThemeId(id);
              onChange?.(id);
            }}
            style={[styles.tile, selected && styles.selected]}
            accessibilityLabel={`Select ${t.name} theme`}
          >
            <View style={styles.thumbWrap}>
              <View style={styles.thumb} />
              <Text style={styles.name}>{t.name}</Text>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 10, justifyContent: "center" },
  tile: { width: "46%", borderRadius: 12, borderWidth: 2, borderColor: "rgba(255,255,255,0.4)", overflow: "hidden" },
  selected: { borderColor: "#ffd93b" },
  thumbWrap: { backgroundColor: "rgba(0,0,0,0.35)", padding: 10, alignItems: "center" },
  thumb: { width: "100%", height: 70, borderRadius: 8, backgroundColor: "rgba(255,255,255,0.2)" },
  name: { color: "#fff", marginTop: 6, fontWeight: "600" },
});
