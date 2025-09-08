import { useEffect, useState } from "react";
import { useTicTacToe } from "../../../hooks/useTicTacToe";
import { useAutoplay } from "../../../hooks/useAutoplay";
import { useHistoryStore } from "../../../context/HistoryContext";
import { WinnerModal } from "../../molecules/WinnerModal/WinnerModal";
import { StartModal } from "../../molecules/StartModal/StartModal";
import { useGameSettings } from "../../../context/GameSettingsContext";
import { AUTOPLAY_INTERVAL_MS } from "../../../constants";
import { storage } from "../../../services/storage";
import { Board } from "../../atoms/Board/Board";
import { Controls } from "../../atoms/Controls/Controls";
import { useSeries } from "../../../hooks/useSeries";
import { useRequiresSetup } from "../../../hooks/useRequiresSetup";
import "./TictactoeTable.scss";
import { CurrentPlayer } from "../../atoms/CurrentPlayer/CurrentPlayer";

export const TictactoeTable = () => {
  const [isAutoplay, setIsAutoplay] = useState(
    () => storage.get("autoplay") === "true"
  );
  const { amountToWin } = useGameSettings();
  const requiresSetup = useRequiresSetup();
  const [isStartModalOpen, setIsStartModalOpen] = useState(() => requiresSetup);
  const { addResult, clearHistory, xWins, oWins } = useHistoryStore();

  useEffect(() => {
    storage.set("autoplay", String(isAutoplay));
  }, [isAutoplay]);

  const {
    board,
    currentPlayer,
    winner,
    isDraw,
    winningLine,
    play,
    resetBoard,
  } = useTicTacToe({
    onGameOver: (result) => {
      addResult(result);
    },
  });

  const { isWinnerModalOpen, setIsWinnerModalOpen, playAgain } = useSeries({
    amountToWin,
    xWins,
    oWins,
    winner,
    resetBoard,
    clearHistory,
  });

  const { countdown, restartCountdown } = useAutoplay({
    enabled: isAutoplay,
    intervalMs: AUTOPLAY_INTERVAL_MS,
    canPlay: !winner && !isDraw,
    onAutoMove: () => {
      const emptySquares = board
        .map((v, idx) => (v == null ? idx : null))
        .filter((v) => v !== null);
      if (emptySquares.length === 0) return;
      const randomIndex =
        emptySquares[Math.floor(Math.random() * emptySquares.length)];
      play(randomIndex);
    },
  });

  const handleClick = (index) => {
    const didPlay = play(index);
    if (didPlay) restartCountdown();
  };

  const handleAutoplay = () => {
    setIsAutoplay((prev) => !prev);
  };

  const startNewGame = () => {
    resetBoard();
    clearHistory();
  };

  const newGame = () => {
    setIsStartModalOpen(true);
    setIsWinnerModalOpen(false);
    clearHistory();
  };

  return (
    <>
      <WinnerModal
        open={isWinnerModalOpen}
        onClose={playAgain}
        onResetGame={resetBoard}
        onNewGame={newGame}
      />
      <StartModal
        open={isStartModalOpen}
        onClose={() => setIsStartModalOpen(false)}
        onSubmit={startNewGame}
      />
      <div className="board-container">
        <Board
          board={board}
          winningLine={winningLine}
          winner={winner}
          onClick={handleClick}
        />
        <span className="board-footer" />
      </div>
      <CurrentPlayer winner={winner} isDraw={isDraw} currentPlayer={currentPlayer} />
      <Controls 
        isAutoplay={isAutoplay}
        countdown={countdown}
        onToggleAutoplay={handleAutoplay}
        onRestart={newGame}
      />
    </>
  );
};
