import React from 'react';

import {
  setLoginOpen,
  setRegisterOpen,
  setAuth,
  setLogoutModal,
} from '../redux';

import { useDispatch, useSelector } from 'react-redux';
import {
  RegisterModal,
  LoginModal,
  LogoutModal,
  VolumeSlider,
} from '../components';

import { RootState } from '../redux';

import useSound from 'use-sound';
import { sounds } from '../settings/sounds';

export const Settings: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const { isAuth, loginOpen, registerOpen, user } = useSelector(
    (state: RootState) => state.auth
  );
  const volume = useSelector((state: RootState) => state.settings.soundsVolume);
  const { isOpenLogout } = useSelector((state: RootState) => state.settings);

  const [clickSound] = useSound(sounds.buttonClick, { volume });

  const onLogoutClick = (): void => {
    dispatch(setLogoutModal(true));
    dispatch(setAuth(false));
    clickSound();
    window.localStorage.removeItem('token');
  };

  const handleLoginOpen = (): void => {
    dispatch(setLoginOpen(!loginOpen));
    clickSound();
  };
  const handleRegisterOpen = (): void => {
    dispatch(setRegisterOpen(!registerOpen));
    clickSound();
  };

  const serLogoutModal = () => {
    dispatch(setLogoutModal(!isOpenLogout));
    clickSound();
  };

  return (
    <div className="game-settings">
      {isAuth && (
        <p className="game-settings__text" id="game-main-text">
          User: <span>{user.name}</span>
        </p>
      )}
      <div className="game-settings__devider"></div>
      {isAuth && (
        <p className="game-settings__text" id="game-email-text">
          Email: <span>{user.email}</span>
        </p>
      )}
      <div className="game-settings__devider"></div>
      {!isAuth && (
        <div className="game-auth-block">
          <button className="game__button" onClick={handleLoginOpen}>
            LOGIN
          </button>
          <button className="game__button" onClick={handleRegisterOpen}>
            REGISTER
          </button>
        </div>
      )}

      <div className="game-settings__devider"></div>
      <VolumeSlider />
      <div className="game-settings__devider"></div>
      {isAuth && (
        <button className="game__button" onClick={serLogoutModal}>
          Logout
        </button>
      )}
      <LoginModal keepMounted open={loginOpen} onClose={handleLoginOpen} />
      <RegisterModal
        keepMounted
        open={registerOpen}
        onClose={handleRegisterOpen}
      />
      <LogoutModal
        keepMounted
        open={isOpenLogout}
        onClose={serLogoutModal}
        action={onLogoutClick}
      />
    </div>
  );
};
