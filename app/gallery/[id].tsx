import { View, Text, Pressable, StyleSheet } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { Image } from "expo-image";
import { VideoView, useVideoPlayer } from "expo-video";
import { useState } from "react";
import { downloadToGallery } from "../../services/wallpaperDownload";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Preview() {
  const params = useLocalSearchParams<{ id: string; url: string; type: string; poster: string }>();
  const type = params.type === "video" ? "video" : "image";
  const url = Array.isArray(params.url) ? params.url[0] : params.url;
  const poster = Array.isArray(params.poster) ? params.poster[0] : params.poster;
  const [downloading, setDownloading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const insets = useSafeAreaInsets();

  let player: any = null;
  if (type === "video" && url) {
    try {
      player = useVideoPlayer({ uri: url }, (p: any) => {
        p.loop = true;
        p.muted = true;
        p.play();
      });
    } catch {}
  }

  const handleDownload = async () => {
    if (!url || downloading) return;
    setDownloading(true);
    setMsg(null);
    try {
      const ext = type === "video" ? "mp4" : "jpg";
      const filename = `christmas_${Date.now()}.${ext}`;
      await downloadToGallery(url, filename);
      setMsg("Saved to gallery");
    } catch (e: any) {
      setMsg(e?.message || "Download failed");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <Pressable onPress={() => router.back()} style={styles.backBtn} accessibilityLabel="Back" hitSlop={8}>
          <Text style={{ color: "#f5f3ee", fontSize: 18 }}>←</Text>
        </Pressable>
        <View style={{ width: 44 }} />
      </View>
      <View style={styles.center}>
        {type === "image" ? (
          <Image source={{ uri: url }} style={styles.media} contentFit="contain" cachePolicy="memory-disk" />
        ) : (
          player ? <VideoView player={player} style={styles.media} /> : <View style={styles.media} />
        )}
      </View>
      <View style={[styles.actions, { paddingBottom: insets.bottom + 16 }]}>
        <Pressable style={[styles.downloadBtn, downloading && styles.downloadBtnDisabled]} onPress={handleDownload} disabled={downloading}>
          <Text style={styles.downloadText}>{downloading ? "DOWNLOADING..." : "DOWNLOAD WALLPAPER"}</Text>
        </Pressable>
        {msg && <Text style={styles.msg}>{msg}</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 16, paddingBottom: 8 },
  backBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: "rgba(0,0,0,0.5)", borderWidth: 1, borderColor: "#d4af37", alignItems: "center", justifyContent: "center" },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  media: { width: "100%", height: "78%" },
  actions: { paddingHorizontal: 16, alignItems: "center", gap: 8 },
  downloadBtn: { width: "100%", backgroundColor: "#7c1c2b", paddingVertical: 14, borderRadius: 14, borderWidth: 1, borderColor: "#d4af37", alignItems: "center" },
  downloadBtnDisabled: { opacity: 0.6 },
  downloadText: { color: "#f5f3ee", fontWeight: "800", letterSpacing: 1 },
  msg: { color: "#f5f3ee", textAlign: "center" },
});
