import { authApi } from '@/services/api/api';

import { ReportsEndpoints } from './endpoints';

const GetReportUrl = async (pjId: string): Promise<string> => {
  try {
    const response = await authApi.get<{ url: string }>(ReportsEndpoints.GetReportUrl(pjId));

    return response.data.url;
  } catch (error) {
    throw new Error('Error getting report url');
  }
};

export const ReportsService = {
  GetReportUrl,
};
