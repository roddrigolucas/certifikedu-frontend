const BASE_ENDPOINT = 'pjusers';

export const LegalPersonEndpoints = {
  Create: `${BASE_ENDPOINT}/create`,
  Users: `${BASE_ENDPOINT}/admins`,
  Associate: `${BASE_ENDPOINT}/associate`,
  CreateApiKey: 'api/v1/create/key',
  EnableUserApi: (id: string) => `api/v1/enable/${id}`,
  DisableUserApi: (id: string) => `api/v1/disable/${id}`,
  DeleteUsersById: `${BASE_ENDPOINT}`,
  GetById: (id: string) => `${BASE_ENDPOINT}/user/${id}`,
};
