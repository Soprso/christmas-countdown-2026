import { useEffect, useState } from "react";

function getTimeRemaining(target: Date) {
  const now = new Date();
  const diff = target.getTime() - now.getTime();
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, totalMs: 0, finished: true };
  }
  const seconds = Math.floor((diff / 1000) % 60);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  return { days, hours, minutes, seconds, totalMs: diff, finished: false };
}

export function useCountdown() {
  const [target] = useState(() => {
    // December 25, 2026 at 00:00:00 in device local timezone
    const d = new Date(2026, 11, 25, 0, 0, 0);
    return d;
  });
  const [time, setTime] = useState(getTimeRemaining(target));

  useEffect(() => {
    const id = setInterval(() => {
      setTime(getTimeRemaining(target));
    }, 1000);
    return () => clearInterval(id);
  }, [target]);

  return { ...time, target };
}
