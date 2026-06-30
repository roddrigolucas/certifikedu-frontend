import { UsersPJ } from '@/components/pages/App/LegalPerson/Users/columns';

import { EBrand } from '../../../core/credits/enums';
import { EPictureStatus } from '../enums';

export interface ILegalInstitutionsProfile {
  name: string;
  pjId: string;
  statusAssociation: string;
  role: string;
  environment: string;
  nameEnvironment?: string;
}

export interface IProfileInfo {
  id?: string;
  email?: string;
  document?: string;
  type?: string;
  pjs?: Array<ILegalInstitutionsProfile>;
  status?: string;
  apiEnabled?: boolean;
  canvasConfigured?: boolean;
  apiKey?: IApiKey;
  pictureStatus?: EPictureStatus;
  receivedCertificateQty?: number;
  emmitedCertificateQty?: number;
  planId?: string;
  nextPayment?: string;
  paymentCardId?: string;
  createdAt?: string;
  updatedAt?: string;
  isRaw?: boolean;
  admins?: Array<UsersPJ>;
  name?: string;
  hasProfessionalProfile?: boolean;
  hasResumes?: boolean;
}

interface IApiKey {
  createdAt: string;
  updatedAt: string;
  apiKey: string;
}

export interface IProfileData {
  naturalPerson: INaturalPerson;
}

export interface IProfileCredits {
  plan: string;
  customerId: string;
  subscriptionId: string;
  certificateCredits: number;
  additionalCertificateCredits: number;
  monthSpentCredits: number;
  nextCertificateDate: string;
}

export interface IProfileCard {
  id: string;
  customerId: string;
  cardId: string;
  lastFourDigits: string;
  expMonth: number;
  expYear: number;
  brand: EBrand;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface INaturalPerson {
  id: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  cpf: string;
  name: string;
  email: string;
  phone: string;
  birthDate: string;
  zipCode: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  number: string;
  additionalDetails: string;
  alternativeEmail?: string;
}

export interface ILegalPerson {
  id: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  cpf: string;
  name: string;
  email: string;
  phone: string;
  birthDate: string;
  zipCode: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  number: string;
  additionalDetails: string;
  alternativeEmail?: string;
}
