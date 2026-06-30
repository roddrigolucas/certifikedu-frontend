import { authApi } from '@/services/api/api';

import { ProfessionalProfile } from './endpoints';
import { IProfessionalProfile, IProfessionalProfileResponse } from './model';

export const SaveProfessionalProfile = async (data: IProfessionalProfile) => {
  try {
    const response = await authApi.post(ProfessionalProfile.Root, data);

    return response.data;
  } catch (error) {
    throw new Error('Error saving profile');
  }
};

export const GetProfessionalProfile = async (): Promise<IProfessionalProfileResponse> => {
  try {
    const response = await authApi.get(ProfessionalProfile.Root);

    return response.data;
  } catch (error) {
    throw new Error('Error getting profile');
  }
};

export const DeleteProfessionalProfile = async () => {
  try {
    const response = await authApi.delete(ProfessionalProfile.Root);

    return response.data;
  } catch (error) {
    throw new Error('Error DELETING profile');
  }
};

export const ProfessionalProfileService = {
  SaveProfessionalProfile,
  GetProfessionalProfile,
  DeleteProfessionalProfile,
};
