import { authApi } from '@/services/api/api';
import { IResponse, PaginationParams } from '@/services/types/interfaces';

import { SchoolsEndpoints } from './endpoints';
import { ISchool } from './model';
import { IRegisterSchool } from './types';

const GetSchools = async (pjId: string, params?: PaginationParams) => {
  try {
    const { data } = await authApi.get<IResponse<ISchool[]>>(SchoolsEndpoints.GetAll(pjId), {
      params: {
        ...params,
      },
    });

    return data.response.data;
  } catch (error) {
    throw new Error('Error getting schools data');
  }
};

const GetSchool = async (pjId: string, id: string) => {
  try {
    const { data } = await authApi.get<IResponse<ISchool>>(SchoolsEndpoints.GetOne(pjId, id));

    return data.response.data;
  } catch (error) {
    throw new Error('Error getting school');
  }
};

const RegisterSchool = async (pjId: string, data: IRegisterSchool) => {
  try {
    const response = await authApi.post(SchoolsEndpoints.CreateSchool(pjId), data);

    return response.data;
  } catch (error) {
    throw new Error('Error registering school');
  }
};

const EditSchool = async (pjId: string, id: string, data: Partial<IRegisterSchool>) => {
  try {
    await authApi.patch(SchoolsEndpoints.Edit(pjId, id), data);
  } catch (error) {
    throw new Error('Error editing school');
  }
};

const DeleteSchool = async (pjId: string, id: string) => {
  try {
    await authApi.delete(SchoolsEndpoints.Delete(pjId, id));
  } catch (error) {
    throw new Error('Error deleting school');
  }
};

export const SchoolService = {
  GetSchools,
  GetSchool,
  RegisterSchool,
  EditSchool,
  DeleteSchool,
};
