export interface JobOpportunity {
  jobOpportunities: JobOpportunityEntity[];
  inProgress: number;
  closed: number;
}
export interface JobOpportunityEntity {
  jobId: string;
  status: string;
  title: string;
  workModel: string;
  jobOpportunityType: string;
  candidates: number;
  endAt: string; // Using string type to represent ISO date format
  createdAt: string;
  jobCode: number;
}

export interface JobDetail {
  endAt: string; // ISO date format string
  title: string;
  description: string;
  state: string;
  city: string;
  workModel: string;
  type: string;
  status: string;
  abilities: string[];
  workFields: string[];
  minimumExperienceLevel?: number;
  maximumExperienceLevel?: number;
  minimumSalaryRange?: number;
  maximumSalaryRange?: number;
  seniorityLevel: string[];
  educationLevel: string[];
  pcdInfo: string;
}
interface Ability {
  abilityId: string;
  ability: string;
  category: string;
}

export interface Candidate {
  id: string;
  name: string;
  matchScore: number;
}
export interface JobDetailResponse {
  status: string;
  createdAt: string; // ISO date format string
  updatedAt: string; // ISO date format string
  title: string;
  description: string;
  workModel: string;
  abilities: Ability[];
  jobOpportunityType: string;
  workFields: string[];
  candidatesNumber: number;
  endAt: string; // ISO date format string
  city: string;
  state: string;
  jobCode: number;
  minimumExperienceLevel: number;
  maximumExperienceLevel: number;
  minimumSalaryRange: number;
  maximumSalaryRange: number;
  seniorityLevel: string[];
  educationLevel: string[];
  candidates: Candidate[];
}
