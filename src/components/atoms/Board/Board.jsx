import { Square } from "../Square/Square";

export const Board = ({ board, winningLine, winner, onClick }) => {
  return (
    <div className="board" role="grid" aria-label="tabuleiro">
      {board.map((value, i) => {
        const isWinning = winningLine?.includes(i);
        return (
          <Square
            key={i}
            value={value}
            isWinning={!!isWinning}
            onClick={() => onClick(i)}
            ariaLabel={`casa ${i + 1}${value ? `: ${value}` : ""}`}
            disabled={!!winner || !!value}
          />
        );
      })}
    </div>
  );
};

