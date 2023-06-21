import axios from 'axios';

// const instance = axios.create({ baseURL: "http://localhost:8000/" });
const instance = axios.create({
  baseURL: 'https://memory-game-server-5kgm.onrender.com/',
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem('token');
  return config;
});

export default instance;
