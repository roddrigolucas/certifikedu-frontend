const DEFAULT_ENDPOINT = 'pj';
const BASE_ENDPOINT = 'schools';
const SCHOOL_ENDPOINT = 'school';

export const SchoolsEndpoints = {
  CreateSchool: (pjId: string) => `${DEFAULT_ENDPOINT}/${pjId}/${SCHOOL_ENDPOINT}`,
  GetAll: (pjId: string) => `${DEFAULT_ENDPOINT}/${pjId}/${BASE_ENDPOINT}`,
  GetOne: (pjId: string, id: string) => `${DEFAULT_ENDPOINT}/${pjId}/${SCHOOL_ENDPOINT}/${id}`,
  Edit: (pjId: string, id: string) => `${DEFAULT_ENDPOINT}/${pjId}/${SCHOOL_ENDPOINT}/${id}`,
  Delete: (pjId: string, id: string) => `${DEFAULT_ENDPOINT}/${pjId}/${SCHOOL_ENDPOINT}/${id}`,
};
