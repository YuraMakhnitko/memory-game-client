import React, { useEffect, useState } from 'react';
import useSound from 'use-sound';

import { createPlanets, PlanetsType } from '../settings/setup';
import { shufflePlanetsArray } from '../settings/utils';
import { Grid } from './Game.styles';

import { GameHeader, ResultModalWindow, Card } from '../components';

import { sounds } from '../settings/sounds';

import { AppDispatch, RootState } from '../redux';
import { useSelector, useDispatch } from 'react-redux';
import {
  setPlanets,
  setMatchedPairs,
  setClickedPlanet,
  setTimer,
  setInGame,
  setIsWon,
  setResModalOpen,
  setLevel,
  setIsFailed,
  fetchAddPoints,
} from '../redux';
import { ResultProps } from '../redux/game/types';

export const Game: React.FC = () => {
  const dispatch = useDispatch() as AppDispatch;
  const [count, setCount] = useState(0);

  const defaultTimer: number = 90;

  const { openResModal, matchedPairs, clickedPlanet, planets } = useSelector(
    (state: RootState) => state.game
  );
  const { inGame, isFailed, level, score } = useSelector(
    (state: RootState) => state.game
  );
  const { isAuth, user } = useSelector((state: RootState) => state.auth);

  const volume = useSelector((state: RootState) => state.settings.soundsVolume);

  const [flipSound] = useSound(sounds.flip, { volume });
  const [successSound] = useSound(sounds.sussess, { volume });
  const [winSound] = useSound(sounds.winlevel, { volume });
  const [failSound] = useSound(sounds.fail, { volume });
  const [clickSound] = useSound(sounds.buttonClick, { volume });

  useEffect(() => {
    if (matchedPairs === planets.length / 2) {
      setTimeout(() => {
        winSound();
      }, 500);
      console.log('Game Won!');
      dispatch(setIsWon(true));
      setTimeout(() => {
        dispatch(setResModalOpen(true));
      }, 300);
    }
    // if (isFailed) {
    //   dispatch(setResModalOpen(true));
    //   failSound();
    //   console.log('fail sound');
    // }

    // if (count > 1) {
    //   setTimeout(() => {
    //     setCount(0);
    //     return;
    //   }, 1000);
    // }
  }, [matchedPairs]);

  useEffect(() => {
    if (isFailed) {
      dispatch(setResModalOpen(true));
      failSound();
      console.log('fail sound');
    }
  }, [isFailed]);

  useEffect(() => {
    if (count > 1) {
      setTimeout(() => {
        setCount(0);
        return;
      }, 1000);
    }
  }, [count]);

  const handleClose = () => {
    dispatch(setResModalOpen(false));
    clickSound();
  };

  const onLevelUp = (): void => {
    if (isAuth && user._id) {
      const resultData: ResultProps = { _id: user._id, points: score };
      dispatch(fetchAddPoints(resultData));
    }
    dispatch(setIsWon(false));
    dispatch(setLevel());
    dispatch(setPlanets(shufflePlanetsArray(createPlanets())));
    dispatch(setMatchedPairs(0));
    if (level < 10) {
      dispatch(setTimer(defaultTimer - level * 5));
    } else {
      dispatch(setTimer(45));
    }
  };

  const onRestart = (): void => {
    dispatch(setIsWon(false));
    dispatch(setPlanets(shufflePlanetsArray(createPlanets())));
    dispatch(setMatchedPairs(0));
    dispatch(setTimer(defaultTimer));
    dispatch(setIsFailed(false));
    setCount(0);
    dispatch(setClickedPlanet(undefined));
  };

  const handleCardClick = (currentClickedPlanet: PlanetsType) => {
    if (count > 1) {
      return;
    } else {
      setCount(count + 1);
      flipSound();
      if (!inGame && !isFailed) {
        dispatch(setInGame(true));
      }

      // Flip the card
      const newPlanets = planets.map((planet) =>
        planet.id === currentClickedPlanet.id
          ? { ...planet, flipped: true, clickable: false }
          : planet
      );
      dispatch(setPlanets(newPlanets));

      // If this is the first card that is flipped
      // just keep it flipped
      if (!clickedPlanet) {
        dispatch(setClickedPlanet({ ...currentClickedPlanet }));
        return;
      }

      // If it's a match
      if (clickedPlanet.matchingCardId === currentClickedPlanet.id) {
        successSound();
        dispatch(setMatchedPairs(matchedPairs + 1));
        setCount(0);
        dispatch(setClickedPlanet(undefined));
        return;
      }

      // If it's not a matched pair, wait one second and flip them back
      if (clickedPlanet.matchingCardId !== currentClickedPlanet.id) {
        setTimeout(() => {
          const newPlanets = planets.map((planet) =>
            planet.id === clickedPlanet.id ||
            planet.id === currentClickedPlanet.id
              ? { ...planet, flipped: false, clickable: true }
              : planet
          );
          dispatch(setPlanets(newPlanets));
        }, 1000);
      }
      dispatch(setMatchedPairs(matchedPairs));

      dispatch(setClickedPlanet(undefined));
    }
  };

  return (
    <div className="game">
      <GameHeader />
      <div className="game__cards-block">
        <Grid>
          {planets.map((planet) => (
            <Card key={planet.id} card={planet} callback={handleCardClick} />
          ))}
        </Grid>
      </div>
      <ResultModalWindow
        keepMounted
        open={openResModal}
        onClose={handleClose}
        onLevelUp={onLevelUp}
        onRestart={onRestart}
      />
    </div>
  );
};
