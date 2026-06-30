import { authApi } from '@/services/api/api';

import { INaturalPersonUpdate } from '../../naturalPerson/profile/types';
import { LegalPersonEndpoints } from './endpoints';
import { IPermissionUserPJ, IPermissionUserPJPatch, IUsersPJRoles } from './types';

const PermissioningUserPJPF = async (updatePackage: IPermissionUserPJ) => {
  try {
    const { data } = await authApi.post(LegalPersonEndpoints.Associate, updatePackage);

    return data;
  } catch (error) {
    throw new Error('Error trying to update user info');
  }
};

const ChangePermissioningUserPJPF = async (updatePackage: IPermissionUserPJPatch) => {
  try {
    const { data } = await authApi.patch(LegalPersonEndpoints.Associate, updatePackage);

    return data;
  } catch (error) {
    throw new Error('Error trying to update user info');
  }
};

const GetUserById = async (id: string) => {
  try {
    const response = await authApi.get(LegalPersonEndpoints.GetById(id));

    return response.data;
  } catch (error) {
    throw new Error('Error getting user info');
  }
};

const DeleteUsersById = async (admins: Array<IUsersPJRoles>) => {
  try {
    const response = await authApi.delete(LegalPersonEndpoints.DeleteUsersById, {
      data: {
        admins: admins,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error('Error deleting users by id');
  }
};

const CreateUserPJPF = async (updatePackage: INaturalPersonUpdate): Promise<any> => {
  try {
    const { data } = await authApi.post(LegalPersonEndpoints.Create, updatePackage);

    return data;
  } catch (error) {
    throw new Error('Error trying to update user info');
  }
};

const CreateApiKey = async (): Promise<any> => {
  try {
    const { data } = await authApi.post(LegalPersonEndpoints.CreateApiKey);

    return data;
  } catch (error) {
    throw new Error('Error trying to update user info');
  }
};

const EnableUserApi = async (id: string): Promise<any> => {
  try {
    await authApi.patch(LegalPersonEndpoints.EnableUserApi(id));
  } catch (error) {
    throw new Error('Error trying to update user info');
  }
};

const DisableUserApi = async (id: string): Promise<any> => {
  try {
    await authApi.patch(LegalPersonEndpoints.DisableUserApi(id));
  } catch (error) {
    throw new Error('Error trying to update user info');
  }
};

export const LegalPersonService = {
  GetUserById,
  PermissioningUserPJPF,
  CreateUserPJPF,
  ChangePermissioningUserPJPF,
  DeleteUsersById,
  CreateApiKey,
  EnableUserApi,
  DisableUserApi,
};
