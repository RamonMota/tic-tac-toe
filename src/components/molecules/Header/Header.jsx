import { Fragment } from "react";
import { useHistoryStore } from "../../../context/HistoryContext";
import "./Header.scss";
export const Header = () => {
  const { xWins, oWins, draws } = useHistoryStore();
  
  const displayInfo = [
    { name: "Player 1", value: xWins },
    { name: "Empate", value: draws },
    { name: "Player 2", value: oWins },
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
