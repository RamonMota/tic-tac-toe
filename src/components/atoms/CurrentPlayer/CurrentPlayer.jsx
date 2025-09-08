import { X } from "../X/X";
import { O } from "../O/O";
import "./CurrentPlayer.scss";

export const CurrentPlayer = ({ winner, isDraw, currentPlayer }) => {
  const isActive = !winner && !isDraw;
  return (
    <div className="status-bar-temp">
      {isActive ? currentPlayer === "X" ? <X /> : <O /> : null}
    </div>
  );
};
