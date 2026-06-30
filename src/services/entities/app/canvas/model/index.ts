import { ITemplate } from '../../naturalPerson/templates/model';

export interface ICanvasToken {
  userId: string;
  courseId: string;
  schoolId: string;
}

export interface IStudent {
  userId: string;
  email: string;
  isTemp: boolean;
  name: string;
  document: string;
}

export interface IStudentList {
  students: IStudent[];
}

export interface ICanvasTemplate {
  templateId: string;
  createdAt: string;
  schoolName: string;
  name: string;
  hoursWorkload: number;
  categories: string[];
  imageTemplateUrl: string;
}

export interface ITemplatesResponse {
  templates: ICanvasTemplate[];
}

export interface ICanvasInfo {
  courseName: string;
  totalStudents: number;
  verifiedStudents: number;
  rawStudents: number;
  numberOfEmmitedCertificates: number;
  createdCertificates: ITemplate[];
}
