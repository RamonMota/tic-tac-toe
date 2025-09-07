import { BtnAutoplay } from "../btnAutoplay/BtnAutoplay";
import { Icon } from "../Icons/Icons";

export const Controls = ({ isAutoplay, countdown, onToggleAutoplay, onRestart }) => {
  return (
    <div className="flex-row">
      <BtnAutoplay isAutoplay={isAutoplay} countdown={countdown} onToggle={onToggleAutoplay} />
      <button type="button" className="btn" onClick={onRestart}>
        <Icon name={"rotate"} />
        Reiniciar
      </button>
    </div>
  );
};

