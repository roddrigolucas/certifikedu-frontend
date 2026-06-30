import { EducationLevelEnum } from '../../school/enums';

interface ICurriculum {
  curriculumId: string;
  name: string;
}

export interface ICourse {
  courseId: string;
  name: string;
  educationLevel: EducationLevelEnum;
  description: string;
  isAcademic?: boolean;
  curriculums: Array<ICurriculum>;
}
