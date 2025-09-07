import { useEffect, useState } from "react";
import { Square } from "../../atoms/Square/Square";
import { X } from "../../atoms/X/X";
import { O } from "../../atoms/O/O";
import "./TctactoeTable.scss";
import { Icon } from "../../atoms/Icons/Icons";
import { useTicTacToe } from "../../../hooks/useTicTacToe";
import { useAutoplay } from "../../../hooks/useAutoplay";
import { useHistoryStore } from "../../../context/HistoryContext";
import { BtnAutoplay } from "../../atoms/btnAutoplay/BtnAutoplay";

export const TictactoeTable = () => {
  const [isAutoplay, setIsAutoplay] = useState(
    () => localStorage.getItem("autoplay") === "true"
  );
  const intervalAutopllay = 5000;

  const { addResult } = useHistoryStore();

  useEffect(() => {
    try {
      localStorage.setItem("autoplay", String(isAutoplay));
    } catch {}
  }, [isAutoplay]);

  const { board, currentPlayer, winner, isDraw, winningLine, play, reset } =
    useTicTacToe({
      onGameOver: (result) => {
        addResult(result);
      },
    });

  const handleClick = (index) => {
    const didPlay = play(index);
    if (didPlay) restart();
  };

  const { countdown, restart } = useAutoplay({
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

  const handleAutoplay = () => {
    setIsAutoplay((prev) => !prev);
  };

  return (
    <>
      <div className="board-container">
        <div className="board" role="grid" aria-label="tabuleiro">
          {board.map((value, i) => {
            const isWinning = winningLine?.includes(i);
            const content =
              value === "X" ? <X /> : value === "O" ? <O /> : null;
            return (
              <Square
                key={i}
                value={content}
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
      <div
        className="status-bar-temp"
        style={{ height: !winner && !isDraw ? "20px" : "0" }}
      >
        {!winner && !isDraw ? currentPlayer === "X" ? <X /> : <O /> : null}
      </div>
      <div className="flex-row">
        <BtnAutoplay
          isAutoplay={isAutoplay}
          countdown={countdown}
          onToggle={handleAutoplay}
        />
        <button type="button" className="btn" onClick={reset}>
          <Icon name={"rotate"} />
          Reiniciar
        </button>
      </div>
    </>
  );
};
