import { authApi } from '@/services/api/api';
import { IResponse } from '@/services/types/interfaces';

import { PlansEndpoints } from './endpoints';
import { EPlanStatus } from './enums';
import { IAdminPlans, IDefaultPlan, IPlan } from './model';
import { IRegisterPlan } from './types';

const GetPlans = async (): Promise<IAdminPlans> => {
  try {
    const { data } = await authApi.get<IAdminPlans>(PlansEndpoints.GetPlans);

    return data;
  } catch (error) {
    throw new Error('Error getting plans data');
  }
};

const GetActivePlans = async (status: EPlanStatus) => {
  try {
    const { data } = await authApi.get<IResponse<IPlan[]>>(PlansEndpoints.GetActivePlans(status));

    return data.response.data;
  } catch (error) {
    throw new Error('Error getting plans data');
  }
};

const RegisterPlan = async (data: IRegisterPlan) => {
  try {
    await authApi.post(PlansEndpoints.RegisterPlan, data);
  } catch (error) {
    throw new Error('Error registering plan');
  }
};

const GetPlanById = async (id: string) => {
  try {
    const { data } = await authApi.get<IResponse<IPlan>>(PlansEndpoints.PlanById(id));

    return data.response.data;
  } catch (error) {
    throw new Error('Error getting plan data');
  }
};

const EditPlan = async (id: string, data: Partial<IRegisterPlan>) => {
  try {
    const response = await authApi.patch<IResponse<IPlan>>(PlansEndpoints.PlanById(id), data);

    return response.data.response.data;
  } catch (error) {
    throw new Error('Error getting plan data');
  }
};

const DeletePlan = async (id: string) => {
  try {
    await authApi.delete(PlansEndpoints.PlanById(id));
  } catch (error) {
    throw new Error('Error deleting plan');
  }
};

const SubscribePlan = async (data: {
  planId: string;
  creditCardId: string;
  installments?: number;
}) => {
  try {
    await authApi.post(PlansEndpoints.SubscribePlan, data);
  } catch (error) {
    throw new Error('Error subscribe plan');
  }
};

const CancelPlan = async (id: string) => {
  try {
    await authApi.delete(PlansEndpoints.CancelPlan(id));
  } catch (error) {
    throw new Error('Error canceling plan');
  }
};

const GetDefaultPlan = async () => {
  try {
    const { data } = await authApi.get<IDefaultPlan>(PlansEndpoints.GetDefault);

    return data;
  } catch (error) {
    throw new Error('Error getting default plan');
  }
};

export const PlansService = {
  GetDefaultPlan,
  GetPlanById,
  GetPlans,
  GetActivePlans,
  RegisterPlan,
  SubscribePlan,
  CancelPlan,
  EditPlan,
  DeletePlan,
};
