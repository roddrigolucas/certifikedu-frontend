const BASE_ENDPOINT = 'canvas-platform';

export const CanvasEnpoints = {
  CreateToken: (id: string) => `${BASE_ENDPOINT}/get-token/${id}`,
  GetInfo: `${BASE_ENDPOINT}/info`,
  GetStudents: `${BASE_ENDPOINT}/students`,
  Certificates: `${BASE_ENDPOINT}/certificates`,
  viewCertificate: (certificateId: string) => `${BASE_ENDPOINT}/certificates/${certificateId}`,
  Templates: `${BASE_ENDPOINT}/templates`,
  TemplateById: (templateId: string) => `${BASE_ENDPOINT}/templates/${templateId}`,
  CloneTemplate: (templateId: string) => `${BASE_ENDPOINT}/clone/templates/${templateId}`,
  Backgrounds: `${BASE_ENDPOINT}/backgrounds`,
  DeleteBGImageById: (backgroundImage: string) => `${BASE_ENDPOINT}/backgrounds/${backgroundImage}`,
  EmitTemplatesToStudents: (templateId: string) =>
    `${BASE_ENDPOINT}/templates/${templateId}/certificates`,
};
