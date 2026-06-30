import { createSearchParams } from 'react-router-dom';

import { pagePaths } from '@/constants/navigation/pagePaths';

export const buildEntireUrl = (endpoint: string) => {
  return `${import.meta.env.VITE_API_BASE_URL}${endpoint}`;
};

export const buildSignUpPageUrl = ({
  type,
  name,
  email,
  document,
}: {
  type?: string;
  name?: string;
  email?: string;
  document?: string;
} = {}) => {
  if (type && name && document && email) {
    const searchParameters = createSearchParams({ type, name, document, email });

    return `${pagePaths.unauthenticated.signUp}/?${searchParameters}`;
  }

  if (type && name && document) {
    const searchParameters = createSearchParams({ type, name, document });

    return `${pagePaths.unauthenticated.signUp}/?${searchParameters}`;
  }

  if (type && name && email) {
    const searchParameters = createSearchParams({ type, name, email });

    return `${pagePaths.unauthenticated.signUp}/?${searchParameters}`;
  }

  if (type && document) {
    const searchParameters = createSearchParams({ type, document });

    return `${pagePaths.unauthenticated.signUp}/?${searchParameters}`;
  }

  if (type) {
    const searchParameters = createSearchParams({ type });

    return `${pagePaths.unauthenticated.signUp}/?${searchParameters}`;
  }

  if (type && name) {
    const searchParameters = createSearchParams({ type, name });

    return `${pagePaths.unauthenticated.signUp}/?${searchParameters}`;
  }

  if (type && email) {
    const searchParameters = createSearchParams({ type, email });

    return `${pagePaths.unauthenticated.signUp}/?${searchParameters}`;
  }

  return pagePaths.unauthenticated.signUp;
};

export const buildSignInPageUrl = ({
  emailAddress,
}: {
  emailAddress?: string;
} = {}) => {
  if (emailAddress) {
    const searchParameters = createSearchParams({ emailAddress });

    return `${pagePaths.unauthenticated.signIn}/?${searchParameters}`;
  }

  return pagePaths.unauthenticated.signIn;
};

export const buildShowJobOpportunityUrl = ({
  jobId,
}: {
  jobId?: string;
} = {}) => {
  if (jobId) {
    const searchParameters = createSearchParams({ jobId });

    return `${pagePaths.authenticated.corporatePerson.view}/?${searchParameters}`;
  }

  return pagePaths.authenticated.corporatePerson.dashboard;
};

export const buildAdminPageUrl = ({
  status,
  userId,
}: {
  userId?: string;
  status?: string;
} = {}) => {
  if (userId && status) {
    const searchParameters = createSearchParams({ userId, status });

    return `${pagePaths.authenticated.admin.users.root}/?${searchParameters}`;
  }
  if (status) {
    const searchParameters = createSearchParams({ status });

    return `${pagePaths.authenticated.admin.users.root}/?${searchParameters}`;
  }

  return pagePaths.authenticated.admin.users.root;
};

export const buildResetPasswordPageUrl = ({ emailAddress }: { emailAddress?: string }) => {
  if (emailAddress) {
    const searchParameters = createSearchParams({ emailAddress });

    return `${pagePaths.unauthenticated.resetPassword}/?${searchParameters}`;
  }

  return pagePaths.unauthenticated.resetPassword;
};

export const buildResetEmailPageUrl = ({ emailAddress }: { emailAddress?: string }) => {
  if (emailAddress) {
  }

  return pagePaths.unauthenticated.resetEmail;
};

export const buildDashboardPageUrl = () => {
  return pagePaths.authenticated.dashboard;
};

export const buildProfilePageUrl = () => {
  return pagePaths.authenticated.account.profile;
};

export const buildCertificatesPageUrl = (page = '1', limit = '500') => {
  const searchParameters = createSearchParams({ page, limit });

  return `${pagePaths.authenticated.certificates.list}?${searchParameters}`;
};

export const buildUpdatePasswordPageUrl = ({
  emailAddress,
}: {
  emailAddress?: string;
} = {}) => {
  if (emailAddress) {
    const searchParameters = createSearchParams({ emailAddress });

    return `${pagePaths.unauthenticated.updatePassword}/?${searchParameters}`;
  }

  return pagePaths.unauthenticated.updatePassword;
};

interface BuildVerifyNewEmailPageUrlParams {
  emailAddress?: string; // O novo e-mail
  oldEmailAddress?: string; // O e-mail antigo
}

export const buildVerifynewEmailPageUrl = ({
  emailAddress,
  oldEmailAddress,
}: BuildVerifyNewEmailPageUrlParams = {}): string => {
  // Objeto para armazenar os parâmetros de busca válidos
  const params: Record<string, string> = {};

  // Adiciona o novo e-mail se ele existir
  if (emailAddress) {
    params.emailAddress = emailAddress;
  }

  // Adiciona o e-mail antigo se ele existir
  if (oldEmailAddress) {
    params.oldEmailAddress = oldEmailAddress;
  }

  // Converte o objeto de parâmetros para uma string de query
  const searchParameters = new URLSearchParams(params).toString();

  // Verifica se há parâmetros de busca para adicionar à URL
  if (searchParameters) {
    return `${pagePaths.unauthenticated.verifyEmail}/?${searchParameters}`;
  }

  // Retorna apenas o caminho base se não houver parâmetros
  return pagePaths.unauthenticated.verifyEmail;
};
