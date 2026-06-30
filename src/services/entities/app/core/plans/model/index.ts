import { EBillingType, EPaymentMethod, EQuotaPeriod } from '../enums';

export interface IPlanSubscription {
  id: number;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
}

export interface IPlanItem {
  id: number;
  name: string;
  description: string;
}

export interface IDefaultPlan {
  planId: string;
  createdAt: Date;
  updatedAt: Date;
  planName: string;
  description: string;
  descriptionPagarme: string;
  icon: string;
  pdisQty: number;
  pdiPeriod: EQuotaPeriod;
  emittedCertificatesQuota: number;
  emittedCertificatesPeriod: EQuotaPeriod;
  receivedCertificateQuota: number;
  receivedCertificatePeriod: EQuotaPeriod;
  singleCertificatePrice: number;
}

export interface IPlan extends IDefaultPlan {
  interval: string;
  isActive: boolean;
  isDefault: boolean;
  recommended: boolean;
  statement_descriptor: string;
  installments: number[];
  trialPeriodDays?: number;
  billingType: EBillingType;
  billingDays: number[];
  price: number;
  paymentMethod: EPaymentMethod[];
  subscriptions: IPlanSubscription[];
  items: IPlanItem[];
}

export interface IAdminPlans {
  plans: IPlan[];
}
