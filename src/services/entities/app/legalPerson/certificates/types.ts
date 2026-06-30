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
}

export interface IBasicTemplate {
  name: string;
  templateId: string;
}

export interface IBasicTemplatesResponse {
  templates: Array<IBasicTemplate>;
}

export interface ITemplateCreate {
  schoolId: string;
  name: string;
  hoursWorkload: string;
  expireAt?: string;
  abilities: string[];
  description: string;
  issuedAt?: string;
  expiresAt?: string;
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
  hoursWorkload: number;
  name: string;
  abilities: {
    category: string;
    ability: string;
  }[];
  blockchain: boolean;
  openBadge: boolean;
  issuedAt: string;
  expiresAt: string | null;
}

export interface IHistoryEmission {
  emissionId: string;
  templateId: string;
  templateName: string;
  courseName: string;
  createdAt: string;
  schoolName: string;
  certificateSuccessEvents: number;
  certificateFailedEvents: number;
  certificatePendingEvents: number;
}

export interface IHistoryEmissionStudent {
  document: string;
  name: string;
  email: string;
  phoneNumber: string;
  certificateSuccessStatus: string;
}

export interface IHistoryEmissionEmissor extends IHistoryEmission {
  receptors: IHistoryEmissionStudent[];
  emissor: {
    document: string;
    name: string;
    email: string;
  };
}
