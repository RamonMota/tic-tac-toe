import { useEffect, useState } from "react";

export function useSeries({
  amountToWin,
  xWins,
  oWins,
  winner,
  isDraw,
  resetBoard,
  clearHistory,
}) {
  const [isWinnerModalOpen, setIsWinnerModalOpen] = useState(false);

  useEffect(() => {
    if (xWins >= amountToWin || oWins >= amountToWin) {
      setTimeout(() => setIsWinnerModalOpen(true), 1000);
    }
  }, [xWins, oWins, amountToWin]);

  useEffect(() => {
    if (!winner && !isDraw) return;
    setTimeout(() => {
      resetBoard();
    }, 1000);
  }, [winner, isDraw]);

  const playAgain = () => {
    setIsWinnerModalOpen(false);
    clearHistory();
    resetBoard();
  };

  return { isWinnerModalOpen, setIsWinnerModalOpen, playAgain };
}
