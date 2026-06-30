import { canvasApi } from '@/services/api/canvasApi';
import { IResponseData, PaginationParams } from '@/services/types/interfaces';

import { IUserCertificate } from '../legalPerson/certificates/model';
import { ICertificateResponse } from '../legalPerson/certificates/types';
import { IStudentIssuerCourse } from '../legalPerson/students/model';
import { ITemplate } from '../naturalPerson/templates/model';
import { CanvasEnpoints } from './endpoints';
import { ICanvasInfo } from './model';

const CreateTokenTemp = async (id: string): Promise<{ token: string }> => {
  try {
    const response = await canvasApi.get(CanvasEnpoints.CreateToken(id));

    return response.data;
  } catch (error) {
    throw new Error('Error creating jwt');
  }
};

const GetStudents = async () => {
  try {
    const { data } = await canvasApi.get<{ students: IStudentIssuerCourse[] }>(
      CanvasEnpoints.GetStudents,
    );

    return data.students;
  } catch (error) {
    throw new Error('Error getting students');
  }
};

const ViewCertificateByID = async (certificateId: string) => {
  try {
    const { data } = await canvasApi.get<IUserCertificate>(
      CanvasEnpoints.viewCertificate(certificateId),
    );

    return data;
  } catch (error) {
    throw new Error('Error getting certificate');
  }
};

const GetInfo = async () => {
  try {
    const response = await canvasApi.get<ICanvasInfo>(CanvasEnpoints.GetInfo);

    return response.data;
  } catch (error) {
    throw new Error('Error getting info');
  }
};

const GetCertificates = async (params?: PaginationParams) => {
  try {
    const { data } = await canvasApi.get<IResponseData<ICertificateResponse>>(
      CanvasEnpoints.Certificates,
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

// const GetTemplates = async () => {
//   try {
//     const response = await canvasApi.get<ITemplatesResponse>(CanvasEnpoints.Templates);

//     return response.data;
//   } catch (error) {
//     throw new Error('Error getting templates');
//   }
// };

const CreateTemplate = async (data: any) => {
  try {
    const response = await canvasApi.post(CanvasEnpoints.Templates, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    throw new Error('Error creating template');
  }
};

const DeleteTemplate = async (templateId: string) => {
  try {
    const response = await canvasApi.delete(CanvasEnpoints.TemplateById(templateId));

    return response.data;
  } catch (error) {
    throw new Error('Error deleting template');
  }
};

const EditTemplate = async (templateId: string, data: any) => {
  try {
    const response = await canvasApi.patch(CanvasEnpoints.TemplateById(templateId), data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    throw new Error('Error editing template');
  }
};

const CloneTemplate = async (templateId: string) => {
  try {
    const response = await canvasApi.post(CanvasEnpoints.CloneTemplate(templateId));

    return response.data;
  } catch (error) {
    throw new Error('Error cloning template');
  }
};

const GetTemplateById = async (templateId: string): Promise<ITemplate> => {
  try {
    const response = await canvasApi.get(CanvasEnpoints.TemplateById(templateId));

    return response.data;
  } catch (error) {
    throw new Error('Error getting template by id');
  }
};

const SaveBGImage = async (data: any) => {
  try {
    const response = await canvasApi.post(CanvasEnpoints.Backgrounds, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    throw new Error('Error saving backgound image');
  }
};

const GetPrivateBGImage = async (token: string) => {
  try {
    const response = await canvasApi.get(CanvasEnpoints.Backgrounds, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error('Error getting private images');
  }
};

const DeleteBGImageById = async (backgroundImage: string) => {
  try {
    const response = await canvasApi.delete(CanvasEnpoints.DeleteBGImageById(backgroundImage));

    return response.data;
  } catch (error) {
    throw new Error('Error deleting background image');
  }
};

const EmitTemplatesToStudents = async (templateId: string, data: { userIds: string[] }) => {
  try {
    const response = await canvasApi.post(CanvasEnpoints.EmitTemplatesToStudents(templateId), data);

    return response.data;
  } catch (error) {
    throw new Error('Error emitting template to students');
  }
};

export const CanvasService = {
  CreateTokenTemp,
  GetInfo,
  GetStudents,
  GetCertificates,
  CreateTemplate,
  DeleteTemplate,
  EditTemplate,
  CloneTemplate,
  GetTemplateById,
  SaveBGImage,
  GetPrivateBGImage,
  DeleteBGImageById,
  EmitTemplatesToStudents,
  ViewCertificateByID,
};
