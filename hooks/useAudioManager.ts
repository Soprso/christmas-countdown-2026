import { useEffect, useRef, useState } from "react";
import { AppState } from "react-native";
import { Audio } from "expo-av";
import { useTheme } from "./useTheme";

export function useAudioManager() {
  const { theme, muted } = useTheme();
  const soundRef = useRef<Audio.Sound | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          staysActiveInBackground: false,
          playsInSilentModeIOS: true,
          shouldDuckAndroid: true,
          playThroughEarpieceAndroid: false,
        });
      } catch {}
    })();

    const sub = AppState.addEventListener("change", (state) => {
      if (state !== "active") {
        soundRef.current?.pauseAsync().catch(() => {});
      }
    });

    return () => {
      mounted = false;
      sub.remove();
    };
  }, []);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        if (soundRef.current) {
          await soundRef.current.unloadAsync().catch(() => {});
          soundRef.current = null;
        }
        const { sound } = await Audio.Sound.createAsync(theme.music, { isLooping: true, shouldPlay: !muted });
        if (!mounted) {
          await sound.unloadAsync().catch(() => {});
          return;
        }
        soundRef.current = sound;
        setReady(true);
      } catch {
        setReady(false);
      }
    })();
    return () => {
      mounted = false;
      soundRef.current?.unloadAsync().catch(() => {});
      soundRef.current = null;
    };
  }, [theme.id]);

  useEffect(() => {
    if (!soundRef.current) return;
    if (muted) {
      soundRef.current.pauseAsync().catch(() => {});
    } else {
      soundRef.current.playAsync().catch(() => {});
    }
  }, [muted]);

  return { ready };
}
