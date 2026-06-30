export enum EmploymentType {
  FULL_TIME = 'FULL_TIME',
  PART_TIME = 'PART_TIME',
  SELF_EMPLOYED = 'SELF_EMPLOYED',
  FREELANCE = 'FREELANCE',
  CONTRACT = 'CONTRACT',
  APPRENTICESHIP = 'APPRENTICESHIP',
  INTERNSHIP = 'INTERNSHIP',
  LEADERSHIP_PROGRAM = 'LEADERSHIP_PROGRAM',
  INDIRECT_CONTRACT = 'INDIRECT_CONTRACT',
}

export enum WorkModel {
  REMOTE = 'REMOTE',
  HYBRID = 'HYBRID',
  ON_SITE = 'ON_SITE',
}

export enum ResumeLanguageLevel {
  ELEMENTARY = 'ELEMENTARY',
  LIMITED_WORKING = 'LIMITED_WORKING',
  PROFESSIONAL_WORKING = 'PROFESSIONAL_WORKING',
  FULL_PROFESSIONAL_WORKING = 'FULL_PROFESSIONAL_WORKING',
  NATIVE = 'NATIVE',
}

export const employmentTypeOptions = [
  { label: 'Tempo Integral', value: 'FULL_TIME' },
  { label: 'Meio Período', value: 'PART_TIME' },
  { label: 'Autônomo', value: 'SELF_EMPLOYED' },
  { label: 'Freelance', value: 'FREELANCE' },
  { label: 'Contrato', value: 'CONTRACT' },
  { label: 'Aprendizagem', value: 'APPRENTICESHIP' },
  { label: 'Estágio', value: 'INTERNSHIP' },
  { label: 'Programa de Liderança', value: 'LEADERSHIP_PROGRAM' },
  { label: 'Contrato Indireto', value: 'INDIRECT_CONTRACT' },
];

export const jobTypeOptions = [
  { label: 'Estágio', value: 'INTERNSHIP' },
  { label: 'Meio Período', value: 'PART_TIME' },
  { label: 'Tempo Integral', value: 'FULL_TIME' },
  { label: 'Temporário', value: 'TEMPORARY' },
  { label: 'Freelancer', value: 'FREELANCER' },
  { label: 'Voluntário', value: 'SELF_EMPLOYED' },
];

export const seniorityLevelOptions = [
  { label: 'Júnior', value: 'JUNIOR' },
  { label: 'Analista', value: 'ANALIST' },
  { label: 'Pleno', value: 'MID_LEVEL' },
  { label: 'Sênior', value: 'SENIOR' },
  { label: 'Gerente', value: 'MANAGER' },
  { label: 'Coordenador', value: 'COORDINATOR' },
  { label: 'Diretor', value: 'DIRECTOR' },
  { label: 'Executivo', value: 'EXECUTIVE' },
];

export const educationLevelOptions = [
  { label: 'Nenhum', value: 'NONE' },
  { label: 'Ensino Fundamental', value: 'ELEMENTARY' },
  { label: 'Ensino Médio', value: 'HIGH_SCHOOL' },
  { label: 'Tecnólogo', value: 'ASSOCIATE' },
  { label: 'Bacharelado', value: 'BACHELOR' },
  { label: 'Mestrado', value: 'MASTER' },
  { label: 'Doutorado', value: 'DOCTORATE' },
  { label: 'Pós-doutorado', value: 'POSTDOCTORATE' },
  // { label: 'VOCATIONAL', value: 'VOCATIONAL' },
  // { label: 'CERTIFICATION', value: 'CERTIFICATION' },
];

export const workModelOptions = [
  { label: 'Remoto', value: 'REMOTE' },
  { label: 'Híbrido', value: 'HYBRID' },
  { label: 'Presencial', value: 'ON_SITE' },
];

export const resumeLanguageLevelOptions = [
  { label: 'Básico', value: 'ELEMENTARY' },
  { label: 'Intermediário', value: 'LIMITED_WORKING' },
  { label: 'Avançado', value: 'PROFESSIONAL_WORKING' },
  { label: 'Fluente', value: 'FULL_PROFESSIONAL_WORKING' },
  { label: 'Nativo', value: 'NATIVE' },
];

export const getResumeLabel = (
  value: string,
  options: { label: string; value: string }[],
): string => {
  const option = options.find((opt) => opt.value === value);

  return option?.label || value;
};

export interface ICertificateResponse {
  certificateId: string;
  name?: string;
  description?: string;
  hash?: string;
  picture: string;
  createdAt: Date;
}

export interface IResumeExperienceResponse {
  resumeExperienceId: string;
  title: string;
  description: string;
  startYear: number;
  startMonth: number;
  endYear: number | undefined;
  endMonth: number | undefined;
  employmentType: EmploymentType;
  workModel: WorkModel;
  certificates: ICertificateResponse[];
  rawPJId: string;
  companyName: string;
  companyEmail: string | undefined;
  companyPhone: string | undefined;
  companyCnpj: string | undefined;
  companyLocation: string | undefined;
}

export interface IResumeEducationResponse {
  resumeEducationId: string;
  title: string;
  description?: string;
  startYear: number;
  startMonth: number;
  endYear: number | undefined;
  endMonth: number | undefined;
  certificates: ICertificateResponse[];
  rawPJId: string;
  institutionName: string;
  institutionEmail: string | undefined;
  institutionPhone: string | undefined;
  institutionCnpj: string | undefined;
  institutionLocation: string | undefined;
}

export interface IResumeLanguage {
  resumeLanguageId: string;
  language: string;
  level: ResumeLanguageLevel;
  certificates: ICertificateResponse[];
}

export interface IResumeResponse {
  data: any;
  resumeId: string;
  description: string;
  title: string;
  createdAt: Date;
  languages: IResumeLanguage[];
  experiences: IResumeExperienceResponse[];
  educations: IResumeEducationResponse[];
}

export interface IResumeListItem {
  resumeId: string;
  title: string;
  createdAt: Date;
  hasPdf: boolean;
  pdfPath: string | null;
}

export interface IResumeListResponse {
  resumes: IResumeListItem[];
}

export interface ICreateOrUpdateResumeExperience {
  resumeExperienceId?: string;
  title: string;
  description?: string;
  startYear: number;
  startMonth: number;
  endYear?: number;
  endMonth?: number;
  employmentType: EmploymentType;
  workModel: WorkModel;
  companyName: string;
  companyEmail?: string;
  companyPhone?: string;
  companyCnpj?: string;
  companyLocation?: string;
  certificates?: string[];
}

export interface ICreateOrUpdateResumeEducation {
  resumeEducationId?: string;
  title: string;
  description?: string;
  startYear: number;
  startMonth: number;
  endYear?: number;
  endMonth?: number;
  institutionName: string;
  institutionEmail?: string;
  institutionPhone?: string;
  institutionCnpj?: string;
  institutionLocation?: string;
  certificates?: string[];
}

export interface ICreateOrUpdateResumeLanguage {
  resumeLanguageId?: string;
  language: string;
  level: ResumeLanguageLevel;
  certificates?: string[];
}

export interface ICreateOrUpdateResume {
  title?: string;
  description?: string;
  experiences?: ICreateOrUpdateResumeExperience[];
  educations?: ICreateOrUpdateResumeEducation[];
  languages?: ICreateOrUpdateResumeLanguage[];
}
