import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.ZEKA_API_URL,
  headers: { 'Content-Type': 'application/json' }
});

export default instance;
