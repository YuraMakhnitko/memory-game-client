import { useSelector } from 'react-redux';
import { RootState } from '../redux';
import useSound from 'use-sound';

import flip from '../sounds/flip.mp3';
import sussess from '../sounds/success.mp3';
import winlevel from '../sounds/winlevel.mp3';
import fail from '../sounds/fail4.mp3';
import switchSound from '../sounds/switch.mp3';
import buttonClick from '../sounds/button.mp3';

interface Sounds {
  flip: string;
  sussess: string;
  winlevel: string;
  fail: string;
  switchSound: string;
  buttonClick: string;
}

export const sounds: Sounds = {
  flip,
  sussess,
  winlevel,
  fail,
  switchSound,
  buttonClick,
};
