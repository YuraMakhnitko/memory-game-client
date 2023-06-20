import { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { AnimWinnersTitle } from '../components';
import { AppDispatch, RootState, fetchWinners } from '../redux';

export const WinnersList = () => {
  const dispatch = useDispatch() as AppDispatch;
  useEffect(() => {
    dispatch(fetchWinners());
  }, []);

  const { winnersList } = useSelector((state: RootState) => state.game);
  return (
    <>
      <AnimWinnersTitle />
      <div className="winners">
        {winnersList.map((winner, index) => {
          return (
            <div className="winner" key={winner._id}>
              <div className="winner__left-side">
                <p className="winner__place"># {index + 1}</p>
                <p className="winner__name">{winner.name}</p>
              </div>
              <p className="winner__points">{winner.points}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};
