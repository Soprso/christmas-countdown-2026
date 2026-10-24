// import { Asset } from "expo-asset";

export type ThemeId = "jinglebells" | "merrychristmas" | "rudolphreindeer" | "silentnight";

export interface Theme {
  id: ThemeId;
  name: string;
  background: any;
  music: any;
  colors: {
    primary: string;
    accent: string;
    text: string;
    textSecondary: string;
    overlay: string;
  };
}

export const THEMES: Record<ThemeId, Theme> = {
  jinglebells: {
    id: "jinglebells",
    name: "Jingle Bells",
    background: require("../assets/images/jinglebells.png"),
    music: require("../assets/sounds/jinglebells.mp3"),
    colors: {
      primary: "#0f3d2e",
      accent: "#1f9d6b",
      text: "#ffffff",
      textSecondary: "#e6fff7",
      overlay: "rgba(15, 61, 46, 0.55)",
    },
  },
  merrychristmas: {
    id: "merrychristmas",
    name: "Merry Christmas",
    background: require("../assets/images/merrychristmas.png"),
    music: require("../assets/sounds/merrychristmas.mp3"),
    colors: {
      primary: "#7c1c2b",
      accent: "#d62828",
      text: "#ffffff",
      textSecondary: "#ffe6ea",
      overlay: "rgba(124, 28, 43, 0.55)",
    },
  },
  rudolphreindeer: {
    id: "rudolphreindeer",
    name: "Rudolph Reindeer",
    background: require("../assets/images/rudolphreindeer.png"),
    music: require("../assets/sounds/rudolphreindeer.mp3"),
    colors: {
      primary: "#8c2f2f",
      accent: "#e76f51",
      text: "#ffffff",
      textSecondary: "#fff3e6",
      overlay: "rgba(140, 47, 47, 0.55)",
    },
  },
  silentnight: {
    id: "silentnight",
    name: "Silent Night",
    background: require("../assets/images/silentnight.png"),
    music: require("../assets/sounds/silentnight.mp3"),
    colors: {
      primary: "#061826",
      accent: "#1f4e79",
      text: "#ffffff",
      textSecondary: "#dceefb",
      overlay: "rgba(6, 24, 38, 0.6)",
    },
  },
};

export const THEME_ORDER: ThemeId[] = ["jinglebells", "merrychristmas", "rudolphreindeer", "silentnight"];
export const TARGET_DATE_ISO = "2026-12-25T00:00:00";
export const BRAND_NAME = "Christmas Countdown by Shadow Studio Labs";
export const CLOUDINARY_CLOUD_NAME = "yi5vd8rs";
export const CLOUDINARY_FOLDER = "Christmas";
