export interface ITypesResponse {
  id: string;
  name: string;
  description: string;
  totalHoursWorkload: string;
}

export interface IModulesResponse {
  moduleIndex: string;
  events: Array<ITypesResponse>;
  subjects: Array<ITypesResponse>;
  internships: Array<ITypesResponse>;
  activities: Array<ITypesResponse>;
}

export interface ITrails {
  name: string;
  pathId: string;
  createdAt: string;
  description: string;
  totalHoursWorkload: string;
  templateId: string;
  totalModules: string;
  totalStudents: string;
  studentsCompleted: string;
  modules: Array<IModulesResponse>;
}

export interface ITrailsResponse {
  paths: Array<ITrails>;
}

export interface ITrailsModules {
  index: number;
  events?: Array<{ id: string }>;
  subjects?: Array<{ id: string }>;
  internships?: Array<{ id: string }>;
  activities?: Array<{ id: string }>;
}

export interface IRegisterTrail {
  name: string;
  description: string;
  templateId: string;
  modules: Array<ITrailsModules>;
}
