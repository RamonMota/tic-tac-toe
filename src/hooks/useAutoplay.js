import { useEffect, useMemo, useState } from "react";

export function useAutoplay({ enabled, intervalMs = 5000, canPlay, onAutoMove }) {
  const initial = useMemo(() => Math.max(1, Math.round(intervalMs / 1000)), [intervalMs]);
  const [countdown, setCountdown] = useState(initial);

  useEffect(() => {
    if (!enabled || !canPlay) {
      setCountdown(initial);
    }
  }, [enabled, canPlay, initial]);


  useEffect(() => {
    if (!enabled || !canPlay) return;
    const id = setInterval(() => {
      setCountdown((c) => Math.max(0, c - 1));
    }, 1000);
    return () => clearInterval(id);
  }, [enabled, canPlay]);

  useEffect(() => {
    if (!enabled || !canPlay) return;
    if (countdown === 0) {
      onAutoMove && onAutoMove();
      setCountdown(initial);
    }
  }, [countdown, enabled, canPlay, onAutoMove, initial]);

  const restartCountdown = () => setCountdown(initial);

  return { countdown, restartCountdown };
}
