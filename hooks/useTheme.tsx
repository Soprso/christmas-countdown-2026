import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";
import { ThemeId, THEMES } from "../constants/themes";

interface ThemeContextType {
  themeId: ThemeId;
  setThemeId: (id: ThemeId) => Promise<void>;
  theme: typeof THEMES[ThemeId];
  muted: boolean;
  setMuted: (m: boolean) => Promise<void>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
const THEME_KEY = "@christmas/theme";
const MUTE_KEY = "@christmas/muted";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeId, setThemeIdState] = useState<ThemeId>("jinglebells");
  const [muted, setMutedState] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const t = await AsyncStorage.getItem(THEME_KEY);
        if (t && (t === "jinglebells" || t === "merrychristmas" || t === "rudolphreindeer" || t === "silentnight")) {
          setThemeIdState(t as ThemeId);
        }
        const m = await AsyncStorage.getItem(MUTE_KEY);
        if (m !== null) setMutedState(m === "true");
      } catch {}
    })();
  }, []);

  const setThemeId = async (id: ThemeId) => {
    setThemeIdState(id);
    try {
      await AsyncStorage.setItem(THEME_KEY, id);
    } catch {}
  };

  const setMuted = async (m: boolean) => {
    setMutedState(m);
    try {
      await AsyncStorage.setItem(MUTE_KEY, m ? "true" : "false");
    } catch {}
  };

  return (
    <ThemeContext.Provider value={{ themeId, setThemeId, theme: THEMES[themeId], muted, setMuted }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
