import { EBillingType, EInterval, EQuotaPeriod } from './enums';

export interface IRegisterPlan {
  planName: string;
  description: string;
  descriptionPagarme: string;
  statement_descriptor: string;
  shippable: boolean;
  payment_methods: string[];
  installments: number[];
  pdisQty: number;
  pdiPeriod: EQuotaPeriod;
  emittedCertificatesQuota: number;
  emittedCertificatesPeriod: EQuotaPeriod;
  receivedCertificateQuota: number;
  receivedCertificatePeriod: EQuotaPeriod;
  singleCertificatePrice: number;
  price?: number;
  minimum_price?: number;
  interval: EInterval;
  interval_count: number;
  billing_type: EBillingType;
  billing_days?: number[];
  items: {
    name: string;
    description?: string;
    quantity: number;
    cycles?: number;
    pricing_scheme: {
      scheme_type: string;
      price: number;
      minimum_price: number;
    };
  }[];
}
