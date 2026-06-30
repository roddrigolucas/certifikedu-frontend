const BASE_ENDPOINT = 'certificates';
const PUBLIC_ENDPOINT = 'public';
const EMAIL_ENDPOINT = 'emails';

export const CertificatesEndpoints = {
  GetAll: `${BASE_ENDPOINT}/page`,
  Create: `${BASE_ENDPOINT}/create`,
  GetById: (id: string) => `${BASE_ENDPOINT}/info/${id}`,
  CreateHash: (id: string) => `${BASE_ENDPOINT}/public/create/${id}`,
  GetPublic: (hash: string) => `${PUBLIC_ENDPOINT}/${hash}`,
  RequestApproval: (id: string) => `${EMAIL_ENDPOINT}/certificate/approval/${id}`,
  HasAccount: (emailId: string, documentId: string) =>
    `${PUBLIC_ENDPOINT}/email/${emailId}/document/${documentId}`,
  CheckCPFIssuer: (templateId: string, documentId: string) =>
    `templates/check/document/${documentId}/template/${templateId}`,
};
