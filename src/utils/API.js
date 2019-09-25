// utils/API.js

import axios from 'axios';

export default axios.create({
  baseURL: 'https://randomuser.me/api/0.4/?randomapi',
  responseType: 'json',
});
