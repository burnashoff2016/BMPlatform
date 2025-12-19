import axios from "axios";

import { getToken, logout } from "./auth";

// Определяем базовый URL в зависимости от среды
let baseURL = "/api"; // По умолчанию используем относительный путь

// Если определена переменная окружения, используем её
if (import.meta.env.VITE_API_BASE_URL) {
  baseURL = import.meta.env.VITE_API_BASE_URL;
} else if (typeof window !== 'undefined') {
  // В браузере используем origin текущего URL
  baseURL = `${window.location.origin}/api`;
}

export const api = axios.create({
  baseURL,
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      logout();
    }
    return Promise.reject(error);
  },
);
