import React from 'react';
import { useState } from "react";
import MyContext from "./MyContext";

function Provider({children}) {
  const [state, setState] = useState({
    activePlayer: 1,
    gameBoard: [0, 0, 0, 0, 0, 0, 0, 0, 0],
  });

  const resetGame = () => {
    setState({
      activePlayer: 1,
      gameBoard: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    });
  }

  const toggleActivePlayer = () => {
    if (state.activePlayer === 1) return 2;
    return 1;
  }

  const updateState = (cellClicked) => {
    setState((state) => {
      const newState = [...state.gameBoard];
      let newActivePlayer = state.activePlayer;

      if (state.gameBoard[cellClicked] === 0) {
        newState[cellClicked] = state.activePlayer;
        newActivePlayer = toggleActivePlayer();
      } else newState[cellClicked] = state.gameBoard[cellClicked];

      return {
        activePlayer: newActivePlayer,
        gameBoard: newState,
      };
    });
  }

  const context = {
    ...state,
    updateState,
    resetGame,
  }

  return (
    <MyContext.Provider value={ context }>
      {
        children
      }
    </MyContext.Provider>
  );
}

export default Provider;
