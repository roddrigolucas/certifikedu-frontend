const BASE_ENDPOINT = 'abilities';

export const AbilitiesEndpoints = {
  GetAll: `${BASE_ENDPOINT}/enabled`,
  GetAllCanvas: `canvas-platform/${BASE_ENDPOINT}/enabled`,
  RecommendationsPj: () => `pjusers/recommend`,
  RecommendationsPf: () => `abilities/recommend`,
};
