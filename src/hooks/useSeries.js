import { useEffect, useState } from "react";

export function useSeries({
  amountToWin,
  xWins,
  oWins,
  winner,
  resetBoard,
  clearHistory,
}) {
  const [isWinnerModalOpen, setIsWinnerModalOpen] = useState(false);

  useEffect(() => {
    if (xWins >= amountToWin || oWins >= amountToWin) {
      setIsWinnerModalOpen(true);
    }
  }, [xWins, oWins, amountToWin]);

  useEffect(() => {
    if (!winner) return;
    const t = setTimeout(() => {
      resetBoard();
    }, 1000);
    return () => clearTimeout(t);
  }, [winner, resetBoard]);

  const playAgain = () => {
    setIsWinnerModalOpen(false);
    clearHistory();
    resetBoard();
  };

  return { isWinnerModalOpen, setIsWinnerModalOpen, playAgain };
}
