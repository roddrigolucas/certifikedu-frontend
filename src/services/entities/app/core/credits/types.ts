import { IProfileCard } from '../../naturalPerson/profile/model';

export interface ICreditCardResponse {
  cards: IProfileCard[];
}

export interface ISignupCreditCard {
  holderName: string;
  holderDocument: string;
  number: string;
  cvv: string;
  expMonth: number;
  expYear: number;
  setDefault?: boolean;
  billingAddress: {
    streetNumber: string;
    street: string;
    neighborhood: string;
    zipCode: string;
    city: string;
    state: string;
    additionalDetails?: string;
    country: string;
  };
}

export interface IPriceResponse {
  price: number;
}
