import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router';
import { useNavigate } from 'react-router-dom';

import './index.scss';

import { Game, Settings, WinnersList } from './pages';
import { TitleTabs, AnimatedTitle } from './components';
import { AppDispatch, fetcAuthMe } from './redux';

const App: React.FC = () => {
  const dispatch = useDispatch() as AppDispatch;
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetcAuthMe());
    navigate('/');
  }, []);
  return (
    <div className="App">
      <section className="stars-container">
        <div id="stars"></div>
        <div id="stars2"></div>
        <div id="stars3"></div>
      </section>
      <AnimatedTitle />
      <TitleTabs />
      <Routes>
        <Route path="/" element={<Game />} />
        <Route path="/winners" element={<WinnersList />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </div>
  );
};

export default App;
