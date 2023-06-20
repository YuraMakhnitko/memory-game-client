import * as storeRedux from './store';
import * as gameSlice from './game/slice';
import * as authSlice from './auth/slice';
import * as settingsSlice from './settings/slice';
import { type RootState } from './store';
import { type AppDispatch } from './store';
import { fetchWinners, fetchAddPoints } from './game/asyncActions';

import { fetchRegister, fetchLogin, fetcAuthMe } from './auth/asyncActions';

const { store } = storeRedux;
const {
  setTimer,
  setInGame,
  setIsWon,
  setResModalOpen,
  setLevel,
  setIsFailed,
  setMatchedPairs,
  setClickedPlanet,
  setPlanets,
} = gameSlice;
const { setAuth, setLoginOpen, setRegisterOpen } = authSlice;
const { setVolume, setLogoutModal } = settingsSlice;

export {
  type RootState,
  type AppDispatch,
  store,
  setMatchedPairs,
  setClickedPlanet,
  setPlanets,
  setTimer,
  setInGame,
  setIsWon,
  setResModalOpen,
  setLevel,
  setIsFailed,
  setAuth,
  setLoginOpen,
  setRegisterOpen,
  setVolume,
  setLogoutModal,
  fetchRegister,
  fetchLogin,
  fetcAuthMe,
  fetchWinners,
  fetchAddPoints,
};
