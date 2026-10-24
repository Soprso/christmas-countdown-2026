import { View, Text, Pressable, StyleSheet } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { Image } from "expo-image";
import { VideoView, useVideoPlayer } from "expo-video";
import { useEffect, useState } from "react";
import { downloadToGallery } from "../../services/wallpaperDownload";

export default function Preview() {
  const params = useLocalSearchParams<{ id: string; url: string; type: string; poster: string }>();
  const type = params.type === "video" ? "video" : "image";
  const url = Array.isArray(params.url) ? params.url[0] : params.url;
  const poster = Array.isArray(params.poster) ? params.poster[0] : params.poster;
  const [downloading, setDownloading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  let player: any = null;
  if (type === "video" && url) {
    try {
      player = useVideoPlayer({ uri: url }, (p: any) => {
        p.loop = true;
        p.play();
      });
    } catch {}
  }

  const handleDownload = async () => {
    if (!url) return;
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
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}><Text style={{ color: "#fff" }}>← Back</Text></Pressable>
        <Pressable onPress={handleDownload} disabled={downloading}>
          <Text style={{ color: downloading ? "#888" : "#ffd93b" }}>{downloading ? "Saving..." : "Download"}</Text>
        </Pressable>
      </View>
      <View style={styles.center}>
        {type === "image" ? (
          <Image source={{ uri: url }} style={styles.media} contentFit="contain" cachePolicy="memory-disk" />
        ) : (
          player ? <VideoView player={player} style={styles.media} /> : <View style={styles.media} />
        )}
      </View>
      {msg && <Text style={styles.msg}>{msg}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 16, marginTop: 40 },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  media: { width: "100%", height: "80%" },
  msg: { color: "#fff", textAlign: "center", marginBottom: 20 },
});
