import React, { useEffect } from 'react';
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
    if (isFailed) {
      dispatch(setResModalOpen(true));
      failSound();
    }
  }, [matchedPairs, isFailed]);

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
    if (level < 13) {
      dispatch(setTimer(defaultTimer - level * 5));
    } else {
      dispatch(setTimer(defaultTimer));
    }
  };

  const onRestart = (): void => {
    dispatch(setIsWon(false));
    dispatch(setPlanets(shufflePlanetsArray(createPlanets())));
    setMatchedPairs(0);
    dispatch(setTimer(defaultTimer));
    dispatch(setIsFailed(false));
    setClickedPlanet(undefined);
  };

  const handleCardClick = (currentClickedPlanet: PlanetsType) => {
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
      const newPairNumber = matchedPairs + 1;
      dispatch(setMatchedPairs(newPairNumber));
      dispatch(setClickedPlanet(undefined));
      return;
    }

    // If it's not a matched pair, wait one second and flip them back
    setTimeout(() => {
      const newPlanets = planets.map((planet) =>
        planet.id === clickedPlanet.id || planet.id === currentClickedPlanet.id
          ? { ...planet, flipped: false, clickable: true }
          : planet
      );
      dispatch(setPlanets(newPlanets));
    }, 1000);

    dispatch(setClickedPlanet(undefined));
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