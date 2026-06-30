const BASE_ENDPOINT = 'payments';
export const GET_USER_CREDIT_CARDS = `${BASE_ENDPOINT}/user/cards`;
export const SIGNUP_CREDIT_CARD = `${BASE_ENDPOINT}/cards`;
export const DELETE_CREDIT_CARD = `${BASE_ENDPOINT}/cards`;
export const DEFAULT_CREDIT_CARD = `${BASE_ENDPOINT}/cards/default`;
export const PRICE_CREDITS = `${BASE_ENDPOINT}/certificate/credit/price`;
export const PURCHASE_CREDITS = `${BASE_ENDPOINT}/order`;

export const CreditsEndpoints = {
  GetCards: `${BASE_ENDPOINT}/user/cards`,
  SignupCard: `${BASE_ENDPOINT}/cards`,
  DeleteCard: `${BASE_ENDPOINT}/cards`,
  DefaultCard: `${BASE_ENDPOINT}/cards/default`,
  PriceCredits: `${BASE_ENDPOINT}/certificate/credit/price`,
  PurchaseCredits: `${BASE_ENDPOINT}/order`,
  RegisterCustomer: `${BASE_ENDPOINT}/customer`,
};
