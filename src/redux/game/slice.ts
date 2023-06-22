import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PlanetsType, createPlanets } from '../../settings/setup';
import { shufflePlanetsArray } from '../../settings/utils';
import { GameStateProps, Status, WinnerProps } from './types';
import { fetchWinners } from './asyncActions';

const initialState: GameStateProps = {
  planets: shufflePlanetsArray(createPlanets()),
  matchedPairs: 0,
  timer: 90,
  inGame: false,
  isFailed: false,
  isWon: false,
  score: 0,
  level: 1,
  openResModal: false,
  finalScore: 0,
  clickedPlanet: undefined,
  winnersList: [],
  status: Status.LOADING,
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setTimer(state, action: PayloadAction<number>) {
      state.timer = action.payload;
      if (state.timer === 0) {
        state.inGame = false;
        state.isFailed = true;
        state.finalScore = state.score;
        state.score = 0;
        state.level = 1;
        // state.clickedPlanet = undefined;
        state.matchedPairs = 0;
      }
      if (state.isWon) {
        state.inGame = false;
      }
    },
    setInGame(state, action: PayloadAction<boolean>) {
      state.inGame = action.payload;
    },
    setIsWon(state, action: PayloadAction<boolean>) {
      state.isWon = action.payload;
      if (action.payload) {
        state.score = state.score + state.timer + 50;
      }
    },
    setResModalOpen(state, action: PayloadAction<boolean>) {
      state.openResModal = action.payload;
    },
    setLevel(state) {
      state.level = state.level + 1;
    },
    setIsFailed(state, action: PayloadAction<boolean>) {
      state.isFailed = action.payload;
    },

    setPlanets(state, action: PayloadAction<PlanetsType[]>) {
      state.planets = action.payload;
    },
    setMatchedPairs(state, action: PayloadAction<number>) {
      state.matchedPairs = action.payload;
    },
    setClickedPlanet(state, action: PayloadAction<undefined | PlanetsType>) {
      state.clickedPlanet = action.payload;
    },
  },
  extraReducers: (builder) => {
    // get winners list from DB
    builder.addCase(fetchWinners.pending, (state) => {
      state.status = Status.LOADING;
      state.winnersList = [];
    });
    builder.addCase(
      fetchWinners.fulfilled,
      (state, action: PayloadAction<WinnerProps[]>) => {
        state.status = Status.SUCCSESS;
        state.winnersList = action.payload;
      }
    );
    builder.addCase(fetchWinners.rejected, (state) => {
      state.status = Status.ERROR;
      state.winnersList = [];
    });
  },
});

export const {
  setTimer,
  setInGame,
  setIsWon,
  setResModalOpen,
  setLevel,
  setIsFailed,
  setMatchedPairs,
  setClickedPlanet,
  setPlanets,
} = gameSlice.actions;
export default gameSlice.reducer;
