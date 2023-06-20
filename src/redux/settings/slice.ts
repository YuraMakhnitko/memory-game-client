import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Settings {
  soundsVolume: number;
  isOpenLogout: boolean;
}

const initialState: Settings = {
  soundsVolume: 0.2,
  isOpenLogout: false,
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setVolume(state, action: PayloadAction<number>) {
      state.soundsVolume = action.payload;
    },
    setLogoutModal(state, action: PayloadAction<boolean>) {
      state.isOpenLogout = action.payload;
    },
  },
});

export const { setVolume, setLogoutModal } = settingsSlice.actions;

export default settingsSlice.reducer;
