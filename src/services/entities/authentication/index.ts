import { api } from '@/services/api/api';

import { AuthenticationEndpoints } from './endpoints';
import { TypeAccountEnum } from './enum';
import { ICheckResetPassword, IRegisterLegalPerson, IRegisterNaturalPerson } from './types';

const parseApiError = (error: any): string => {
  if (typeof error === 'string' && error.trim()) {
    return error;
  }
  const rawMsg =
    error?.response?.data?.message ??
    error?.response?.data?.response?.message ??
    error?.response?.data?.error ??
    error?.message;

  if (Array.isArray(rawMsg)) {
    return rawMsg.join(', ');
  }
  if (typeof rawMsg === 'string' && rawMsg.trim()) {
    return rawMsg;
  }

  return 'Erro ao realizar cadastro. Por favor, tente novamente.';
};

const SignUp = async (data: IRegisterNaturalPerson) => {
  try {
    await api.post(AuthenticationEndpoints.SignUp(TypeAccountEnum.NaturalPerson), data);
  } catch (error) {
    throw new Error(parseApiError(error));
  }
};

const CheckResetPassword = async (data: ICheckResetPassword) => {
  try {
    const response = await api.patch(AuthenticationEndpoints.ResetPassword, data);

    return response.data;
  } catch (error) {
    throw new Error(parseApiError(error));
  }
};

const SignUpLegalPerson = async (data: IRegisterLegalPerson) => {
  try {
    await api.post(AuthenticationEndpoints.SignUp(TypeAccountEnum.LegalPerson), data);
  } catch (error) {
    throw new Error(parseApiError(error));
  }
};

const SignIn = () => {};

export const AuthenticationService = {
  SignUp,
  SignUpLegalPerson,
  SignIn,
  CheckResetPassword,
};
