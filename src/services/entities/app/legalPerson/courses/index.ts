import { authApi } from '@/services/api/api';
import { PaginationParams } from '@/services/types/interfaces';

import { CourseEndpoints } from './endpoints';
import { ICourse } from './model';
import {
  IRegisterCourse,
  IRegisterCurriculum,
  ResponseActivities,
  ResponseCourses,
  ResponseInstitutionalEvents,
  ResponseInternships,
  ResponseSubjects,
} from './types';

const GetCoursesBySchool = async (pjId: string, schoolId: string, params?: PaginationParams) => {
  try {
    const { data } = await authApi.get<ResponseCourses>(
      CourseEndpoints.GetAllBySchool(pjId, schoolId),
      {
        params: {
          ...params,
        },
      },
    );

    return data.courses;
  } catch (error) {
    throw new Error('Error getting courses data');
  }
};

const GetCourse = async (pjId: string, id: string) => {
  try {
    const { data } = await authApi.get<ICourse>(CourseEndpoints.GetOne(pjId, id));

    return data;
  } catch (error) {
    throw new Error('Error getting course');
  }
};

const RegisterCourse = async (pjId: string, schoolId: string, data: IRegisterCourse) => {
  try {
    await authApi.post(CourseEndpoints.Create(pjId, schoolId), data);
  } catch (error) {
    throw new Error('Error registering course');
  }
};

const EditCourse = async (pjId: string, id: string, data: Partial<IRegisterCourse>) => {
  try {
    await authApi.patch(CourseEndpoints.Edit(pjId, id), data);
  } catch (error) {
    throw new Error('Error editing course');
  }
};

const DeleteCourse = async (pjId: string, id: string) => {
  try {
    await authApi.delete(CourseEndpoints.Delete(pjId, id));
  } catch (error) {
    throw new Error('Error deleting course');
  }
};

const RegisterCurriculum = async (pjId: string, courseId: string, data: IRegisterCurriculum) => {
  try {
    await authApi.post(CourseEndpoints.RegisterCurriculum(pjId, courseId), data);
  } catch (error) {
    throw new Error('Error registering curriculum');
  }
};

const EditCurriculum = async (pjId: string, curriculumId: string, data: IRegisterCurriculum) => {
  try {
    await authApi.patch(CourseEndpoints.CurriculumById(pjId, curriculumId), data);
  } catch (error) {
    throw new Error('Error editing curriculum');
  }
};

const DeleteCurriculum = async (pjId: string, curriculumId: string) => {
  try {
    await authApi.delete(CourseEndpoints.CurriculumById(pjId, curriculumId));
  } catch (error) {
    throw new Error('Error deleting curriculum');
  }
};

const GetCurriculums = async (pjId: string, courseId: string) => {
  try {
    const { data } = await authApi.get<IRegisterCurriculum>(
      CourseEndpoints.GetCurriculum(pjId, courseId),
    );

    return data;
  } catch (error) {
    throw new Error('Error getting curriculums');
  }
};

const GetCurriculumById = async (pjId: string, curriculumId: string) => {
  try {
    const { data } = await authApi.get<IRegisterCurriculum>(
      CourseEndpoints.GetCurriculumById(pjId, curriculumId),
    );

    return data;
  } catch (error) {
    throw new Error('Error getting curriculum by id');
  }
};

const GetInstitutionalEvents = async (pjId: string) => {
  try {
    const { data } = await authApi.get<ResponseInstitutionalEvents>(
      CourseEndpoints.GetInstitutionalEvents(pjId),
    );

    return data;
  } catch (error) {
    throw new Error('Error getting institutional events');
  }
};

const GetSubjects = async (pjId: string) => {
  try {
    const { data } = await authApi.get<ResponseSubjects>(CourseEndpoints.GetSubjects(pjId));

    return data;
  } catch (error) {
    throw new Error('Error getting subjects');
  }
};

const GetActivities = async (pjId: string) => {
  try {
    const { data } = await authApi.get<ResponseActivities>(CourseEndpoints.GetActivities(pjId));

    return data;
  } catch (error) {
    throw new Error('Error getting actitivies');
  }
};

const GetInternships = async (pjId: string) => {
  try {
    const { data } = await authApi.get<ResponseInternships>(CourseEndpoints.GetInternships(pjId));

    return data;
  } catch (error) {
    throw new Error('Error getting actitivies');
  }
};

const GetStudents = async (pjId: string, id: string) => {
  try {
    await authApi.get(CourseEndpoints.GetStudents(pjId, id));
  } catch (error) {
    throw new Error('Error getting students from course');
  }
};

const GetTemplates = async (pjId: string, id: string) => {
  try {
    await authApi.get(CourseEndpoints.GetTemplates(pjId, id));
  } catch (error) {
    throw new Error('Error getting templates from course');
  }
};

export const CourseService = {
  GetCoursesBySchool,
  GetCourse,
  RegisterCourse,
  EditCourse,
  DeleteCourse,
  RegisterCurriculum,
  EditCurriculum,
  DeleteCurriculum,
  GetCurriculums,
  GetCurriculumById,
  GetInstitutionalEvents,
  GetSubjects,
  GetActivities,
  GetInternships,
  GetStudents,
  GetTemplates,
};
