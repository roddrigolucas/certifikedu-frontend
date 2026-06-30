import * as yup from 'yup';

import { Courses } from '../../../naturalPerson/templates/model';

export interface IStudent {
  id: string;
  name: string;
  email: string;
  document: string;
  isTemp: boolean;
  certificateQty: number;
  schools: Ischools[];
  courses: Courses[];
}

export interface IStudentIssuerCourse {
  id: string;
  userId?: string;
  name: string;
  email: string;
  document: string;
  isTemporary: boolean;
}

export interface Ischools {
  schoolName: string;
  schoolId: string;
}

export interface IStudentBulk {
  nome?: string;
  email?: string;
  documento?: string;
  phone?: string;
  error?: yup.ValidationError | string;
  isValid?: boolean;
}
