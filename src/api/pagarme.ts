import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.pagar.me/core/v5/orders',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default instance;
