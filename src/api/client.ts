import axios from 'axios';

const apiUrl =
  import.meta.env.VITE_BACKEND_API_URL || 'https://api.deusexprotocol.com';
console.log('Creating API client with URL:', apiUrl);

export const api = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      sessionStorage.removeItem('token');
      window.location.href = '/';
    }
    return Promise.reject(error);
  },
);
