import { useState } from 'react';

import { Control, UseFormReturn } from 'react-hook-form';
import { PuffLoader } from 'react-spinners';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/shared/ui/form';
import { Input } from '@/components/shared/ui/input';

import { FetchAndFillAddress } from '@/utils/getAddress';
import { FormatZipCode, removeNonNumeric } from '@/utils/validation/format';

import { LegalPersonSchemaType } from '../../../LegalPersonForm/validation/schema';
import { NaturalPersonSchemaType } from '../../validation/schema';

interface Props {
  form: UseFormReturn<NaturalPersonSchemaType> | UseFormReturn<LegalPersonSchemaType>;
}

export default function AddressForm({ form }: Props) {
  const [isAddressLoading, setIsAddressLoading] = useState(false);

  return (
    <div className="grid w-full grid-cols-12 gap-4">
      <FormField
        name="cep"
        control={form.control as Control<NaturalPersonSchemaType> | undefined}
        render={({ field }) => (
          <FormItem className="col-span-12 lg:col-span-6">
            <FormLabel>CEP</FormLabel>
            <FormControl>
              <div className="relative">
                <Input
                  {...field}
                  placeholder="Digite o CEP"
                  onChange={(e) => {
                    const formattedValue = FormatZipCode(e.target.value);
                    field.onChange(formattedValue);

                    setIsAddressLoading(true);
                    if (formattedValue.length === 9) {
                      FetchAndFillAddress(removeNonNumeric(formattedValue), form, {
                        state: 'state',
                        city: 'city',
                        street: 'street',
                        neighborhood: 'neighborhood',
                      }).then(() => {
                        setIsAddressLoading(false);
                      });
                    }
                  }}
                />
                <div className="absolute right-2 top-3">
                  <PuffLoader loading={isAddressLoading} size="1rem" color="#64748B" />
                </div>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="street"
        control={form.control as Control<NaturalPersonSchemaType> | undefined}
        render={({ field }) => (
          <FormItem className="col-span-12 lg:col-span-6">
            <FormLabel>Rua</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Digite a rua" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="number"
        control={form.control as Control<NaturalPersonSchemaType> | undefined}
        render={({ field }) => (
          <FormItem className="col-span-12 lg:col-span-3">
            <FormLabel>Número</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Digite o número" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="additionalDetails"
        control={form.control as Control<NaturalPersonSchemaType> | undefined}
        render={({ field }) => (
          <FormItem className="col-span-12 lg:col-span-3">
            <FormLabel>Complemento</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Digite o complemento" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        name="state"
        control={form.control as Control<NaturalPersonSchemaType> | undefined}
        render={({ field }) => (
          <FormItem className="col-span-12 lg:col-span-3">
            <FormLabel>Estado</FormLabel>
            <FormControl>
              <Input {...field} placeholder="UF" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="city"
        control={form.control as Control<NaturalPersonSchemaType> | undefined}
        render={({ field }) => (
          <FormItem className="col-span-12 lg:col-span-3">
            <FormLabel>Cidade</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Digite a cidade" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="neighborhood"
        control={form.control as Control<NaturalPersonSchemaType> | undefined}
        render={({ field }) => (
          <FormItem className="col-span-12 lg:col-span-3">
            <FormLabel>Bairro</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Digite o bairro" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
