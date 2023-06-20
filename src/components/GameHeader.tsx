import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState, setInGame, setTimer } from '../redux';

export const GameHeader: React.FC = () => {
  const dispatch = useDispatch() as AppDispatch;
  const { timer, inGame, score, level } = useSelector(
    (state: RootState) => state.game
  );

  if (inGame) {
    setTimeout(() => {
      dispatch(setTimer(timer - 1));
    }, 1000);
    console.log('the end');
  }

  return (
    <div className="game__header">
      <p className="game__header-label" id="game-main-text">
        Level: <span>{level}</span>
      </p>
      <p className="game__header-label" id="game-main-text">
        Time: <span>{timer}</span>s
      </p>
      <p className="game__header-label" id="game-main-text">
        Score: <span>{score}</span>
      </p>
    </div>
  );
};
