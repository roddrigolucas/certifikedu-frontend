import { authApi } from '@/services/api/api';

import { IAbility, IAbilityResponse } from '../core/abilities/model';
import { AdminEnpoints } from './endpoints';
import {
  IAdmin,
  IAdminAbility,
  IAdminUsers,
  IGetAllUserAdmin,
  IRegisterEmailTemplate,
  ICreateUserAdmin,
  IShowDocumentImageResponse,
  IUpdateCertificateInfo,
  IUpdateEmailTemplate,
  IUpdateUserInfo,
} from './model';

const GetAllUserAdmin = async (data: IGetAllUserAdmin): Promise<Array<IAdmin>> => {
  try {
    const response = await authApi.get<IAdminUsers>(AdminEnpoints.GetAllUsers(data.status));

    return response.data.users;
  } catch (error) {
    throw new Error('Error getting users');
  }
};

const UploadAdminPublicBGImage = async (data: any) => {
  try {
    const response = await authApi.post(AdminEnpoints.UploadBGImage, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    throw new Error('Error uploading public admin image');
  }
};

const GetAdminPublicBGImage = async () => {
  try {
    const response = await authApi.get(AdminEnpoints.UploadBGImage);

    return response.data;
  } catch (error) {
    throw new Error('Error getting public admin image');
  }
};

const DeleteAdminPublicBGImage = async (backgroundId: string) => {
  try {
    const response = await authApi.delete(AdminEnpoints.DeleteBGImage(backgroundId));

    return response.data;
  } catch (error) {
    throw new Error('Error deleting public admin image');
  }
};

const GetDocPicById = async (id: string) => {
  try {
    const response = await authApi.get<IShowDocumentImageResponse>(AdminEnpoints.GetDocPicById(id));

    return response.data;
  } catch (error) {
    throw new Error('Error fetching user document image');
  }
};

const UpdateUserStatus = async (data: IUpdateUserInfo) => {
  try {
    const response = await authApi.patch(
      AdminEnpoints.UpdateUser(data.status, data.userToUpdateId),
    );

    return response.data;
  } catch (error) {
    throw new Error('Error getting users');
  }
};

const DeleteUser = async (id: string) => {
  try {
    const response = await authApi.delete(AdminEnpoints.DeleteUser(id));
    
return response.data;
  } catch (error) {
    throw new Error('Error deleting user');
  }
};

const GetAllCertificatesById = async (id: string) => {
  try {
    const response = await authApi.get(AdminEnpoints.GetCertificatesById(id));

    return response.data;
  } catch (error) {
    throw new Error('Error creating certificate');
  }
};

const UpdateCertificatesById = async (data: IUpdateCertificateInfo) => {
  try {
    const response = await authApi.patch(AdminEnpoints.UpdateCertificatesById, data);

    return response.data;
  } catch (error) {
    throw new Error('Error creating certificate');
  }
};

// const CreateCertificate = async (data: ICertificateCreate) => {
//   try {
//     const response = await authApi.post<ICertificateCreate>(CertificatesEndpoints.Create, data);

//     return response.data;
//   } catch (error) {
//     throw new Error('Error creating certificate');
//   }
// };

const RegisterEmailTemplate = async (data: IRegisterEmailTemplate) => {
  try {
    await authApi.post(AdminEnpoints.EmailTemplate, data);
  } catch (error) {
    throw new Error('Error registering email');
  }
};

const GetAllEmailTemplate = async () => {
  try {
    const response = await authApi.get(AdminEnpoints.EmailTemplate);

    return response.data;
  } catch (error) {
    throw new Error('Error getting emailssss');
  }
};

const UpdateEmailTemplate = async (id: string, data: IUpdateEmailTemplate) => {
  try {
    await authApi.patch(AdminEnpoints.EmailTemplateById(id), data);
  } catch (error) {
    throw new Error('Error updating email');
  }
};

const DeleteEmailTemplate = async (id: string) => {
  try {
    await authApi.delete(AdminEnpoints.EmailTemplateById(id));
  } catch (error) {
    throw new Error('Error deleting email');
  }
};

const GetAllEnabledAbilities = async () => {
  try {
    const response = await authApi.get<IAbilityResponse[]>(AdminEnpoints.GetEnabledAbilities);

    return response.data;
  } catch (error) {
    throw new Error('Error getting abilities');
  }
};

const GetAllEnabledAbilityThemes = async () => {
  try {
    const response = await authApi.get<IAbility[]>(AdminEnpoints.GetEnabledAbilityThemes);

    return response.data;
  } catch (error) {
    throw new Error('Error getting ability themes');
  }
};

const CreateAbility = async (data: IAdminAbility) => {
  try {
    await authApi.post(AdminEnpoints.CreateAbility, data);
  } catch (error) {
    throw new Error('Error registering ability');
  }
};

const UpdateAbility = async (id: string, data: IAdminAbility) => {
  try {
    await authApi.put(AdminEnpoints.AbilityById(id), data);
  } catch (error) {
    throw new Error('Error updating ability');
  }
};

const DeleteAbility = async (id: string) => {
  try {
    await authApi.delete(AdminEnpoints.AbilityById(id));
  } catch (error) {
    throw new Error('Error deleting ability');
  }
};

const ResetUserPassword = async (
  id: string,
): Promise<{ success: boolean; email?: string; temporaryPassword?: string; emailSent?: boolean }> => {
  try {
    const response = await authApi.patch(AdminEnpoints.ResetUserPassword(id));

    return response.data;
  } catch (error: any) {
    const status = error?.response?.status;
    const apiMsg = error?.response?.data?.message;
    const msg = Array.isArray(apiMsg) ? apiMsg.join(', ') : apiMsg;
    if (status === 404 && !msg) {
      throw new Error('Endpoint de reset não encontrado no servidor (backend desatualizado).');
    }
    throw new Error(msg || error?.message || 'Erro ao resetar a senha do usuário');
  }
};

const UpdateUserEmail = async (id: string, data: { email: string }) => {
  try {
    const response = await authApi.patch(AdminEnpoints.UpdateUserEmail(id), data);

    return response.data;
  } catch (error) {
    throw new Error('Error updating user email');
  }
};

const UpdateUserCadastral = async (id: string, data: { name?: string; phone?: string; document?: string }) => {
  try {
    const response = await authApi.patch(AdminEnpoints.UpdateUserCadastral(id), data);

    return response.data;
  } catch (error) {
    throw new Error('Error updating user cadastral data');
  }
};

const CreateUser = async (data: ICreateUserAdmin) => {
  try {
    const response = await authApi.post(AdminEnpoints.CreateUser, data);

    return response.data;
  } catch (error: any) {
    const message = error?.response?.data?.message || error?.message || 'Erro ao criar usuário';
    throw new Error(Array.isArray(message) ? message.join(', ') : message);
  }
};

const EnableMoodleLTI = async (id: string) => {
  try {
    const response = await authApi.patch(AdminEnpoints.EnableMoodleLTI(id));
    return response.data;
  } catch (error) {
    throw new Error('Error enabling Moodle LTI');
  }
};

const DisableMoodleLTI = async (id: string) => {
  try {
    const response = await authApi.patch(AdminEnpoints.DisableMoodleLTI(id));
    return response.data;
  } catch (error) {
    throw new Error('Error disabling Moodle LTI');
  }
};

export const AdminService = {
  GetAllUserAdmin,
  GetDocPicById,
  UpdateUserStatus,
  GetAllCertificatesById,
  UpdateCertificatesById,
  UploadAdminPublicBGImage,
  GetAdminPublicBGImage,
  DeleteAdminPublicBGImage,
  RegisterEmailTemplate,
  GetAllEmailTemplate,
  UpdateEmailTemplate,
  DeleteEmailTemplate,
  GetAllEnabledAbilities,
  GetAllEnabledAbilityThemes,
  CreateAbility,
  UpdateAbility,
  DeleteAbility,
  DeleteUser,
  ResetUserPassword,
  UpdateUserEmail,
  UpdateUserCadastral,
  CreateUser,
  EnableMoodleLTI,
  DisableMoodleLTI,
};
