import axios from 'axios';

import { CANVAS_TOKEN_KEY } from '@/constants/storage/cookieKeys';

import { manageAccessToken } from '@/hooks/core/useAuthentication/token';

const BASE_URL = import.meta.env.VITE_API_URL;

export const canvasApi = axios.create({
  baseURL: BASE_URL,
});

canvasApi.defaults.headers.common['Content-Type'] = 'application/json';

canvasApi.interceptors.request.use((config) => {
  return new Promise((resolve) => {
    manageAccessToken
      .getValue(CANVAS_TOKEN_KEY, 'https://exp.instructure.com')
      .then((value) => {
        const CANVAS_TOKEN = value;
        if (CANVAS_TOKEN) {
          config.headers.Authorization = `Bearer ${CANVAS_TOKEN}`;
        }
        resolve(config);
      })
      .catch(() => {
        // No logged-in user or an error occurred: don't set auth header
        resolve(config);
      });
  });
});

// canvasApi.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     const originalRequest = error.config;
//     const canvasRetry = Number(originalRequest.headers?.Canvas ?? 0);
//     if (error?.response?.status === 401 && canvasRetry < 4) {
//       originalRequest.headers['Canvas'] = 1 + canvasRetry;
//       console.log('Retrying request', originalRequest.headers['Canvas']);
//       setTimeout(() => {
//         return canvasApi(originalRequest);
//       }, 5000);
//     }

//     return Promise.reject(error);
//   },
// );
