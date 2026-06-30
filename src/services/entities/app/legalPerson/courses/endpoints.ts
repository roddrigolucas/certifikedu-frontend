const DEFAULT_ENDPOINT = 'pj';
const BASE_ENDPOINT = 'courses';
const COURSE_ENDPOINT = 'course';

export const CourseEndpoints = {
  Create: (pjId: string, schoolId: string) =>
    `${DEFAULT_ENDPOINT}/${pjId}/${BASE_ENDPOINT}/${schoolId}`,
  Edit: (pjId: string, id: string) => `${DEFAULT_ENDPOINT}/${pjId}/${BASE_ENDPOINT}/${id}`,
  Delete: (pjId: string, id: string) => `${DEFAULT_ENDPOINT}/${pjId}/${BASE_ENDPOINT}/${id}`,
  GetAllBySchool: (pjId: string, schoolId: string) =>
    `${DEFAULT_ENDPOINT}/${pjId}/${BASE_ENDPOINT}/${schoolId}`,
  GetOne: (pjId: string, id: string) => `${DEFAULT_ENDPOINT}/${pjId}/${COURSE_ENDPOINT}/${id}`,
  GetStudents: (pjId: string, id: string) =>
    `${DEFAULT_ENDPOINT}/${pjId}/${COURSE_ENDPOINT}/${id}/students`,
  GetTemplates: (pjId: string, id: string) =>
    `${DEFAULT_ENDPOINT}/${pjId}/${COURSE_ENDPOINT}/${id}/templates`,
  AssociateStudents: (pjId: string, id: string) =>
    `${DEFAULT_ENDPOINT}/${pjId}/${COURSE_ENDPOINT}/${id}/student`,
  RegisterCurriculum: (pjId: string, courseId: string) =>
    `${DEFAULT_ENDPOINT}/${pjId}/curriculum/${courseId}`,
  GetCurriculum: (pjId: string, courseId: string) =>
    `${DEFAULT_ENDPOINT}/${pjId}/course/${courseId}/curriculums`,
  GetCurriculumById: (pjId: string, curriculumId: string) =>
    `${DEFAULT_ENDPOINT}/${pjId}/curriculums/${curriculumId}`,
  CurriculumById: (pjId: string, curriculumId: string) =>
    `${DEFAULT_ENDPOINT}/${pjId}/curriculum/${curriculumId}`,
  GetInstitutionalEvents: (pjId: string) => `${DEFAULT_ENDPOINT}/${pjId}/institutional-events`,
  GetSubjects: (pjId: string) => `${DEFAULT_ENDPOINT}/${pjId}/subjects`,
  GetActivities: (pjId: string) => `${DEFAULT_ENDPOINT}/${pjId}/activity`,
  GetInternships: (pjId: string) => `${DEFAULT_ENDPOINT}/${pjId}/internships`,
};
