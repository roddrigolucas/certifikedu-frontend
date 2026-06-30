import axios from 'axios';

import { pagePaths } from '@/constants/navigation/pagePaths';

import { manageAccessToken } from '@/hooks/core/useAuthentication/token';

const BASE_URL = import.meta.env.VITE_API_URL;
const ACCESS_TOKEN = manageAccessToken.get();

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const authApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

authApi.defaults.headers.common['Content-Type'] = 'application/json';
if (ACCESS_TOKEN) {
  authApi.defaults.headers.common['Authorization'] = `Bearer ${ACCESS_TOKEN}`;
}

authApi.interceptors.request.use((config) => {
  const token = manageAccessToken.get();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
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
      try {
        const response = await axios.post(
          `${BASE_URL}/auth/refresh`,
          {},
          { withCredentials: true },
        );
        const newToken = response.data.access_token;
        manageAccessToken.set(newToken);
        authApi.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        return authApi(originalRequest);
      } catch (refreshError) {
        manageAccessToken.remove();
        if (!document.location.pathname.includes(pagePaths.unauthenticated.signIn)) {
          document.location.href = pagePaths.unauthenticated.signIn;
        }

        return Promise.reject(refreshError);
      }
    }

    if (error?.response?.data?.message?.includes('not refresh')) {
      if (!document.location.pathname.includes(pagePaths.unauthenticated.signIn)) {
        document.location.href = pagePaths.unauthenticated.signIn;
      }
    }

    return Promise.reject(error);
  },
);
