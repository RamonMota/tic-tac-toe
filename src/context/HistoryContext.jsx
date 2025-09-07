import { createContext, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "history";

const HistoryContext = createContext({
  history: [],
  addResult: () => {},
  clearHistory: () => {},
  xWins: 0,
  oWins: 0,
  draws: 0,
});

export function HistoryProvider({ children }) {
  const [history, setHistory] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    } catch {}
  }, [history]);

  const addResult = (result) => setHistory((prev) => [...prev, result]);
  const clearHistory = () => setHistory([]);

  const stats = useMemo(() => {
    const xWins = history.filter((r) => r === "X").length;
    const oWins = history.filter((r) => r === "O").length;
    const draws = history.filter((r) => r === "draw").length;
    return { xWins, oWins, draws };
  }, [history]);

  const value = useMemo(
    () => ({ history, addResult, clearHistory, ...stats }),
    [history, stats]
  );

  return (
    <HistoryContext.Provider value={value}>{children}</HistoryContext.Provider>
  );
}

export function useHistoryStore() {
  return useContext(HistoryContext);
}