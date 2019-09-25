// utils/API.js

import axios from 'axios';

const instance = axios.create({
  // for test res, rej: 'https://httpstat.us/400',
  baseURL: 'https://randomuser.me/api/0.4/?randomapi',
  timeout: 6000,
});

export const setAuthToken = token => {
  instance.defaults.headers.common.Authorization = token;
};

export const clearAuthToken = () => {
  delete instance.defaults.headers.common.Authorization;
};

export default instance;
