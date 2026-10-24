import { View, StyleSheet } from "react-native";
import { ThemeBackground } from "../../components/ThemeBackground";
import { WallpaperGrid } from "../../components/WallpaperGrid";
import { useEffect, useRef, useState } from "react";
import { GalleryItem, getCachedManifest, setCachedManifest, isCacheFresh } from "../../services/manifestCache";
import { LoadingState, ErrorState } from "../../components/LoadingState";
import { Pressable, Text } from "react-native";
import { router } from "expo-router";
import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_FOLDER } from "../../constants/themes";
import Constants from "expo-constants";

const FETCH_TIMEOUT_MS = 10000;

export default function Gallery() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fetchingRef = useRef(false);
  const mountedRef = useRef(true);

  const fetchManifest = async (manifestUrl: string) => {
    if (fetchingRef.current) return;
    fetchingRef.current = true;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
    try {
      const res = await fetch(manifestUrl, { signal: controller.signal, headers: { "Accept": "application/json" } });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const list = Array.isArray((data as any)?.items) ? (data as any).items : Array.isArray(data) ? data : [];
      const normalized: GalleryItem[] = list
        .filter((it: any) => it && it.url && (it.resourceType === "image" || it.resourceType === "video"))
        .map((it: any) => ({
          id: String(it.id || it.publicId || Math.random().toString(36).slice(2)),
          publicId: it.publicId || it.id,
          resourceType: it.resourceType,
          url: it.url,
          posterUrl: it.posterUrl || null,
          width: it.width || null,
          height: it.height || null,
          format: it.format || null,
        }));
      if (!mountedRef.current) return;
      setItems(normalized);
      await setCachedManifest(normalized);
      setError(null);
    } catch (e: any) {
      // On failure, try to use cached data even if expired
      const cached = await getCachedManifest();
      if (cached?.items?.length && mountedRef.current) {
        setItems(cached.items);
        setError(null);
        return;
      }
      if (mountedRef.current) {
        setError(e?.name === "AbortError" ? "Request timed out" : "Failed to load manifest");
      }
    } finally {
      clearTimeout(timeout);
      fetchingRef.current = false;
      if (mountedRef.current) setLoading(false);
    }
  };

  const load = async () => {
    if (!mountedRef.current) return;
    setLoading(true);
    setError(null);
    const manifestUrl = (Constants.expoConfig?.extra as any)?.manifestUrl || (Constants.manifest as any)?.extra?.manifestUrl || "";
    try {
      const cached = await getCachedManifest();
      if (cached?.items?.length) {
        if (mountedRef.current) {
          setItems(cached.items);
        }
        if (isCacheFresh(cached.ts) || !manifestUrl) {
          if (mountedRef.current) setLoading(false);
          return;
        }
        // stale or refresh needed - refresh in background
        fetchManifest(manifestUrl);
        if (mountedRef.current) setLoading(false);
        return;
      }
      if (!manifestUrl) {
        if (mountedRef.current) {
          setItems([]);
          setError(null);
          setLoading(false);
        }
        return;
      }
      await fetchManifest(manifestUrl);
    } catch (e: any) {
      const cached = await getCachedManifest();
      if (cached?.items?.length && mountedRef.current) {
        setItems(cached.items);
        setError(null);
      } else if (mountedRef.current) {
        setError(e?.message || "Failed to load");
      }
      if (mountedRef.current) setLoading(false);
    }
  };

  useEffect(() => {
    mountedRef.current = true;
    load();
    return () => {
      mountedRef.current = false;
    };
  }, []);

  return (
    <ThemeBackground>
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()}><Text style={{ color: "#fff" }}>← Back</Text></Pressable>
          <Text style={styles.title}>Christmas Gallery</Text>
          <View style={{ width: 40 }} />
        </View>
        {loading && <LoadingState text="Loading gallery..." />}
        {!loading && items.length === 0 && !error && (
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No wallpapers found yet.</Text>
            <Text style={styles.emptySub}>Set "manifestUrl" in app.json extra to your backend endpoint, upload images/videos to Cloudinary folder "{CLOUDINARY_FOLDER}" under cloud "{CLOUDINARY_CLOUD_NAME}", and deploy the server.</Text>
          </View>
        )}
        {!loading && error && <ErrorState text={error} onRetry={load} />}
        {!loading && items.length > 0 && <WallpaperGrid items={items} />}
      </View>
    </ThemeBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 16, marginTop: 40 },
  title: { color: "#fff", fontSize: 20, fontWeight: "700" },
  empty: { flex: 1, alignItems: "center", justifyContent: "center", padding: 20 },
  emptyText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  emptySub: { color: "#e6e6e6", textAlign: "center", marginTop: 8 },
});
