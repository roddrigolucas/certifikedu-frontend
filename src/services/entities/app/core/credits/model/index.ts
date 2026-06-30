export interface IPurchaseCredits {
  creditCardId: string;
  purchasedAmount: number;
}

export interface ICreditCard {
  brand: string;
  cardId: string;
  createdAt: string;
  customerId: string;
  expMonth: number;
  expYear: number;
  isDefault: boolean;
  lastFourDigits: string;
  updatedAt: string;
  userId: string;
}
