import AsyncStorage from "@react-native-async-storage/async-storage";

const MANIFEST_KEY = "@christmas/manifest";
const MANIFEST_TTL = 1000 * 60 * 60 * 6; // 6 hours

export interface GalleryItem {
  id: string;
  publicId?: string;
  resourceType: "image" | "video";
  url: string;
  posterUrl?: string;
  width?: number;
  height?: number;
  format?: string;
}

export async function getCachedManifest(): Promise<{ items: GalleryItem[]; ts: number } | null> {
  try {
    const raw = await AsyncStorage.getItem(MANIFEST_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed.items)) return parsed;
    return null;
  } catch {
    return null;
  }
}

export async function setCachedManifest(items: GalleryItem[]) {
  try {
    await AsyncStorage.setItem(MANIFEST_KEY, JSON.stringify({ items, ts: Date.now() }));
  } catch {}
}

export function isCacheFresh(ts?: number) {
  if (!ts) return false;
  return Date.now() - ts < MANIFEST_TTL;
}
