export interface IProfessionalProfile {
  description: string;
  state: string;
  city: string;
  workModel: string[];
  opportunityType: string[];
  workFields: string[];
  openToWork: boolean;
  seniorityLevel: string[];
  educationLevel: string[];
  yearsOfExperience: number;
  isPcd: boolean;
}

export interface IProfessionalProfileResponse {
  id: string;
  description: string;
  firstName: string;
  state: string;
  city: string;
  workModel: string[];
  opportunityType: string[];
  workFields: string[];
  openToWork: boolean;
  seniorityLevel: string[];
  educationLevel: string[];
  yearsOfExperience: number;
  isPcd: boolean;
  abilities: IAbilities[];
  certificate?: ICertificate[];
}

interface ICertificate {
  issuerName: string;
  name: string;
  hoursWorkload: 0;
  categories: string[];
  certificateImage: string;
  issuedAt: string;
  expiresAt: string;
  isSelfEmmited: boolean;
}

interface IAbilities {
  abilityId: string;
  ability: string;
  category: string;
}
