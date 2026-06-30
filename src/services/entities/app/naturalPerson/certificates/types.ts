import { IModulesResponse } from '../../legalPerson/trails/types';
import { ICertificate } from './model';

export interface ICertificateResponse {
  certificateInfo: ICertificate[];
  hasNextPage: boolean;
}

export interface ICertificateCreate {
  name: string;
  cargaHoraria: number;
  expireAt?: string;
  habilidades: string[];
  description: string;
  descriptionImage: string;
  descriptionEvidence?: string;
  issuedAt?: string;
  statedIssuer?: string;
  files?: { evidences: Array<File> };
}

export interface ICertificateHash {
  certificateHash: string;
  certificateId: string;
}

export interface ICertificatePublic {
  certificateId: string;
  receptorDoc: string;
  receptorName: string;
  description: string;
  issuerName: string;
  certificatePicture: string;
  openBadgePicture: string;
  hoursWorkload: number;
  name: string;
  abilities: {
    category: string;
    ability: string;
  }[];
  blockchain: boolean;
  openBadge: boolean;
  inverseUrl?: string;
  issuedAt: string;
  expiresAt: string | null;

  pathInfo: {
    name: string;
    createdAt: string;
    description: string;
    totalHoursWorkload: number;
    totalModules: number;
    modules: Array<IModulesResponse>;
  };
}
