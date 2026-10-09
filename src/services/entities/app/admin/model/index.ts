import { EAdminStatus } from '../enum';

export interface IAdminUsers {
  users: Array<IAdmin>;
}

export interface IAdmin {
  userId: string;
  email: string;
  name: string;
  phone: string;
  document: string;
  createdAt: string;
  type: string;
  pictureId: string;
  status: EAdminStatus;
  apiEnabled: boolean;
  hasMoodleIntegration?: boolean;
}

export interface IGetAllUserAdmin {
  status: string;
}

export interface IShowDocumentImageResponse {
  buffer: string;
}

export interface IUpdateUserInfo {
  userToUpdateId: string;
  status: string;
}

export interface IUpdateCertificateInfo {
  certificateId: string;
  status: string;
}

export interface IEmail {
  emailId: string;
  templateName: string;
  templateKey: string;
  subject: string;
  variables: string;
  variablesNames: string[];
  types: string[];
  deletable: boolean;
}

export interface IRegisterEmailTemplate {
  templateName: string;
  templateKey: string;
  subject: string;
  variables: string;
  variablesNames: string[];
  types: string[];
  deletable: boolean;
}

export interface IUpdateEmailTemplate {
  templateName: string;
  templateKey: string;
  subject: string;
  variables: string;
  variablesNames: string[];
  types: string[];
}

export interface IAdminAbility {
  category: string;
  ability: string;
  source: string;
}

export interface IUpdateUserEmail {
  email: string;
}

export interface ICreateUserAdmin {
  email: string;
  documentNumber: string;
  name: string;
  phone?: string;
  password?: string;
  type?: 'PF' | 'PJ';
  status?: string;
}

