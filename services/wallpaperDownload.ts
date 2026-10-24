import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";

export async function downloadToGallery(url: string, filename: string) {
  const dir = (FileSystem as any).cacheDirectory || (FileSystem as any).documentDirectory;
  if (!dir) throw new Error("No cache directory");
  const fileUri = dir + filename.replace(/[^a-zA-Z0-9._-]/g, "_");
  const downloadResumable = FileSystem.createDownloadResumable(url, fileUri);
  const result = await downloadResumable.downloadAsync();
  if (!result?.uri) throw new Error("Download failed");
  const { status } = await MediaLibrary.requestPermissionsAsync(false);
  if (status !== "granted") {
    throw new Error("Permission denied");
  }
  const asset = await MediaLibrary.createAssetAsync(result.uri);
  try {
    await MediaLibrary.createAlbumAsync("Christmas Countdown", asset, false);
  } catch {}
  return { uri: result.uri, asset };
}
