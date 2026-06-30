import { api } from '@/services/api/api';

import { AuthenticationEndpoints } from './endpoints';
import { TypeAccountEnum } from './enum';
import { ICheckResetPassword, IRegisterLegalPerson, IRegisterNaturalPerson } from './types';

const SignUp = async (data: IRegisterNaturalPerson) => {
  try {
    await api.post(AuthenticationEndpoints.SignUp(TypeAccountEnum.NaturalPerson), data);
  } catch (error) {
    throw error;
  }
};

const CheckResetPassword = async (data: ICheckResetPassword) => {
  try {
    const response = await api.patch(AuthenticationEndpoints.ResetPassword, data);

    return response.data;
  } catch (error) {
    throw error;
  }
};

const SignUpLegalPerson = async (data: IRegisterLegalPerson) => {
  try {
    await api.post(AuthenticationEndpoints.SignUp(TypeAccountEnum.LegalPerson), data);
  } catch (error) {
    throw error;
  }
};

const SignIn = () => {};

export const AuthenticationService = {
  SignUp,
  SignUpLegalPerson,
  SignIn,
  CheckResetPassword,
};
