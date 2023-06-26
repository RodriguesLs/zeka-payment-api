import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://zeka-api.brazilsouth.cloudapp.azure.com',
  headers: { 'Content-Type': 'application/json' }
});

export default instance;
