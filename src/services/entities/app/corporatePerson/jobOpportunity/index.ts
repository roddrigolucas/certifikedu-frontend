import { authApi } from '@/services/api/api';

import { IProfessionalProfileResponse } from '../../core/professionalProfile/model';
import { CorporateEndpoints } from './endpoints';
import { JobDetail, JobDetailResponse, JobOpportunity } from './types';

const GetProfileInfo = async (pjId: string): Promise<JobOpportunity> => {
  try {
    const { data } = await authApi.get(CorporateEndpoints.GetAll(pjId));

    return data;
  } catch (error) {
    throw new Error('Error getting jobs opportunities data');
  }
};

const RegisterJobOpportunity = async (pjId: string, data: JobDetail) => {
  try {
    await authApi.post(CorporateEndpoints.Create(pjId), data);
  } catch (error) {
    throw new Error('Error registering job opportunity');
  }
};

const GetJobOpportunity = async (pjId: string, jobId: string): Promise<JobDetailResponse> => {
  try {
    const { data } = await authApi.get(CorporateEndpoints.GetJobByiD(pjId, jobId));

    return data;
  } catch (error) {
    throw new Error('Error getting job opportunity');
  }
};

const GetUserByIdInJobOpportunity = async (
  pjId: string,
  jobId: string,
  idPf: string,
): Promise<IProfessionalProfileResponse> => {
  try {
    const { data } = await authApi.get(
      CorporateEndpoints.GetUserByJobIdAndUseriD(pjId, jobId, idPf),
    );

    return data;
  } catch (error) {
    throw new Error('Error getting candidate');
  }
};

// const AssociateStudent = async (
//   pjId: string,
//   schoolId: string,
//   courseId: string,
//   document: string,
// ) => {
//   try {
//     await authApi.patch(StudentsEndpoints.Associate(pjId, schoolId, courseId), {
//       cpfs: [document],
//     });
//   } catch (error) {
//     throw new Error('Error associating student');
//   }
// };

// const VerifyStudent = async (pjId: string, document: string) => {
//   try {
//     const { data } = await authApi.get<IResponse<Array<IStudent>>>(
//       StudentsEndpoints.Verify(pjId + '/' + document),
//     );

//     return data.response.data;
//   } catch (error) {
//     throw new Error('Error verifi');
//   }
// };

// const RegisterStudentBulk = async (pjId: string, data: IRegisterUserBulk) => {
//   try {
//     const response = await authApi.post<IRegisterUserBulk>(
//       StudentsEndpoints.RegisterStudentsBulk(pjId),
//       data,
//     );

//     return response.data;
//   } catch (error) {
//     throw new Error('Error creating certificate');
//   }
// };

// const DeleteStudent = async (pjId: string, id: string, cpfs: string[]) => {
//   try {
//     const response = await authApi.delete(StudentsEndpoints.Delete(pjId, id), {
//       data: {
//         cpfs: cpfs,
//       },
//     });

//     return response.data;
//   } catch (error) {
//     throw new Error('Error deleting student');
//   }
// };

export const CorporativeService = {
  GetProfileInfo,
  RegisterJobOpportunity,
  GetJobOpportunity,
  GetUserByIdInJobOpportunity,
};
