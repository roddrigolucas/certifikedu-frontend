import type { Dispatch } from 'react';

import type { CustomCognitoUser } from '@/services/cognito/authentication/types';

export interface AuthenticationContextType {
  isAuthenticating: boolean;
  user: CustomCognitoUser | undefined;
  setUser: Dispatch<React.SetStateAction<CustomCognitoUser | undefined>>;
  getJwtToken: () => Promise<string>;
}

export interface AuthenticationProviderProps {
  children: React.ReactNode;
}
