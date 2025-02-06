import axios from 'axios';
import { baseUrl } from '../config/envs';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: baseUrl,
});

api.interceptors.request.use((config) => {
  const token = Cookies.get('authToken'); // si guarsde mi token en localstorage utizilo el nombre con el que lo guarde.
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
