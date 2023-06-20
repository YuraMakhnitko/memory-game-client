import axios from '../../settings/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserProps } from './types';

export const fetchRegister = createAsyncThunk(
  '/register',
  async (params: UserProps) => {
    const { data } = await axios.post('/register', params);
    return data;
  }
);

export const fetchLogin = createAsyncThunk(
  '/login',
  async (params: UserProps) => {
    const { data } = await axios.post('/login', params);
    return data;
  }
);

export const fetcAuthMe = createAsyncThunk('/authme', async () => {
  const { data } = await axios.get('/authme');
  return data;
});
export const fetchWinners = createAsyncThunk('/getwinners', async () => {
  const { data } = await axios.get('/getwinners');
  return data;
});
