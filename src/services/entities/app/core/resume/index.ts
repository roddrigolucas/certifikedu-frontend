import { authApi } from '@/services/api/api';

import { Resumes } from './endpoints';
import { ICreateOrUpdateResume, IResumeListResponse, IResumeResponse } from './model';

export const CreateResume = async (data: ICreateOrUpdateResume): Promise<IResumeResponse> => {
  try {
    const response = await authApi.post(Resumes.Root, data);

    return response.data;
  } catch (error) {
    throw new Error('Error creating resume');
  }
};

export const GetResume = async (resumeId: string): Promise<IResumeResponse> => {
  try {
    const response = await authApi.get(Resumes.GetById(resumeId));

    return response.data;
  } catch (error) {
    throw new Error('Error getting resume');
  }
};

export const UpdateResume = async (
  resumeId: string,
  data: ICreateOrUpdateResume,
): Promise<IResumeResponse> => {
  try {
    const response = await authApi.put(Resumes.GetById(resumeId), data);

    return response.data;
  } catch (error) {
    throw new Error('Error updating resume');
  }
};

export const DeleteResume = async (resumeId: string): Promise<void> => {
  try {
    await authApi.delete(Resumes.GetById(resumeId));
  } catch (error) {
    throw new Error('Error deleting resume');
  }
};

export const ListResumes = async (): Promise<IResumeListResponse> => {
  try {
    const response = await authApi.get(Resumes.Root);

    return response.data;
  } catch (error) {
    throw new Error('Error listing resumes');
  }
};

export const ResumeService = {
  CreateResume,
  GetResume,
  UpdateResume,
  DeleteResume,
  ListResumes,
};
