import { EducationLevelEnum } from './enums';

export interface IRegisterSchool {
  name: string;
  email: string;
  phone: string;
  document: string;
  website: string;
  description: string;
  courses: Array<{
    name: string;
    level: EducationLevelEnum;
    description: string;
    isAcademic: boolean;
  }>;
  associate: Array<string>;
  students: Array<{
    name: string;
    email: string;
    document: string;
    address: {
      streetNumber: string;
      street: string;
      neighborhood: string;
      zipCode: string;
      city: string;
      state: string;
      complementary: string;
    };
  }>;
}
