import { X } from "../X/X";
import { O } from "../O/O";

export const CurrectPlayer = ({ winner, isDraw, currentPlayer }) => {
  const isActive = !winner && !isDraw;
  return (
    <div
      className="status-bar-temp"
      style={{ height: isActive ? "20px" : "0" }}
    >
      {isActive ? (currentPlayer === "X" ? <X /> : <O />) : null}
    </div>
  );
};
