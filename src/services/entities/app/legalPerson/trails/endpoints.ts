const DEFAULT_ENDPOINT = 'pj';
const BASE_ENDPOINT = 'paths';

export const TrailsEndpoints = {
  GetTrails: (pjId: string) => `${DEFAULT_ENDPOINT}/${pjId}/${BASE_ENDPOINT}`,
  TrailById: (pjId: string, trailId: string) =>
    `${DEFAULT_ENDPOINT}/${pjId}/${BASE_ENDPOINT}/${trailId}`,
  RegisterTrail: (pjId: string) => `${DEFAULT_ENDPOINT}/${pjId}/${BASE_ENDPOINT}`,
};
