import { authApi } from '@/services/api/api';

import { TFontBasicOutput } from './types';

export const GetAllFonts = async (): Promise<TFontBasicOutput[]> => {
  try {
    const { data } = await authApi.get<TFontBasicOutput[]>('fonts');

    return data;
  } catch (err) {
    throw new Error('Erro ao buscar fontes');
  }
};

export const FontsService = {
  GetAllFonts,
};
