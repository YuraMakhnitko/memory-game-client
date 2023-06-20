import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import SettingsIcon from '@mui/icons-material/Settings';

import useSound from 'use-sound';
import { sounds } from '../../settings/sounds';

import { RootState } from '../../redux';

import { tabStyle, tabsStyle } from './types';

export const MobileTabs: React.FC = () => {
  const volume = useSelector((state: RootState) => state.settings.soundsVolume);
  const [switchPageSound] = useSound(sounds.switchSound, { volume });

  const tabHomeIcon = <SportsEsportsIcon fontSize="large" />;
  const tabLoginIcon = <EmojiEventsIcon fontSize="large" />;
  const tabSettingsIcon = <SettingsIcon fontSize="large" />;

  const pagePath = window.location.pathname;
  const navigate = useNavigate();

  const [value, setValue] = React.useState<number>(0);
  const [confirmPath, setConfirmPath] = useState<string>('/');

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
            <Tab id="/" icon={tabHomeIcon} sx={tabStyle} />
            <Tab id="/winners" icon={tabLoginIcon} sx={tabStyle} />
            <Tab id="/settings" icon={tabSettingsIcon} sx={tabStyle} />
          </Tabs>
          <Box sx={{ p: 1 }} />
        </Box>
      </Box>
    </div>
  );
};
