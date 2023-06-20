import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import useSound from 'use-sound';
import { sounds } from '../../settings/sounds';

import { RootState } from '../../redux';

import { tabStyle, tabsStyle } from './types';

export const DesctopTabs: React.FC = () => {
  const pagePath = window.location.pathname;
  const navigate = useNavigate();

  // const { isAuth } = useSelector((state: RootState) => state.auth);

  const [value, setValue] = useState<number>(0);
  const [confirmPath, setConfirmPath] = useState<string>('/');

  const volume = useSelector((state: RootState) => state.settings.soundsVolume);
  const [switchPageSound] = useSound(sounds.switchSound, { volume });

  useEffect(() => {
    if (pagePath !== confirmPath) {
      setValue(0);
    }
  }, [pagePath]);

  console.log(pagePath, 'pagePath');

  const handleChange = (
    event: React.SyntheticEvent,
    newValue: number
  ): void => {
    const path = event.currentTarget.id;
    setConfirmPath(path);
    navigate(path);
    setValue(newValue);
    switchPageSound();
  };

  return (
    <div className="tabs-container">
      <Box sx={{ width: '100%' }}>
        <Box sx={{ bgcolor: 'transparent' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="tabs"
            centered
            sx={tabsStyle}
          >
            <Tab id="/" label={`Game`} sx={tabStyle} />
            <Tab id="/winners" label={`Winners`} sx={tabStyle} />
            <Tab id="/settings" label={`Settings`} sx={tabStyle} />
          </Tabs>
          <Box sx={{ p: 1 }} />
        </Box>
      </Box>
    </div>
  );
};
