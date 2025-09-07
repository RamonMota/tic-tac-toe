import { use, useEffect, useState } from "react";
import { Modal } from "../../atoms/Modal/Modal";
import "./StartModal.scss";

export const StartModal = ({ open: openModal }) => {
  const [open, setOpen] = useState();
  const [selectedRound, setSelectedRound] = useState(null);
  const hasAmountToWin = Boolean(localStorage.getItem("amountToWin"));
  const close = () => setOpen(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    localStorage.setItem("p1", formData.get("player1"));
    localStorage.setItem("p2", formData.get("player2"));
    localStorage.setItem("amountToWin", formData.get("rounds"));
    onClose()
    close();
  };

  useEffect(() => {
    if (hasAmountToWin) setOpen(false);
    else setOpen(true);
  }, []);

  useEffect(() => {
    if (openModal) setOpen(true);
  }, [openModal]);

  return (
    <Modal open={open}>
      <div className="content-modal-winner">
        <span className="emoji">🎮</span>
        <div className="content-modal-body">
          <h3 className="title">Bem Vindo ao Tic Tac Toe</h3>
          <p className="description">Preencha os campos para começar.</p>
        </div>
        <form onSubmit={handleSubmit} className="start-form">
          <div className="content-input-form">
            <label>Nome do P1</label>
            <input type="text" name="player1" required placeholder="-" />
          </div>
          <div className="content-input-form">
            <label>Nome do P2</label>
            <input type="text" name="player2" required placeholder="-" />
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
              {[1, 3, 5, 7, 9, 11].map((num) => (
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
