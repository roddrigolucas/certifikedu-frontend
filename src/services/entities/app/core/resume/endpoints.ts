const BASE_ENDPOINT = 'resumes';

export const Resumes = {
  Root: `${BASE_ENDPOINT}`,
  GetById: (resumeId: string) => `${BASE_ENDPOINT}/${resumeId}`,
};
