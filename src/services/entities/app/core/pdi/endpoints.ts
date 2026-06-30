const BASE_ENDPOINT = 'pdi';

export const PDI = {
  Root: `${BASE_ENDPOINT}`,
  GetById: (id: string) => `${BASE_ENDPOINT}/${id}`,
  MarkSelected: (nodeId: string) => `${BASE_ENDPOINT}/nodes/${nodeId}`,
  GetAutheticatedToken: `${BASE_ENDPOINT}/ws/token`,
};
