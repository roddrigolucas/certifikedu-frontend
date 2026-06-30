const BASE_ENDPOINT = 'corporate';
const DEFAULT_ENDPOINT = 'job-opportunities';

export const CorporateEndpoints = {
  GetAll: (pjId: string) => `${BASE_ENDPOINT}/${pjId}/profile`,
  Create: (pjId: string) => `${BASE_ENDPOINT}/${pjId}/${DEFAULT_ENDPOINT}`,
  GetJobByiD: (pjId: string, jobId: string) =>
    `${BASE_ENDPOINT}/${pjId}/${DEFAULT_ENDPOINT}/${jobId}`,
  GetUserByJobIdAndUseriD: (pjId: string, jobId: string, idPf: string) =>
    `${BASE_ENDPOINT}/${pjId}/${DEFAULT_ENDPOINT}/${jobId}/candidates/${idPf}`,
};
