/**
 * @fileoverview Configuración global del cliente HTTP Axios.
 * Se utiliza para realizar peticiones a la API del Backend.
 */
import axios from 'axios';

/**
 * Instancia configurada de Axios apuntando a la URL base de la API.
 */
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Add token to headers if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
