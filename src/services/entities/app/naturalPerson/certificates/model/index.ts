import { ECertificateStatus } from '../enums';

export interface IAbilityCertificate {
  ability: string;
  category: string;
}

export interface ICertificate {
  statedIssuer: any;
  certificatePicture: any;
  certificateId: string;
  certificateName: string;
  certificateBadgeId: string;
  certificateAbilities: Array<IAbilityCertificate>;
  certificateDescription: string;
  certificateIssuer: string;
  certificateReceptor: string;
  certificateCreatedAt: string;
  status: ECertificateStatus;
}

export interface IUserCertificate {
  certificateId: string;
  receptorDoc: string;
  receptorName: string;
  description: string;
  issuerName: string;
  hoursWorkload: number;
  name: string;
  abilities: {
    category: string;
    ability: string;
  }[];
  blockchain: boolean;
  openBadge: boolean;
  issuedAt: string;
  status: ECertificateStatus;
  statusRequest: boolean;
  certificateHash: string;
  expiresAt: string | null;
}
