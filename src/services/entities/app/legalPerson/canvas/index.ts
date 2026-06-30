import { authApi } from '@/services/api/api';
import { IResponse } from '@/services/types/interfaces';

import { CanvasEndpoints } from './endpoints';
import {
  ICanvasConfigResponse,
  ICreateUserLTIConfiguration,
  IUserLTIConfigurationResponse,
} from './types';

const GetGlobalLTIConfiguration = async () => {
  try {
    const { data } = await authApi.get<IResponse<any>>(
      CanvasEndpoints.GetGlobalLTIConfiguration(),
      {},
    );

    return data;
  } catch (error) {
    throw new Error('Error fetching LTI configuration');
  }
};

const GetCanvasConfiguration = async () => {
  try {
    const { data } = await authApi.get<ICanvasConfigResponse>(
      CanvasEndpoints.GetCanvasConfiguration(),
      {},
    );

    return data;
  } catch (error) {
    throw new Error('Error fetching Canvas configuration');
  }
};

const GetUserLTIConfiguration = async () => {
  try {
    const { data } = await authApi.get<IResponse<IUserLTIConfigurationResponse>>(
      CanvasEndpoints.GetUserLTIConfiguration(),
      {},
    );

    return data;
  } catch (error) {
    throw new Error('Error fetching user LTI configuration');
  }
};

const CreateUserLTIConfiguration = async (data: ICreateUserLTIConfiguration) => {
  try {
    await authApi.post<IResponse<IUserLTIConfigurationResponse>>(
      CanvasEndpoints.GetUserLTIConfiguration(),
      data,
    );
  } catch (error) {
    throw new Error('Error creating user LTI configuration');
  }
};

const UpdateUserLTIConfiguration = async (data: ICreateUserLTIConfiguration) => {
  try {
    await authApi.put<IResponse<IUserLTIConfigurationResponse>>(
      CanvasEndpoints.GetUserLTIConfiguration(),
      data,
    );
  } catch (error) {
    throw new Error('Error updating user LTI configuration');
  }
};

export const CanvasService = {
  GetGlobalLTIConfiguration,
  GetCanvasConfiguration,
  GetUserLTIConfiguration,
  CreateUserLTIConfiguration,
  UpdateUserLTIConfiguration,
};
