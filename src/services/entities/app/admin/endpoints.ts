const BASE_ENDPOINT = '/admin';

export const AdminEnpoints = {
  GetAllUsers: (status: string) => `${BASE_ENDPOINT}/users/${status}`,
  //   GetAllCertificatesById: (id: string) => `${BASE_ENDPOINT}/info/${id}`,
  GetDocPicById: (id: string) => `${BASE_ENDPOINT}/users/document/${id}`,
  GetAllAuditLogs: `${BASE_ENDPOINT}/users/compliance`,
  GetLogsByPjId: (id: string) => `${BASE_ENDPOINT}/users/compliance/${id}`,
  GetCertificatesById: (id: string) => `${BASE_ENDPOINT}/certificates/user/${id}`,
  UpdateCertificatesById: `${BASE_ENDPOINT}/certificates`,
  UpdateUser: (status: string, id: string) => `${BASE_ENDPOINT}/users/${id}/status/${status}`,
  DeleteUser: (id: string) => `${BASE_ENDPOINT}/users/${id}`,
  UploadBGImage: `${BASE_ENDPOINT}/backgrounds`,
  DeleteBGImage: (backgroundId: string) => `${BASE_ENDPOINT}/backgrounds/${backgroundId}`,
  EmailTemplate: `${BASE_ENDPOINT}/emails`,
  EmailTemplateById: (id: string) => `${BASE_ENDPOINT}/emails/${id}`,
  AbilityById: (id: string) => `${BASE_ENDPOINT}/abilities/${id}`,
  CreateAbility: `${BASE_ENDPOINT}/abilities`,
  GetEnabledAbilityThemes: '/abilities/themes',
  GetEnabledAbilities: '/abilities/enabled',
  ResetUserPassword: (id: string) => `${BASE_ENDPOINT}/users/${id}/reset-password`,
  UpdateUserEmail: (id: string) => `${BASE_ENDPOINT}/users/${id}/email`,
  UpdateUserCadastral: (id: string) => `${BASE_ENDPOINT}/users/${id}`,
};
