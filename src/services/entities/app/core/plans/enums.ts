export enum EPlanStatus {
  DELETED = 'DELETED',
  INACTIVE = 'INACTIVE',
  ACTIVE = 'ACTIVE',
}

export enum EBillingType {
  MONTHLY = 'Monthly',
  ANNUAL = 'Annual',
  CUSTOM = 'Custom',
}

export enum EQuotaPeriod {
  MONTHLY = 'monthly',
  BIMONTHLY = 'bimonthly',
  TRIMONTLHY = 'trimontlhy',
  BIANNUALLY = 'biannually',
  ANNUALLY = 'annually',
  FOREVER = 'forever',
  UNLIMITED = 'unlimited',
}

export enum EInterval {
  DAY = 'day',
  WEEK = 'week',
  MONTH = 'month',
  YEAR = 'year',
}

export enum EBillingType {
  PREPAID = 'prepaid',
  POSTPAID = 'postpaid',
  EXACT_DAY = 'exact_day',
}

export enum EPaymentMethod {
  CREDIT_CARD = 'credit_card',
  DEBIT_CARD = 'debit_card',
  BOLETO = 'boleto',
}
