import { O } from "../O/O";
import { X } from "../X/X";
import "./Square.scss";

export const Square = ({
  value,
  onClick,
  isWinning = false,
  disabled = false,
  ariaLabel,
}) => {
  const className = `square${isWinning ? " winner" : ""}`;
  const content = value === "X" ? <X /> : value === "O" ? <O /> : null;

  return (
    <button
      type="button"
      className={className}
      onClick={onClick}
      aria-label={ariaLabel}
      disabled={disabled}
    >
      {content}
    </button>
  );
};
