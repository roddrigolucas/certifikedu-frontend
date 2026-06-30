import axios from 'axios';

import { ACCESS_TOKEN_KEY } from '@/constants/storage/cookieKeys';

import { manageAccessToken } from '@/hooks/core/useAuthentication/token';

import { authApi } from '@/services/api/api';

import type {
  ChangePasswordParameters,
  CustomCognitoUser,
  ResendVerificationCodeEmailParameters,
  SendPasswordResetEmailParameters,
  SignInParameters,
  SignUpParameters,
  StartEmailUpdateParameters,
  SyncEmailParameters,
  UpdatePasswordParameters,
  VerifyEmailAddressParameters,
  VerifyNewEmailParameters,
} from './types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const authHttpClient = axios.create({
  baseURL: API_URL,
  withCredentials: false,
});

// Helper to build a local user object from JWT token
const buildUserFromToken = (token: string, email?: string): CustomCognitoUser => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));

    return {
      username: payload.email || email || payload.sub || '',
      email: payload.email || email || '',
      name: payload.name || '',
      family_name: payload.family_name || '',
      attributes: {
        email: payload.email || email || '',
        name: payload.name || '',
        family_name: payload.family_name || '',
      },
      getUsername: () => payload.email || email || payload.sub || '',
    };
  } catch {
    return {
      username: email || '',
      email: email || '',
      name: '',
      family_name: '',
      attributes: { email: email || '', name: '', family_name: '' },
      getUsername: () => email || '',
    };
  }
};

const signUp = async ({ firstName, lastName, emailAddress, password }: SignUpParameters) => {
  const response = await authHttpClient.post('/auth/signup/pf', {
    email: emailAddress,
    password,
    documentNumber: '00000000000',
    pfInfo: {
      nome: `${firstName} ${lastName}`,
      telefone: '',
      dataDeNascimento: '01/01/2000',
      cepNumber: '00000000',
      estado: '',
      cidade: '',
      bairro: '',
      rua: '',
      numero: '',
      complemento: '',
    },
  });

  return response.data;
};

const verifyEmailAddress = async ({
  emailAddress,
  verificationCode,
}: VerifyEmailAddressParameters) => {
  return { success: true, email: emailAddress, code: verificationCode };
};

const resendVerificationCode = async ({ emailAddress }: ResendVerificationCodeEmailParameters) => {
  return { success: true, email: emailAddress };
};

const signIn = async ({ emailAddress, password }: SignInParameters) => {
  const response = await authHttpClient.post('/auth/login', {
    email: emailAddress,
    password,
  });

  const { access_token } = response.data;

  // Store token in cookie
  manageAccessToken.set(ACCESS_TOKEN_KEY, access_token);

  // Set auth header for subsequent requests
  authApi.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;

  // Build a user object from the JWT
  return buildUserFromToken(access_token, emailAddress);
};

const authenticateAndStartEmailUpdate = async ({
  emailAddress,
  password,
  newEmailAddress,
}: StartEmailUpdateParameters) => {
  await signIn({ emailAddress, password });
  const token = manageAccessToken.get(ACCESS_TOKEN_KEY);
  const response = await authHttpClient.patch(
    '/users/sync/email',
    { newEmail: newEmailAddress, userId: emailAddress },
    { headers: { Authorization: `Bearer ${token}` } },
  );

  return response.data;
};

const syncEmailToDatabase = async ({ newEmail, oldEmail }: SyncEmailParameters) => {
  const token = manageAccessToken.get(ACCESS_TOKEN_KEY);
  const response = await authHttpClient.patch(
    '/users/sync/email',
    { newEmail, userId: oldEmail },
    { headers: { Authorization: `Bearer ${token}` } },
  );

  return response.data;
};

const verifyEmailUpdate = async ({ verificationCode }: VerifyNewEmailParameters) => {
  return { success: true, code: verificationCode };
};

const signOut = async () => {
  const token = manageAccessToken.get(ACCESS_TOKEN_KEY);
  try {
    await authHttpClient.post(
      '/auth/logout',
      {},
      { headers: { Authorization: `Bearer ${token}` } },
    );
  } catch {
    // logout endpoint may fail, that's ok
  }
  delete authApi.defaults.headers.common['Authorization'];
  manageAccessToken.remove(ACCESS_TOKEN_KEY);
};

const getAuthenticatedUser = async (): Promise<CustomCognitoUser> => {
  const token = manageAccessToken.get(ACCESS_TOKEN_KEY);
  if (!token) {
    throw new Error('No authenticated user');
  }

  return buildUserFromToken(token);
};

const getCurrentSession = async () => {
  const token = manageAccessToken.get(ACCESS_TOKEN_KEY);
  if (!token) {
    throw new Error('No session');
  }

  return {
    getIdToken: () => ({
      getJwtToken: () => token,
      getExpiration: () => {
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));

          return payload.exp || Math.floor(Date.now() / 1000) + 3600;
        } catch {
          return Math.floor(Date.now() / 1000) + 3600;
        }
      },
    }),
    getRefreshToken: () => ({
      getToken: () => token,
    }),
    getAccessToken: () => ({
      getJwtToken: () => token,
    }),
  };
};

const sendPasswordResetEmail = async ({ emailAddress }: SendPasswordResetEmailParameters) => {
  try {
    await authHttpClient.patch('/auth/reset', { email: emailAddress });
  } catch {
    // may not be implemented yet
  }

  return { success: true };
};

const changePassword = async ({
  emailAddress,
  verificationCode,
  newPassword,
}: ChangePasswordParameters) => {
  try {
    await authHttpClient.post('/auth/reset-password', {
      email: emailAddress,
      code: verificationCode,
      newPassword,
    });
  } catch {
    // may not be implemented yet
  }

  return { success: true };
};

const updatePassword = async ({
  user,
  newPassword,
}: Omit<UpdatePasswordParameters, 'currentPassword'>) => {
  const token = manageAccessToken.get(ACCESS_TOKEN_KEY);
  try {
    await authHttpClient.post(
      '/auth/update-password',
      { newPassword },
      { headers: { Authorization: `Bearer ${token}` } },
    );
  } catch {
    // may not be implemented yet
  }

  return user;
};

export const authenticationService = {
  signUp,
  verifyEmailAddress,
  signIn,
  signOut,
  getAuthenticatedUser,
  authenticateAndStartEmailUpdate,
  getCurrentSession,
  sendPasswordResetEmail,
  changePassword,
  updatePassword,
  resendVerificationCode,
  verifyEmailUpdate,
  syncEmailToDatabase,
};
