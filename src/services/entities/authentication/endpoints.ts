import { TypeAccountEnum } from './enum';

const DEFAULT_ENDPOINT = 'auth';

export const AuthenticationEndpoints = {
  SignIn: `${DEFAULT_ENDPOINT}/signin`,
  ResetPassword: `${DEFAULT_ENDPOINT}/reset`,
  SignUp: (type: TypeAccountEnum) => `${DEFAULT_ENDPOINT}/signup/${type}`,
};
