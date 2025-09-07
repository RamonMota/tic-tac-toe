import { createContext, useContext, useMemo, useState } from "react";

const GameSettingsContext = createContext({
  p1: "Player 1",
  p2: "Player 2",
  amountToWin: 1,
  setSettings: () => {},
});

export function GameSettingsProvider({ children }) {
  const [settings, setSettingsState] = useState(() => {
    try {
      const p1 = localStorage.getItem("p1") || "Player 1";
      const p2 = localStorage.getItem("p2") || "Player 2";
      const amountToWinRaw = localStorage.getItem("amountToWin");
      const amountToWin = amountToWinRaw ? Number(amountToWinRaw) : 1;
      return { p1, p2, amountToWin };
    } catch {
      return { p1: "Player 1", p2: "Player 2", amountToWin: 1 };
    }
  });

  const setSettings = ({ p1, p2, amountToWin }) => {
    setSettingsState((prev) => {
      const next = {
        p1: p1 ?? prev.p1,
        p2: p2 ?? prev.p2,
        amountToWin: amountToWin ?? prev.amountToWin,
      };
      try {
        localStorage.setItem("p1", next.p1);
        localStorage.setItem("p2", next.p2);
        localStorage.setItem("amountToWin", String(next.amountToWin));
      } catch {}
      return next;
    });
  };

  const value = useMemo(() => ({ ...settings, setSettings }), [settings]);

  return (
    <GameSettingsContext.Provider value={value}>
      {children}
    </GameSettingsContext.Provider>
  );
}

export function useGameSettings() {
  return useContext(GameSettingsContext);
}

