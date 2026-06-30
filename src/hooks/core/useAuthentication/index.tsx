import { createContext, useContext, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import Cookies from 'js-cookie';

import { ACCESS_TOKEN_KEY } from '@/constants/storage/cookieKeys';

import { authApi } from '@/services/api/api';
import { authenticationService } from '@/services/cognito/authentication';
import type { CustomCognitoUser } from '@/services/cognito/authentication/types';

import { AuthenticationContextType, AuthenticationProviderProps } from './interfaces';

export const AuthenticationContext = createContext<AuthenticationContextType | undefined>(
  undefined,
);

export const getJwtToken = async () => {
  const token = Cookies.get(ACCESS_TOKEN_KEY);
  if (token) {
    authApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    return token;
  }
  throw new Error('No token available');
};

export const AuthenticationProvider = ({ children }: AuthenticationProviderProps) => {
  const [user, setUser] = useState<CustomCognitoUser>();

  const { isLoading: isAuthenticating } = useQuery<CustomCognitoUser>(
    ['getAuthenticatedUser'],
    () => authenticationService.getAuthenticatedUser(),
    {
      onSuccess: (user) => {
        setUser(user);
      },
      onError: () => {
        setUser(undefined);
      },
      retry: false,
    },
  );

  const contextValue = {
    isAuthenticating,
    user,
    setUser,
    getJwtToken,
  };

  return (
    <AuthenticationContext.Provider value={contextValue}>{children}</AuthenticationContext.Provider>
  );
};

const useAuthentication = () => {
  const context = useContext(AuthenticationContext);
  if (!context) {
    throw new Error('useAuthenticationContext must be used within a AuthenticationProvider');
  }

  return context;
};

export default useAuthentication;
