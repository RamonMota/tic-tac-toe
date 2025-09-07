import { useEffect, useState } from "react";
import { Modal } from "../../atoms/Modal/Modal";
import "./StartModal.scss";
import { useGameSettings } from "../../../context/GameSettingsContext";
import { ROUNDS_OPTIONS } from "../../../constants";

export const StartModal = ({ open, onClose, onSubmit }) => {
  const [selectedRound, setSelectedRound] = useState(null);
  const [p1Value, setP1Value] = useState("");
  const [p2Value, setP2Value] = useState("");
  const { setSettings } = useGameSettings();
  const close = () => {
    setP1Value("");
    setP2Value("");
    setSelectedRound(null);
    onClose && onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const p1 = String(formData.get("player1")).trim();
    const p2 = String(formData.get("player2")).trim();
    const rounds = Number(formData.get("rounds"));
    setSettings({ p1, p2, amountToWin: rounds });
    onSubmit && onSubmit({ p1, p2, amountToWin: rounds });
    close();
  };

  // Clear inputs whenever modal closes
  useEffect(() => {
    if (!open) {
      setP1Value("");
      setP2Value("");
      setSelectedRound(null);
    }
  }, [open]);

  return (
    <Modal open={open}>
      <div className="content-modal-start">
        <span className="emoji">🎮</span>
        <div className="content-modal-body">
          <h3 className="title">Bem Vindo ao Tic Tac Toe</h3>
          <p className="description">Preencha os campos para começar.</p>
        </div>
        <form onSubmit={handleSubmit} className="start-form">
          <div className="content-input-form">
            <label>Nome do P1</label>
            <input
              type="text"
              name="player1"
              required
              placeholder="-"
              maxLength={6}
              value={p1Value}
              onChange={(e) => setP1Value(e.target.value.slice(0, 6))}
            />
          </div>
          <div className="content-input-form">
            <label>Nome do P2</label>
            <input
              type="text"
              name="player2"
              required
              placeholder="-"
              maxLength={6}
              value={p2Value}
              onChange={(e) => setP2Value(e.target.value.slice(0, 6))}
            />
          </div>
          <div className="content-input-form">
            <label>Rodadas</label>
            <select
              name="rounds"
              required
              value={selectedRound ?? ""}
              onChange={(e) => setSelectedRound(e.target.value)}
            >
              <option value="" disabled>
                -
              </option>
              {ROUNDS_OPTIONS.map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>
          <div className="actions">
            <button type="submit" className="btn">
              Começar
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
