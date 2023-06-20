import axios from '../../settings/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { WinnerProps, ResultProps } from './types';

export const fetchWinners = createAsyncThunk('/getwinners', async () => {
  const { data } = await axios.get('/getwinners');
  const winnersList = data as WinnerProps[];
  return winnersList;
});

export const fetchAddPoints = createAsyncThunk(
  '/addpoints',
  async (params: ResultProps) => {
    const { data } = await axios.post('/addpoints', params);
    return data;
  }
);
