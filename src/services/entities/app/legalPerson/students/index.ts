import { authApi } from '@/services/api/api';
import { IResponse, PaginationParams } from '@/services/types/interfaces';

import { StudentsEndpoints } from './endpoints';
import { IStudent } from './model';
import { IRegisterStudent, IRegisterUserBulk } from './types';

const GetStudents = async (pjId: string, params?: PaginationParams, schoolId?: string) => {
  try {
    const { data } = await authApi.get<IResponse<Array<IStudent>>>(StudentsEndpoints.GetAll(pjId), {
      params: {
        ...params,
        schoolId,
      },
    });

    return data.response.data;
  } catch (error) {
    throw new Error('Error getting students data');
  }
};

const RegisterStudent = async (pjId: string, data: IRegisterStudent) => {
  try {
    await authApi.post(StudentsEndpoints.Create(pjId), data);
  } catch (error) {
    throw new Error('Error registering student');
  }
};

const GetStudentBySchool = async (pjId: string, schoolId: string) => {
  try {
    const { data } = await authApi.get(StudentsEndpoints.GetStudentByiD(pjId, schoolId));

    return data.students;
  } catch (error) {
    throw new Error('Error getting school students');
  }
};

const GetStudentByCourse = async (pjId: string, courseId: string) => {
  try {
    const { data } = await authApi.get(StudentsEndpoints.GetStudentByCourse(pjId, courseId));

    return data.students;
  } catch (error) {
    throw new Error('Error retriving student');
  }
};

const AssociateStudent = async (
  pjId: string,
  schoolId: string,
  courseId: string,
  document: string,
) => {
  try {
    await authApi.patch(StudentsEndpoints.Associate(pjId, schoolId, courseId), {
      cpfs: [document],
    });
  } catch (error) {
    throw new Error('Error associating student');
  }
};

const VerifyStudent = async (pjId: string, document: string) => {
  try {
    const { data } = await authApi.get<IResponse<Array<IStudent>>>(
      StudentsEndpoints.Verify(pjId + '/' + document),
    );

    return data.response.data;
  } catch (error) {
    throw new Error('Error verifi');
  }
};

const RegisterStudentBulk = async (pjId: string, data: IRegisterUserBulk) => {
  try {
    const response = await authApi.post<IRegisterUserBulk>(
      StudentsEndpoints.RegisterStudentsBulk(pjId),
      data,
    );

    return response.data;
  } catch (error) {
    throw new Error('Error creating certificate');
  }
};

const DeleteStudent = async (pjId: string, id: string, cpfs: string[]) => {
  try {
    const response = await authApi.delete(StudentsEndpoints.Delete(pjId, id), {
      data: {
        cpfs: cpfs,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error('Error deleting student');
  }
};

export const StudentService = {
  GetStudents,
  RegisterStudent,
  VerifyStudent,
  AssociateStudent,
  GetStudentBySchool,
  RegisterStudentBulk,
  DeleteStudent,
  GetStudentByCourse,
};
