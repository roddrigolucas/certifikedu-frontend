import { authApi } from '@/services/api/api';
import { canvasApi } from '@/services/api/canvasApi';

import { AbilitiesEndpoints } from './endpoints';
import { IAbility } from './model';

export const GetAll = async () => {
  try {
    const { data } = await authApi.get<IAbility[]>(AbilitiesEndpoints.GetAll);

    return data;
  } catch (error) {
    throw new Error('Error getting abilities');
  }
};

export const GetAllCanvas = async (token: string) => {
  try {
    const { data } = await canvasApi.get<IAbility[]>(AbilitiesEndpoints.GetAllCanvas, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  } catch (error) {
    throw new Error('Error getting abilities canvas');
  }
};

export const GetRecommendationsPj = async (
  text: string,
): Promise<Array<{ label: string; value: string; category: string }>> => {
  try {
    const { data } = await authApi.post(AbilitiesEndpoints.RecommendationsPj(), { text });

    return data.abilities;
  } catch (error) {
    throw new Error('Error fetching abilities recommendations');
  }
};

export const GetRecommendationsPf = async (
  text: string,
): Promise<Array<{ label: string; value: string; category: string }>> => {
  try {
    const { data } = await authApi.post(AbilitiesEndpoints.RecommendationsPf(), { text });

    return data.abilities;
  } catch (error) {
    throw new Error('Error fetching abilities recommendations');
  }
};

export const AbilitiesService = {
  GetAll,
  GetAllCanvas,
  GetRecommendationsPj,
  GetRecommendationsPf,
};
