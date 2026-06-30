import { authApi } from '@/services/api/api';
import { IResponse } from '@/services/types/interfaces';

import { CreditsEndpoints } from './endpoints';
import { IPriceResponse, ISignupCreditCard } from './types';

export const GetUserCreditCards = async () => {
  try {
    const { data } = await authApi.get(CreditsEndpoints.GetCards);

    return data.response?.cards;
  } catch (error) {
    throw new Error('Error getting credit card data');
  }
};

export const SignupCreditCard = async (card: ISignupCreditCard) => {
  try {
    await authApi.post(CreditsEndpoints.SignupCard, card);
  } catch (error) {
    throw new Error('Error trying to sign up credit card data');
  }
};

export const RegisterCustomerId = async () => {
  try {
    await authApi.post(CreditsEndpoints.RegisterCustomer);
  } catch (error) {
    throw new Error('Error trying to sign up credit card data');
  }
};

export const DeleteCreditCard = async (id: string) => {
  try {
    await authApi.delete(`${CreditsEndpoints.DeleteCard}/${id}`);
  } catch (error) {
    throw new Error('Error trying to sign up credit card data');
  }
};

export const SetDefaultCreditCard = async (id: string) => {
  try {
    await authApi.patch(`${CreditsEndpoints.DefaultCard}/${id}`);
  } catch (error) {
    throw new Error('Error trying to set default credit card');
  }
};

export const GetPriceCredits = async () => {
  try {
    const { data } = await authApi.get<IResponse<IPriceResponse>>(CreditsEndpoints.PriceCredits);

    return data.response.data;
  } catch (error) {
    throw new Error('Error getting price credits');
  }
};

export const PurchaseCredits = async (creditCardId: string, purchasedAmount: number) => {
  try {
    await authApi.post(CreditsEndpoints.PurchaseCredits, { creditCardId, purchasedAmount });
  } catch (error) {
    throw new Error('Error trying to purchase credits');
  }
};

export const CreditsService = {
  GetUserCreditCards,
  SignupCreditCard,
  DeleteCreditCard,
  SetDefaultCreditCard,
  GetPriceCredits,
  RegisterCustomerId,
  PurchaseCredits,
};
