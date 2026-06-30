import { authApi } from '@/services/api/api';

import { ProfileEndpoints } from './endpoints';
import { IProfilePJ } from './model';

const GetInfo = async () => {
  try {
    const response = await authApi.get<IProfilePJ>(ProfileEndpoints.GetInfo);

    return response.data;
  } catch (error) {
    throw new Error('Error getting profile data');
  }
};

const UpdateInfo = async (data: Partial<IProfilePJ>) => {
  try {
    const response = await authApi.patch<IProfilePJ>(ProfileEndpoints.GetInfo, data);

    return response.data;
  } catch (error) {
    throw new Error('Error updating profile data');
  }
};

export const ProfilePJService = {
  GetInfo,
  UpdateInfo,
};
