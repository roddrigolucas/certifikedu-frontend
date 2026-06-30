const DEFAULT_ENDPOINT = 'pj';
const BASE_ENDPOINT = 'students';
const STUDENT_ENDPOINT = 'student';

export const StudentsEndpoints = {
  Create: (pjId: string) => `${DEFAULT_ENDPOINT}/${pjId}/${STUDENT_ENDPOINT}`,
  GetAll: (pjId: string) => `${DEFAULT_ENDPOINT}/${pjId}/${BASE_ENDPOINT}/page`,
  Verify: (pjId: string) => `${DEFAULT_ENDPOINT}/${pjId}/${BASE_ENDPOINT}/verify`,
  Associate: (pjId: string, schoolId: string, courseId: string) =>
    `${DEFAULT_ENDPOINT}/${pjId}/${BASE_ENDPOINT}/${schoolId}${courseId}`,
  GetStudentByiD: (pjId: string, schoolId: string) =>
    `${DEFAULT_ENDPOINT}/${pjId}/${BASE_ENDPOINT}/school/${schoolId}`,
  GetStudentByCourse: (pjId: string, courseId: string) =>
    `${DEFAULT_ENDPOINT}/${pjId}/courses/${courseId}/${BASE_ENDPOINT}`,
  RegisterStudentsBulk: (pjId: string) => `${DEFAULT_ENDPOINT}/${pjId}/signup/raw`,
  Delete: (pjId: string, id: string) => `${DEFAULT_ENDPOINT}/${pjId}/${BASE_ENDPOINT}/${id}`,
};
