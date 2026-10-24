import { useEffect, useRef, useState } from "react";
import { AppState } from "react-native";
import { createAudioPlayer, setAudioModeAsync } from "expo-audio";
import { useTheme } from "./useTheme";

export function useAudioManager() {
  const { theme, muted } = useTheme();
  const playerRef = useRef<any>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        await setAudioModeAsync({
          allowsRecording: false,
          playsInSilentMode: true,
          shouldPlayInBackground: false,
        } as any);
      } catch {}
    })();

    const sub = AppState.addEventListener("change", (state) => {
      if (state !== "active") {
        try {
          playerRef.current?.pause?.();
        } catch {}
      }
    });

    return () => {
      sub.remove();
    };
  }, []);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        if (playerRef.current) {
          try {
            playerRef.current.remove?.();
          } catch {}
          playerRef.current = null;
        }
        const player = createAudioPlayer(theme.music);
        if (!mounted) {
          try {
            player.remove?.();
          } catch {}
          return;
        }
        playerRef.current = player;
        try {
          player.loop = true;
        } catch {}
        if (!muted) {
          try {
            player.play?.();
          } catch {}
        }
        setReady(true);
      } catch {
        setReady(false);
      }
    })();
    return () => {
      mounted = false;
      try {
        playerRef.current?.remove?.();
      } catch {}
      playerRef.current = null;
    };
  }, [theme.id]);

  useEffect(() => {
    if (!playerRef.current) return;
    try {
      if (muted) {
        playerRef.current.pause?.();
      } else {
        playerRef.current.play?.();
      }
    } catch {}
  }, [muted]);

  return { ready };
}
