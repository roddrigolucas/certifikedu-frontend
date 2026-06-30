import { authApi } from './api';

export const authService = {
  login: async (email: string, password: string) => {
    const response = await authApi.post('/auth/login', { email, password });

    return response.data;
  },

  register: async (data: any, type: 'pf' | 'pj' = 'pf') => {
    const endpoint = type === 'pf' ? '/auth/signup/pf' : '/auth/signup/pj';
    const response = await authApi.post(endpoint, data);

    return response.data;
  },

  refresh: async () => {
    const response = await authApi.post('/auth/refresh');

    return response.data;
  },

  logout: async () => {
    const response = await authApi.post('/auth/logout');

    return response.data;
  },

  getMe: async () => {
    const response = await authApi.get('/auth/me');

    return response.data;
  },

  resetPassword: async (email: string) => {
    const response = await authApi.patch('/auth/reset', { email });

    return response.data;
  },
};
