import { useEffect, useState } from "react";
import { useHistoryStore } from "../../../context/HistoryContext";
import { Modal } from "../../atoms/Modal/Modal";
import "./WinnerModal.scss";
import { Header } from "../Header/Header";

export const WinnerModal = ({ onResetGame }) => {
  const { xWins, oWins, draws, clearHistory } = useHistoryStore();
  const [open, setOpen] = useState(false);
  const amountToWin = localStorage.getItem("amountToWin") || 1;

  const p1 = localStorage.getItem("p1") || "Player 1";
  const p2 = localStorage.getItem("p2") || "Player 2";

  useEffect(() => {
    if (xWins >= amountToWin || oWins >= amountToWin || draws >= amountToWin) {
      setOpen(true);
    }
  }, [xWins, oWins, draws]);

  const close = () => setOpen(false);
  const resetSeries = () => {
    clearHistory();
    onResetGame && onResetGame();
    setOpen(false);
  };

  const winnerKey =
    xWins >= amountToWin
      ? "x"
      : oWins >= amountToWin
      ? "o"
      : draws >= amountToWin
      ? "draw"
      : "";
  const winnerLabel = xWins >= amountToWin ? p1 : p2;

  return (
    <Modal open={open}>
      <div
        className={`content-modal-winner ${winnerKey ? `is-${winnerKey}` : ""}`}
      >
        <span className="emoji">🎉</span>
        <div className="content-modal-body">
          <h3 className="title">Parabéns, {winnerLabel}!</h3>
          <p className="description">
            Você atingiu {amountToWin} vitórias e <br /> venceu esta série.
          </p>
        </div>
        <Header />
        <button className="btn" onClick={resetSeries}>
          Jogar Novamente
        </button>
      </div>
    </Modal>
  );
};
