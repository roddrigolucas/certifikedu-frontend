import { authApi } from '@/services/api/api';
import { IResponse } from '@/services/types/interfaces';

import {
  GET_PROFILE_URL,
  GET_RAW_USER_INFO,
  UPDATE_PF_PROFILE_URL,
  UPDATE_USER_RAW,
  UPLOAD_DOCUMENT,
} from './endpoints';
import { IProfileData, IProfileInfo } from './model';
import {
  INaturalPersonUpdate,
  IProfileDataUpdateResponse,
  IProfileResponse,
  UpdateRawUserDto,
} from './types';

export const GetProfilePF = async (): Promise<IProfileResponse> => {
  try {
    const { data } = await authApi.get<IResponse<IProfileResponse>>(GET_PROFILE_URL);

    return data.response.data;
  } catch (error) {
    throw new Error('Error getting profile data');
  }
};

export const UpdateProfilePF = async (
  updatePackage: INaturalPersonUpdate,
): Promise<IProfileData> => {
  try {
    const { data } = await authApi.patch<IResponse<IProfileDataUpdateResponse>>(
      UPDATE_PF_PROFILE_URL,
      updatePackage,
    );

    return data.response.data.userData;
  } catch (error) {
    throw new Error('Error trying to update user info');
  }
};

export const UploadDocument = async (documentImage: FormData): Promise<IProfileInfo> => {
  try {
    const { data } = await authApi.post<IResponse<IProfileInfo>>(UPLOAD_DOCUMENT, documentImage, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return data.response.data;
  } catch (error) {
    throw new Error('Error trying to upload document');
  }
};

export const GetUserRawInfo = async () => {
  try {
    const { data } = await authApi.get(GET_RAW_USER_INFO);

    return data;
  } catch (error) {
    throw new Error('Error getting raw user info');
  }
};

export const UpdateUserRaw = async (packageUpdate: UpdateRawUserDto) => {
  try {
    const { data } = await authApi.patch(UPDATE_USER_RAW, packageUpdate);

    return data;
  } catch (error) {
    throw new Error('Error updating raw user data');
  }
};
