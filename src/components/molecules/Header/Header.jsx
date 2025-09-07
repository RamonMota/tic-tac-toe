import { Fragment } from "react";
import { useHistoryStore } from "../../../context/HistoryContext";
import "./Header.scss";
export const Header = () => {
  const { xWins, oWins, draws } = useHistoryStore();
  const p1 = localStorage.getItem("p1") || "Player 1";
  const p2 = localStorage.getItem("p2") || "Player 2";

  const displayInfo = [
    { name: p1, value: xWins },
    { name: "Empate", value: draws },
    { name: p2, value: oWins },
  ];

  return (
    <div className="header">
      {displayInfo.map((item, index) => (
        <Fragment key={item.name}>
          <div className="info">
            <span>{item.value}</span>
            <p>{item.name}</p>
          </div>
          {displayInfo.length > index + 1 && (
            <span className="divider" aria-hidden="true"></span>
          )}
        </Fragment>
      ))}
    </div>
  );
};
