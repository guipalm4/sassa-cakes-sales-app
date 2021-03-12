import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.15.41:8085/',
});

export default api;

//por tras de seus olhos
