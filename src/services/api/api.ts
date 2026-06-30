import axios from 'axios';

import { pagePaths } from '@/constants/navigation/pagePaths';
import { ACCESS_TOKEN_KEY } from '@/constants/storage/cookieKeys';

import { manageAccessToken } from '@/hooks/core/useAuthentication/token';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://31.97.91.29:3001';

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: false,
});

export const authApi = axios.create({
  baseURL: BASE_URL,
});

const SignOut = () => {
  manageAccessToken.remove(ACCESS_TOKEN_KEY);
  window.location.reload();
};

authApi.defaults.headers.common['Content-Type'] = 'application/json';

authApi.interceptors.request.use((config) => {
  const ACCESS_TOKEN = manageAccessToken.get(ACCESS_TOKEN_KEY);
  if (ACCESS_TOKEN) {
    config.headers.Authorization = `Bearer ${ACCESS_TOKEN}`;
  }

  return config;
});

authApi.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error?.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      // No token refresh available locally — clear and retry once
      const token = manageAccessToken.get(ACCESS_TOKEN_KEY);
      if (token) {
        originalRequest.headers.Authorization = `Bearer ${token}`;

        return authApi(originalRequest);
      }
      SignOut();
    } else if (error?.response?.status === 401 && originalRequest._retry) {
      SignOut();
    }

    if (error?.response?.data?.message?.includes('not refresh')) {
      document.location.href = pagePaths.unauthenticated.signIn;
    }

    return Promise.reject(error);
  },
);
