import { authApi } from '@/services/api/api';

import { TrailsEndpoints } from './endpoints';
import { IRegisterTrail, ITrails, ITrailsResponse } from './types';

const GetTrails = async (pjId: string) => {
  try {
    const { data } = await authApi.get<ITrailsResponse>(TrailsEndpoints.GetTrails(pjId));

    return data;
  } catch (error) {
    throw new Error('Error getting trails');
  }
};

const GetTrailById = async (pjId: string, trailId: string) => {
  try {
    const { data } = await authApi.get<ITrails>(TrailsEndpoints.TrailById(pjId, trailId));

    return data;
  } catch (error) {
    throw new Error('Error getting trail by id');
  }
};

const RegisterTrail = async (pjId: string, data: IRegisterTrail) => {
  try {
    await authApi.post(TrailsEndpoints.RegisterTrail(pjId), data);
  } catch (error) {
    throw new Error('Error registering trail');
  }
};

const EditTrail = async (pjId: string, trailId: string, data: IRegisterTrail) => {
  try {
    await authApi.patch(TrailsEndpoints.TrailById(pjId, trailId), data);
  } catch (error) {
    throw new Error('Error editting trail');
  }
};

const DeleteTrail = async (pjId: string, trailId: string) => {
  try {
    await authApi.delete(TrailsEndpoints.TrailById(pjId, trailId));
  } catch (error) {
    throw new Error('Error deleting trail');
  }
};

export const TrailService = {
  GetTrails,
  GetTrailById,
  RegisterTrail,
  EditTrail,
  DeleteTrail,
};
