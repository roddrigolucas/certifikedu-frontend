const DEFAULT_ENDPOINT = 'pj';
const BASE_ENDPOINT = 'certificates';

export const CertificatesEndpoints = {
  GetAll: (pjId: string) => `${DEFAULT_ENDPOINT}/${pjId}/${BASE_ENDPOINT}/page`,
  Create: (pjId: string) => `${DEFAULT_ENDPOINT}/${pjId}/${BASE_ENDPOINT}/create`,
  GetCertificateById: (pjId: string, certificateId: string) =>
    `${DEFAULT_ENDPOINT}/${pjId}/${BASE_ENDPOINT}/info/${certificateId}`,
  Template: (pjId: string) => `${DEFAULT_ENDPOINT}/${pjId}/template`,
  EditTemplate: (pjId: string, templateId: string) =>
    `${DEFAULT_ENDPOINT}/${pjId}/templates/info/${templateId}`,
  CloneTemplate: (pjId: string, templateId: string) =>
    `${DEFAULT_ENDPOINT}/${pjId}/template/clone/${templateId}`,
  GetTemplatesBasic: (pjId: string) => `${DEFAULT_ENDPOINT}/${pjId}/templates/basic`,
  GetTemplates: (pjId: string) => `${DEFAULT_ENDPOINT}/${pjId}/templates`,
  GetTemplatesById: (pjId: string, templateId: string) =>
    `${DEFAULT_ENDPOINT}/${pjId}/template/${templateId}`,
  DeleteTemplatesById: (pjId: string, templateId: string) =>
    `${DEFAULT_ENDPOINT}/${pjId}/template/${templateId}`,
  EmitTemplatesToSchool: (pjId: string, templateId: string) =>
    `${DEFAULT_ENDPOINT}/${pjId}/template/${templateId}/school/certificates`,
  EmitTemplatesToStudents: (pjId: string, templateId: string) =>
    `${DEFAULT_ENDPOINT}/${pjId}/template/${templateId}/certificates`,
  EmitTemplatesToCourse: (pjId: string, templateId: string, courseId: string) =>
    `${DEFAULT_ENDPOINT}/${pjId}/template/${templateId}/course/${courseId}/certificates`,
  SaveBgVersoImage: (pjId: string) => `${DEFAULT_ENDPOINT}/${pjId}/inverse`,
  DeleteBgVersoImage: (pjId: string, inverseId: string) =>
    `${DEFAULT_ENDPOINT}/${pjId}/inverse/${inverseId}`,
  SaveBgImage: (pjId: string) => `${DEFAULT_ENDPOINT}/${pjId}/backgrounds`,
  GetPrivateBgImage: (pjId: string) => `${DEFAULT_ENDPOINT}/${pjId}/backgrounds`,
  DeleteBgImage: (pjId: string, backgroundId: string) =>
    `${DEFAULT_ENDPOINT}/${pjId}/backgrounds/${backgroundId}`,
  GetCertificateHistory: (pjId: string) => `${DEFAULT_ENDPOINT}/${pjId}/${BASE_ENDPOINT}/emissions`,
  GetCertificateHistoryById: (pjId: string, emissionId: string) =>
    `${DEFAULT_ENDPOINT}/${pjId}/${BASE_ENDPOINT}/emissions/${emissionId}`,
};
