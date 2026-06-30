import { api, authApi } from '@/services/api/api';
import { IResponseData, PaginationParams } from '@/services/types/interfaces';

import { CertificatesEndpoints } from './endpoints';
import { IUserCertificate } from './model';
import {
  ICertificateCreate,
  ICertificateHash,
  ICertificatePublic,
  ICertificateResponse,
} from './types';

const GetCertificates = async (params?: PaginationParams) => {
  try {
    const { data } = await authApi.get<IResponseData<ICertificateResponse>>(
      CertificatesEndpoints.GetAll,
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

const CreateCertificate = async (data: any) => {
  try {
    const response = await authApi.post<ICertificateCreate>(CertificatesEndpoints.Create, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    throw new Error('Error creating certificate');
  }
};

const GetById = async (id: string) => {
  try {
    const response = await authApi.get<IUserCertificate>(CertificatesEndpoints.GetById(id));

    return response.data;
  } catch (error) {
    throw new Error('Error getting certificate');
  }
};

const CreateHash = async (id: string) => {
  try {
    const response = await authApi.get<ICertificateHash>(CertificatesEndpoints.CreateHash(id));

    return response.data;
  } catch (error) {
    throw new Error('Error creating certificate hash');
  }
};

const GetPublic = async (hash: string) => {
  try {
    const response = await api.get<ICertificatePublic>(CertificatesEndpoints.GetPublic(hash));

    return response.data;
  } catch (error) {
    throw new Error('Error getting public certificate');
  }
};

const RequestApproval = async (id: string) => {
  try {
    await authApi.get(CertificatesEndpoints.RequestApproval(id));
  } catch (error) {
    throw new Error('Error requesting approval');
  }
};

const HasAccount = async (emailId: string, documentId: string) => {
  try {
    const response = await api.get(CertificatesEndpoints.HasAccount(emailId, documentId));

    return response.data;
  } catch (error) {
    throw new Error('Error checking if account exists');
  }
};

const CheckCPFIssuer = async (templateId: string, documentId: string) => {
  try {
    const response = await api.get(CertificatesEndpoints.CheckCPFIssuer(templateId, documentId));

    return response.data;
  } catch (error) {
    throw new Error('Error checking if user has permission to issue');
  }
};

export const CertificateService = {
  GetCertificates,
  CreateCertificate,
  GetById,
  CreateHash,
  GetPublic,
  RequestApproval,
  HasAccount,
  CheckCPFIssuer,
};
