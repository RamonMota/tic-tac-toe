import { useEffect, useRef, useState } from "react";

export const Countdown = ({ ms }) => {
  const [remaining, setRemaining] = useState(ms);
  const startRef = useRef(Date.now());
  const intervalRef = useRef(null);

  useEffect(() => {
    setRemaining(ms);
    startRef.current = Date.now();
  }, [ms]);

  useEffect(() => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startRef.current;
      const next = Math.max(0, ms - elapsed);
      setRemaining(next);
      if (next === 0) {
        // auto-restart
        startRef.current = Date.now();
        setRemaining(ms);
      }
    }, 200);
    return () => clearInterval(intervalRef.current);
  }, [ms]);

  const seconds = Math.ceil(remaining / 1000);

  return <span>{seconds}s</span>;
};
