const DEFAULT_ENDPOINT = 'pj';
const BASE_ENDPOINT = 'profile';

export const NaturalPersonEndpoints = {
  GetProfileInfo: (pjId: string) => `${DEFAULT_ENDPOINT}/${pjId}/${BASE_ENDPOINT}`,
};
