import { PlanetsType } from '../../settings/setup';

export interface GameStateProps {
  planets: PlanetsType[];
  timer: number;
  inGame: boolean;
  isFailed: boolean;
  isWon: boolean;
  score: number;
  finalScore: number;
  level: number;
  openResModal: boolean;
  matchedPairs: number;
  clickedPlanet: undefined | PlanetsType;
  winnersList: WinnerProps[];
  status: string;
}

export interface WinnerProps {
  name: string;
  points: number;
  _id: string;
}
export interface ResultProps {
  _id: string;
  points: number;
}

export enum Status {
  LOADING = 'LOADING',
  SUCCSESS = 'SUCCESS',
  ERROR = 'ERROR',
}
