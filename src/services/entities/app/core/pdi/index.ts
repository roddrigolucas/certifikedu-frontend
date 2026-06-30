import { authApi } from '@/services/api/api';

import { PDI } from './endpoints';
import { IExtendedPDI, IPDI, IPDIResponse, WebSocketTokenResponse } from './model';

const CreatePDI = async (data: IPDI) => {
  try {
    const response = await authApi.post(PDI.Root, data);

    return response.data;
  } catch (error) {
    throw new Error('Error creating PDI');
  }
};

const GetPDIs = async (): Promise<IPDIResponse> => {
  try {
    const response = await authApi.get(PDI.Root);

    return response.data;
  } catch (error) {
    throw new Error('Error getting PDIs');
  }
};

const GetPDIsById = async (id: string): Promise<IExtendedPDI> => {
  try {
    const response = await authApi.get(PDI.GetById(id));

    return response.data;
  } catch (error) {
    throw new Error('Error getting PDIs by ID');
  }
};

const MarkSelectedNode = async (nodeId: string, data: { markedAsFinished: boolean }) => {
  try {
    const response = await authApi.patch(PDI.MarkSelected(nodeId), data);

    return response.data;
  } catch (error) {
    throw new Error('Error marking selected node');
  }
};

const GetAutheticatedToken = async (): Promise<WebSocketTokenResponse> => {
  try {
    const response = await authApi.get(PDI.GetAutheticatedToken);

    return response.data;
  } catch (error) {
    throw new Error('Error getting authenticated token');
  }
};

// export const DeleteProfessionalProfile = async () => {
//   try {
//     const response = await authApi.delete(ProfessionalProfile.Root);

//     return response.data;
//   } catch (error) {
//     throw new Error('Error DELETING profile');
//   }
// };

export const PDIService = {
  CreatePDI,
  GetPDIs,
  GetPDIsById,
  MarkSelectedNode,
  GetAutheticatedToken,
};
