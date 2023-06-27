import axios from 'axios';
import 'dotenv/config';

const instance = axios.create({
  baseURL: process.env.PAGARME_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default instance;
