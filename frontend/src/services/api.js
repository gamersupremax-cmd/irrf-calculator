import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  register: (email, password, name) =>
    api.post('/auth/register', { email, password, name }),
  login: (email, password) =>
    api.post('/auth/login', { email, password }),
};

export const nfeAPI = {
  search: (chave) => api.get(`/nfe/search/${chave}`),
};

export const irrfAPI = {
  calculate: (nfe_chave, valor_total, aliquota) =>
    api.post('/irrf/calculate', { nfe_chave, valor_total, aliquota }),
  getGuide: (calculoId) => api.get(`/irrf/guide/${calculoId}`),
  getHistory: () => api.get('/irrf/history'),
};

export default api;