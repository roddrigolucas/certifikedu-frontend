import { authApi } from '@/services/api/api';
import { IResponseData, PaginationParams } from '@/services/types/interfaces';

import { IUserCertificate } from '../../naturalPerson/certificates/model';
import { ITemplate } from '../../naturalPerson/templates/model';
import { CertificatesEndpoints } from './endpoints';
import {
  IBasicTemplatesResponse,
  ICertificateCreate,
  ICertificateResponse,
  IHistoryEmission,
  IHistoryEmissionEmissor,
} from './types';

const GetCertificates = async (pjId: string, params?: PaginationParams) => {
  try {
    const { data } = await authApi.get<IResponseData<ICertificateResponse>>(
      CertificatesEndpoints.GetAll(pjId),
      {
        params: {
          ...params,
        },
      },
    );

    return data.data.certificateInfo;
  } catch (error) {
    throw new Error('Error getting certificates data');
  }
};

const CreateCertificate = async (pjId: string, data: ICertificateCreate) => {
  try {
    const response = await authApi.post<ICertificateCreate>(
      CertificatesEndpoints.Create(pjId),
      data,
    );

    return response.data;
  } catch (error) {
    throw new Error('Error creating certificate');
  }
};

const CreateTemplate = async (pjId: string, data: any) => {
  try {
    const response = await authApi.post(CertificatesEndpoints.Template(pjId), data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    throw new Error('Error creating template');
  }
};

const EditTemplate = async (pjId: string, templateId: string, data: any) => {
  try {
    const response = await authApi.patch(
      CertificatesEndpoints.EditTemplate(pjId, templateId),
      data,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );

    return response.data;
  } catch (error) {
    throw new Error('Error editing template');
  }
};

const CloneTemplate = async (pjId: string, templateId: string) => {
  try {
    const response = await authApi.post(CertificatesEndpoints.CloneTemplate(pjId, templateId));

    return response.data;
  } catch (error) {
    throw new Error('Error cloning template');
  }
};

const SaveBGImage = async (pjId: string, data: any) => {
  try {
    const response = await authApi.post(CertificatesEndpoints.SaveBgImage(pjId), data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    throw new Error('Error saving backgound image');
  }
};

const GetPrivateBGImage = async (pjId: string) => {
  try {
    const response = await authApi.get(CertificatesEndpoints.GetPrivateBgImage(pjId));

    return response.data;
  } catch (error) {
    throw new Error('Error getting private images');
  }
};

const DeleteBGImageById = async (pjId: string, backgroundImage: string) => {
  try {
    const response = await authApi.delete(
      CertificatesEndpoints.DeleteBgImage(pjId, backgroundImage),
    );

    return response.data;
  } catch (error) {
    throw new Error('Error deleting background image');
  }
};

const GetAllTemplatesBasic = async (pjId: string) => {
  try {
    const { data } = await authApi.get<IBasicTemplatesResponse>(
      CertificatesEndpoints.GetTemplatesBasic(pjId),
    );

    return data;
  } catch (error) {
    throw new Error('Error getting all basic templates');
  }
};

const GetAllTemplates = async (pjId: string) => {
  try {
    const response = await authApi.get(CertificatesEndpoints.GetTemplates(pjId));

    return response.data;
  } catch (error) {
    throw new Error('Error getting all templates');
  }
};

const GetCertificateId = async (pjId: string, certificateId: string) => {
  try {
    const response = await authApi.get<IUserCertificate>(
      CertificatesEndpoints.GetCertificateById(pjId, certificateId),
    );

    return response.data;
  } catch (error) {
    throw new Error('Error getting certificate');
  }
};

const GetTemplatesByIdFunc = async (pjId: string, templateId: string): Promise<ITemplate> => {
  try {
    const response = await authApi.get(CertificatesEndpoints.GetTemplatesById(pjId, templateId));

    return response.data;
  } catch (error) {
    throw new Error('Error getting template by id ');
  }
};

const DeleteTemplatesById = async (pjId: string, templateId: string) => {
  try {
    const response = await authApi.delete(
      CertificatesEndpoints.DeleteTemplatesById(pjId, templateId),
    );

    return response.data;
  } catch (error) {
    throw new Error('Error getting template by id ');
  }
};

const EmitTemplatesToSchool = async (pjId: string, templateId: string) => {
  try {
    const response = await authApi.post(
      CertificatesEndpoints.EmitTemplatesToSchool(pjId, templateId),
    );

    return response.data;
  } catch (error) {
    throw new Error('Error emitting template to school');
  }
};

const EmitTemplatesToCourse = async (pjId: string, templateId: string, courseId: string) => {
  try {
    const response = await authApi.post(
      CertificatesEndpoints.EmitTemplatesToCourse(pjId, templateId, courseId),
    );

    return response.data;
  } catch (error) {
    throw new Error('Error emitting template to course');
  }
};

const EmitTemplatesToStudents = async (
  pjId: string,
  templateId: string,
  data: { cpfs: string[] },
) => {
  try {
    const response = await authApi.post(
      CertificatesEndpoints.EmitTemplatesToStudents(pjId, templateId),
      data,
    );

    return response.data;
  } catch (error) {
    throw new Error('Error emitting template to school');
  }
};

const GetCertificateHistory = async (pjId: string): Promise<IHistoryEmission[]> => {
  try {
    const response = await authApi.get(CertificatesEndpoints.GetCertificateHistory(pjId));

    return response.data.response.data;
  } catch (error) {
    throw new Error('Error getting certificate history');
  }
};

const GetCertificateHistoryById = async (
  pjId: string,
  emissionId: string,
): Promise<IHistoryEmissionEmissor> => {
  try {
    const response = await authApi.get(
      CertificatesEndpoints.GetCertificateHistoryById(pjId, emissionId),
    );

    return response.data;
  } catch (error) {
    throw new Error('Error getting certificate history by id');
  }
};

const SaveBgVersoImage = async (pjId: string, data: any) => {
  try {
    const response = await authApi.post(CertificatesEndpoints.SaveBgVersoImage(pjId), data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    throw new Error('Error saving backgound verso image');
  }
};

const DeleteBgVersoImage = async (pjId: string, reverseId: string) => {
  try {
    const response = await authApi.delete(
      CertificatesEndpoints.DeleteBgVersoImage(pjId, reverseId),
    );

    return response.data;
  } catch (error) {
    throw new Error('Error deleting background verso image');
  }
};

const GetBgVersoImage = async (pjId: string) => {
  try {
    const response = await authApi.get(CertificatesEndpoints.SaveBgVersoImage(pjId));

    return response.data;
  } catch (error) {
    throw new Error('Error getting verso images');
  }
};

export const CertificateService = {
  GetCertificates,
  CreateCertificate,
  CreateTemplate,
  EditTemplate,
  CloneTemplate,
  GetAllTemplatesBasic,
  GetAllTemplates,
  GetTemplatesByIdFunc,
  DeleteTemplatesById,
  EmitTemplatesToSchool,
  GetCertificateId,
  EmitTemplatesToStudents,
  EmitTemplatesToCourse,
  SaveBGImage,
  DeleteBGImageById,
  GetPrivateBGImage,
  GetCertificateHistory,
  GetCertificateHistoryById,
  SaveBgVersoImage,
  DeleteBgVersoImage,
  GetBgVersoImage,
};
