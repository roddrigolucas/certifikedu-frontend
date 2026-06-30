export interface Ability {
  category: string;
  ability: string;
  abilityId: string;
}

export interface ICertificate {
  templateId: string;
  createdAt: string;
  schoolName: string;
  name: string;
  hoursWorkload: number;
  categories: string[];
  imageTemplateUrl: string;
}

export interface ITemplate {
  templateId: string;
  schoolId: string;
  description: string;
  descriptionImage: string;
  name: string;
  hoursWorkload: number;
  categories?: string[];
  abilities: Ability[];
  issuedAt: string;
  schoolName: string;
  expiresAt: string;
  createdAt: string;
  updatedAt: string;
  allowedDocuments: Array<string>;
  imageTemplateUrl: string;
  backgroundId: string;
  logoImage: string;
  courses: Courses[];
  emissionQty: number;
  issuesNumberLimit: number;
  startDateTime: string;
  expirationDateTime: string;
}

export interface Courses {
  courseId: string;
  courseName: string;
}
export interface ITemplateResponse {
  templates: ITemplate[];
}

export interface IQrCodeSettings {
  issuesNumberLimit: number;
  startDateTime: string | null;
  expirationDateTime: string | null;
}

export interface IQrCodeStatus {
  templateId: string;
  name: string;
  startDateTime: string;
  hasStarted: boolean;
  isExpired: boolean;
  isLimitOfIssuesReached: boolean;
}
