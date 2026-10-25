import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export const GRID_COLUMNS = 3;
export const GRID_SPACING = 6;
export const GRID_OUTER_PADDING = 12;
export const CARD_RADIUS = 12;

export function getGridMetrics(containerWidth?: number) {
  const w = containerWidth || width;
  const totalHorizontalSpacing = GRID_OUTER_PADDING * 2 + GRID_SPACING * (GRID_COLUMNS - 1);
  const cardWidth = Math.floor((w - totalHorizontalSpacing) / GRID_COLUMNS);
  const cardHeightSmall = Math.floor(cardWidth * 1.25);
  const cardHeightLarge = Math.floor(cardWidth * 1.6);
  return { cardWidth, cardHeightSmall, cardHeightLarge, totalHorizontalSpacing, gap: GRID_SPACING, padding: GRID_OUTER_PADDING };
}
