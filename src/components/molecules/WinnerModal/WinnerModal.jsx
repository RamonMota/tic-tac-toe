import { Modal } from "../../atoms/Modal/Modal";
import "./WinnerModal.scss";
import { Header } from "../Header/Header";
import { useGameSettings } from "../../../context/GameSettingsContext";

import { useHistoryStore } from "../../../context/HistoryContext";

export const WinnerModal = ({ open, onClose, onResetGame, onNewGame }) => {
  const { xWins, oWins } = useHistoryStore();
  const { amountToWin, p1, p2 } = useGameSettings();
  const newGame = () => onNewGame && onNewGame();
  const playAgain = () => {
    onResetGame && onResetGame();
    onClose && onClose();
  };

  let winnerKey = "";
  switch (true) {
    case xWins >= amountToWin:
      winnerKey = "x";
      break;
    case oWins >= amountToWin:
      winnerKey = "o";
      break;
    default:
      winnerKey = "";
  }

  let winnerLabel = "";
  switch (winnerKey) {
    case "x":
      winnerLabel = p1;
      break;
    case "o":
      winnerLabel = p2;
      break;
    default:
      winnerLabel = "";
  }

  return (
    <Modal open={open}>
      <div
        className={`content-modal-winner ${winnerKey ? `is-${winnerKey}` : ""}`}
      >
        <span className="emoji">🎉</span>
        <div className="content-modal-body">
          <h3 className="title">Parabéns, {winnerLabel}!</h3>
          <p className="description">
            Você atingiu {amountToWin} vitórias e <br /> venceu esta rodada.
          </p>
        </div>
        <Header />
        <div className="buttons-content">
          <button className="btn" onClick={playAgain}>
            Jogar Novamente
          </button>
          <button className="btn" onClick={newGame}>
            Novo Jogo
          </button>
        </div>
      </div>
    </Modal>
  );
};
