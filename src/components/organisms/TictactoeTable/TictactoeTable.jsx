import { useEffect, useState } from "react";
import { Square } from "../../atoms/Square/Square";
import { Icon } from "../../atoms/Icons/Icons";
import { useTicTacToe } from "../../../hooks/useTicTacToe";
import { useAutoplay } from "../../../hooks/useAutoplay";
import { useHistoryStore } from "../../../context/HistoryContext";
import { WinnerModal } from "../../molecules/WinnerModal/WinnerModal";
import { BtnAutoplay } from "../../atoms/btnAutoplay/BtnAutoplay";
import { StartModal } from "../../molecules/StartModal/StartModal";
import { CurrectPlayer } from "../../atoms/CurrectPlayer/CurrectPlayer";
import "./TctactoeTable.scss";

export const TictactoeTable = () => {
  const [isAutoplay, setIsAutoplay] = useState(
    () => localStorage.getItem("autoplay") === "true"
  );
  const [isStartModalOpen, setIsStartModalOpen] = useState(false);
  const intervalAutopllay = 5000;

  useEffect(() => {
    try {
      localStorage.setItem("autoplay", String(isAutoplay));
    } catch {}
  }, [isAutoplay]);

  const { addResult } = useHistoryStore();

  const { board, currentPlayer, winner, isDraw, winningLine, play, reset } =
    useTicTacToe({
      onGameOver: (result) => {
        addResult(result);
      },
    });

  const { countdown, restartCountdown } = useAutoplay({
    enabled: isAutoplay,
    intervalMs: intervalAutopllay,
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

  const handleRestart = () => {
    setIsStartModalOpen(true);
  };

  return (
    <>
      <WinnerModal onResetGame={reset} />
      <StartModal open={isStartModalOpen} />
      <div className="board-container">
        <div className="board" role="grid" aria-label="tabuleiro">
          {board.map((value, i) => {
            const isWinning = winningLine?.includes(i);
            return (
              <Square
                key={i}
                value={value}
                isWinning={!!isWinning}
                onClick={() => handleClick(i)}
                ariaLabel={`casa ${i + 1}${value ? `: ${value}` : ""}`}
                disabled={!!winner || !!value}
              />
            );
          })}
        </div>
        <span className="board-footer" />
      </div>
      <CurrectPlayer
        winner={winner}
        isDraw={isDraw}
        currentPlayer={currentPlayer}
      />
      <div className="flex-row">
        <BtnAutoplay
          isAutoplay={isAutoplay}
          countdown={countdown}
          onToggle={handleAutoplay}
        />
        <button type="button" className="btn" onClick={handleRestart}>
          <Icon name={"rotate"} />
          Reiniciar
        </button>
      </div>
    </>
  );
};
