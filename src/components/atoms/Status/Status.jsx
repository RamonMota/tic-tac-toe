import { CurrentPlayer } from "../CurrentPlayer/CurrentPlayer";

export const Status = ({ winner, isDraw, currentPlayer }) => {
  return (
    <CurrentPlayer winner={winner} isDraw={isDraw} currentPlayer={currentPlayer} />
  );
};

