import React from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import VolumeDown from '@mui/icons-material/VolumeDown';
import VolumeUp from '@mui/icons-material/VolumeUp';

import { useDispatch, useSelector } from 'react-redux';
import { setVolume, RootState } from '../redux';

export const VolumeSlider: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const { soundsVolume } = useSelector((state: RootState) => state.settings);

  const handleChangeVolume = (
    event: Event,
    newValue: number | number[]
  ): void => {
    const volumeValue = (newValue as number) / 100;
    dispatch(setVolume(volumeValue));
  };
  return (
    <div className="game-settings__sounds-box">
      <p className="game-settings__label" id="game-main-text">
        Sounds:
      </p>
      <Box sx={{ width: '100%' }}>
        <Stack
          spacing={2}
          direction="row"
          sx={{ mb: 1, marginBottom: 0 }}
          alignItems="center"
        >
          <VolumeDown sx={{ opacity: 0.7 }} />
          <Slider
            aria-label="Volume"
            value={soundsVolume * 100}
            onChange={handleChangeVolume}
            sx={{ color: 'rgba(97, 218, 251, 1)' }}
          />
          <VolumeUp sx={{ opacity: 0.7 }} />
        </Stack>
      </Box>
    </div>
  );
};
