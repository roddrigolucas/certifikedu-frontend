import { api, authApi } from '@/services/api/api';

import { TemplatesEndpoints } from './endpoints';
import { IQrCodeSettings, IQrCodeStatus } from './model';
import { ICreateCertificate } from './types';

const GetById = async (id: string) => {
  try {
    const response = await api.get<IQrCodeStatus>(TemplatesEndpoints.GetById(id));

    return response.data;
  } catch (error) {
    throw new Error('Error getting template');
  }
};

const CreateCertificate = async (data: ICreateCertificate) => {
  try {
    const response = await api.post<ICreateCertificate>(TemplatesEndpoints.CreateCertificate, data);

    return response.data;
  } catch (error) {
    throw new Error('Error creating certificate');
  }
};

const AddAllowedDocument = async (
  pjId: string,
  templateId: string,
  data: { documents: string[] },
) => {
  try {
    const response = await authApi.patch(
      TemplatesEndpoints.AddAllowedDocument(pjId, templateId),
      data,
    );

    return response.data;
  } catch (error) {
    throw new Error('Error adding allowed document');
  }
};

const SetQrCodeSettings = async (pjId: string, id: string, data: IQrCodeSettings) => {
  try {
    await authApi.patch(TemplatesEndpoints.SetQrCodeSettings(pjId, id), data);
  } catch (error) {
    throw new Error('Error setting qrcode timeout');
  }
};

export const TemplateService = {
  GetById,
  CreateCertificate,
  SetQrCodeSettings,
  AddAllowedDocument,
};
