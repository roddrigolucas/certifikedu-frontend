const DEFAULT_ENDPOINT = 'pj';
const BASE_ENDPOINT = 'metabase-reports';

export const ReportsEndpoints = {
  GetReportUrl: (pjId: string) => `${DEFAULT_ENDPOINT}/${pjId}/${BASE_ENDPOINT}`,
};
