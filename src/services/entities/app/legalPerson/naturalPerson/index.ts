import { authApi } from '@/services/api/api';

import { NaturalPersonEndpoints } from './endpoints';
import { IProfilePJInfo } from './types';

const GetProfileInfo = async (pjId: string) => {
  try {
    const { data } = await authApi.get<IProfilePJInfo>(NaturalPersonEndpoints.GetProfileInfo(pjId));

    return data;
  } catch (error) {
    throw new Error('Error getting information from account');
  }
};

export const NaturalPersonService = {
  GetProfileInfo,
};
