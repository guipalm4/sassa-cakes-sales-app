import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8085',
});

export default api;

//por tras de seus olhos
