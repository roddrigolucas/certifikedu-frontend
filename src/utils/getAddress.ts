import { useMutation } from '@tanstack/react-query';
import { UseFormReturn } from 'react-hook-form';
import { toast } from 'sonner';

import { api } from '@/services/api/api';

import { AddressResponse } from './http/types';

export interface IAddress {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  unidade?: string;
  ibge?: string;
  gia?: string;
  erro?: boolean;
}

export async function FetchAddress(zipCode: string): Promise<IAddress | null> {
  try {
    const response = await fetch(`https://viacep.com.br/ws/${zipCode}/json/`);

    if (!response.ok) {
      return null;
    }

    const data: AddressResponse = await response.json();

    if (data.erro) {
      return null;
    }

    return data;
  } catch (err) {
    return null;
  }
}

interface IAddressFormFieldsName {
  state: string;
  city: string;
  street: string;
  neighborhood: string;
}

export async function FetchAndFillAddress(
  zipCode: string,
  form: UseFormReturn<any>,
  fieldNames: IAddressFormFieldsName,
) {
  try {
    const response = await FetchAddress(zipCode);

    if (response) {
      const { uf, localidade, logradouro, bairro } = response;

      form.setValue(fieldNames.state, uf);
      form.setValue(fieldNames.city, localidade);
      form.setValue(fieldNames.street, logradouro);
      form.setValue(fieldNames.neighborhood, bairro);
    }
  } catch (error) {
    toast.error('CEP Inválido');
  }
}

export const useFetchAndFillAddress = (
  form: UseFormReturn<any>,
  fieldNames: IAddressFormFieldsName,
) => {
  const mutation = useMutation(
    async (zipCode: string) => {
      const response = await FetchAddress(zipCode);
      if (!response) {
        throw new Error('CEP Inválido');
      }

      return response;
    },
    {
      onSuccess: (data) => {
        const { uf, localidade, logradouro, bairro } = data;
        form.setValue(fieldNames.state, uf);
        form.setValue(fieldNames.city, localidade);
        form.setValue(fieldNames.street, logradouro);
        form.setValue(fieldNames.neighborhood, bairro);
      },
      onError: (error: Error) => {
        toast.error(error.message);
      },
    },
  );

  return mutation;
};

export const getCitiesFromState = async (stateCode: string): Promise<string[]> => {
  try {
    const response = await api.get(
      `https://brasilapi.com.br/api/ibge/municipios/v1/${stateCode}?providers=dados-abertos-br,gov,wikipedia`,
    ); // Hypothetical endpoint

    return response.data.map((city: any) => city.nome);
  } catch (error) {
    console.error(`Error fetching cities for state ${stateCode}:`, error);

    return [];
  }
};
