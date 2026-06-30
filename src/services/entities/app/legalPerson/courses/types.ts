import { ETypeSubject } from '@/pages/App/NaturalPerson/Courses/Curriculum/validation/schema';

import { EducationLevelEnum } from '../school/enums';
import { ICourse } from './model';

export interface IRegisterCourse {
  name: string;
  level: EducationLevelEnum;
  description: string;
  isAcademic?: boolean;
}

export interface IInstitutionalEvents {
  name: string;
  institutionalEventId: string;
}

export interface IActivitiesCurriculum {
  name: string;
  activityId?: string;
  description: string;
  hoursWorkload: number;
  curriculums?: string[];
  studyField?: string;
}

export interface IInternshipsCurriculum {
  name: string;
  internshipId?: string;
  description: string;
  hoursWorkload: number;
  curriculums?: string[];
  studyField?: string;
}

export interface ISubjectsCurriculum {
  name: string;
  subjectId?: string;
  description: string;
  totalHoursWorkload: number;
  praticalHoursWorkload?: number;
  teoricHoursWorkload?: number;
  eadHoursWorkload?: number;
  complementaryHoursWorkload?: number;
  type: ETypeSubject;
}

export interface ISemestersCurriculum {
  semesterNumber: number;
  requiredHoursWorkload: number;
  electiveHoursWorkload?: number;
  complementaryHoursWorkload?: number;
  subjects: Array<ISubjectsCurriculum>;
}

export interface IRegisterCurriculum {
  name: string;
  description: string;
  requiredHoursWorkload: number;
  electiveHoursWorkload?: number;
  complementaryHoursWorkload?: number;
  activities?: Array<IActivitiesCurriculum>;
  internships?: Array<IInternshipsCurriculum>;
  semesters: Array<ISemestersCurriculum>;
}

export interface ResponseCourses {
  courses: Array<ICourse>;
}

export interface ResponseInstitutionalEvents {
  institutionalEvents: Array<IInstitutionalEvents>;
}

export type ResponseSubjects = Array<ISubjectsCurriculum>;

export type ResponseActivities = Array<IActivitiesCurriculum>;

export type ResponseInternships = Array<IInternshipsCurriculum>;
