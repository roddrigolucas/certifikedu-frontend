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

export interface IReportsMetrics {
  certificadosCadastrados: number;
  certificadosEmitidos: number;
  numeroAlunos: number;
  errosEmissao: number;
}

const GetMetrics = async (pjId: string): Promise<IReportsMetrics> => {
  try {
    const response = await authApi.get<IReportsMetrics>(ReportsEndpoints.GetMetrics(pjId));

    return response.data;
  } catch (error) {
    throw new Error('Error getting reports metrics');
  }
};

export const ReportsService = {
  GetReportUrl,
  GetMetrics,
};
