import { IProfileCard, IProfileCredits, IProfileData, IProfileInfo } from './model';

export interface IProfileResponse {
  userInfo: IProfileInfo;
  userData: IProfileData;
  userCredits: IProfileCredits;
  userCards: IProfileCard[];
}

export interface IProfileDataUpdateResponse {
  userData: IProfileData;
}

export interface INaturalPersonUpdate {
  cpf?: string;
  name?: string;
  email?: string;
  phone?: string;
  birthDate?: string;
  zipCode?: string;
  state?: string;
  city?: string;
  neighborhood?: string;
  street?: string;
  number?: string;
  additionalDetails?: string;
  alternativeEmail?: string;
}

export interface IPersonUpdateData {
  fieldName: string;
  oldValue: string | undefined;
  newValue: string | undefined;
}

export interface UpdateRawUserDto {
  name: string;
  phone: string;
  birthdate: string;
  zipCode: string;
  state: string;
  city: string;
  region: string;
  street: string;
  streetNumber: string;
  complementary: string;
}
