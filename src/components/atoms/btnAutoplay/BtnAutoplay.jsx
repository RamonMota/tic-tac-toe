import { Icon } from "../../atoms/Icons/Icons";
import "./BtnAutoplay.scss";

export const BtnAutoplay = ({ isAutoplay, countdown, onToggle }) => {
  return (
    <button
      type="button"
      aria-pressed={!!isAutoplay}
      className={`btn btn-autoplay`}
      onClick={onToggle}
    >
      <Icon name={isAutoplay ? "pause" : "play"} />
      Autoplay
      {isAutoplay && <span className="countdown">{countdown}</span>}
    </button>
  );
};
