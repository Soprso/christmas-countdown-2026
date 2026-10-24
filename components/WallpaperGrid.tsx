import { FlatList, View, Pressable, StyleSheet, Dimensions } from "react-native";
import { Image } from "expo-image";
import { getGridMetrics, GRID_COLUMNS, GRID_SPACING, GRID_OUTER_PADDING } from "../constants/layout";
import { GalleryItem } from "../services/manifestCache";
import { router } from "expo-router";
import { useMemo } from "react";

export function WallpaperGrid({ items }: { items: GalleryItem[] }) {
  const { width } = Dimensions.get("window");
  const { cardWidth, cardHeightSmall, cardHeightLarge } = useMemo(() => getGridMetrics(width), [width]);

  const data = useMemo(() => {
    // Create a simple repeating bento pattern for stability
    const result: Array<GalleryItem & { h: number }> = [];
    items.forEach((it, idx) => {
      const h = idx % 5 === 0 || idx % 7 === 0 ? cardHeightLarge : cardHeightSmall;
      result.push({ ...it, h });
    });
    return result;
  }, [items, cardWidth, cardHeightSmall, cardHeightLarge]);

  const renderItem = ({ item }: { item: GalleryItem & { h: number } }) => (
    <Pressable
      style={[styles.card, { width: cardWidth, height: item.h, margin: GRID_SPACING / 2 }]}
      onPress={() => router.push({ pathname: "/gallery/[id]", params: { id: item.id, url: item.url, type: item.resourceType, poster: item.posterUrl || "" } })}
      accessibilityLabel="Open wallpaper preview"
    >
      <Image
        source={{ uri: item.resourceType === "image" ? item.url : item.posterUrl || item.url }}
        style={styles.img}
        contentFit="cover"
        cachePolicy="memory-disk"
        transition={200}
      />
      {item.resourceType === "video" && <View style={styles.playBadge} />}
    </Pressable>
  );

  return (
    <FlatList
      data={data}
      numColumns={GRID_COLUMNS}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      contentContainerStyle={{ padding: GRID_OUTER_PADDING }}
      columnWrapperStyle={{ justifyContent: "flex-start" }}
      initialNumToRender={12}
      maxToRenderPerBatch={12}
      windowSize={5}
      removeClippedSubviews={true}
    />
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: 10, overflow: "hidden", backgroundColor: "rgba(255,255,255,0.1)" },
  img: { width: "100%", height: "100%" },
  playBadge: {
    position: "absolute",
    right: 6,
    bottom: 6,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "rgba(0,0,0,0.6)",
  },
});
