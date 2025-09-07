import { useEffect, useMemo, useReducer, useRef } from "react";
import { checkGameState } from "../utils";

const initialState = {
  board: Array(9).fill(null),
  isXNext: true,
};

function reducer(state, action) {
  switch (action.type) {
    case "PLAY": {
      const i = action.index;
      if (state.board[i] != null) return state;
      const next = [...state.board];
      next[i] = state.isXNext ? "X" : "O";
      return { board: next, isXNext: !state.isXNext };
    }
    case "RESET":
      return { ...initialState };
    default:
      return state;
  }
}

export function useTicTacToe({ onGameOver } = {}) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { winner, isDraw, winningLine } = useMemo(
    () => checkGameState(state.board),
    [state.board]
  );

  const gameOverNotified = useRef(false);

  useEffect(() => {
    const allEmpty = state.board.every((v) => v == null);
    if (allEmpty) gameOverNotified.current = false;

    const result = winner || (isDraw ? "draw" : null);
    if (result && !gameOverNotified.current) {
      onGameOver && onGameOver(result);
      gameOverNotified.current = true;
    }
  }, [state.board, winner, isDraw, onGameOver]);

  const play = (index) => {
    if (winner || state.board[index] != null) return false;
    dispatch({ type: "PLAY", index });
    return true;
  };

  const resetBoard = () => dispatch({ type: "RESET" });

  const currentPlayer = state.isXNext ? "X" : "O";

  return {
    board: state.board,
    isXNext: state.isXNext,
    currentPlayer,
    winner,
    isDraw,
    winningLine,
    play,
    resetBoard,
  };
}