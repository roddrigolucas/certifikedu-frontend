const BASE_ENDPOINT = 'templates';

export const TemplatesEndpoints = {
  GetById: (id: string) => `${BASE_ENDPOINT}/${id}`,
  CreateCertificate: `${BASE_ENDPOINT}/create/certificate`,
  SetQrCodeSettings: (pjId: string, id: string) => `/pj/${pjId}/${BASE_ENDPOINT}/${id}`,
  AddAllowedDocument: (pjId: string, templateId: string) =>
    `/pj/${pjId}/${BASE_ENDPOINT}/allowed-documents/${templateId}`,
};
