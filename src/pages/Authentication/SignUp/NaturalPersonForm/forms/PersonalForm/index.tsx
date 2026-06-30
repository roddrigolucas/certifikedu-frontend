import { Control, UseFormReturn } from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/shared/ui/form';
import { Input } from '@/components/shared/ui/input';

import { FormatBirthday, FormatCPF, FormatPhone } from '@/utils/validation/format';

import { LegalPersonSchemaType } from '../../../LegalPersonForm/validation/schema';
import { NaturalPersonSchemaType } from '../../validation/schema';

interface Props {
  form: UseFormReturn<NaturalPersonSchemaType> | UseFormReturn<LegalPersonSchemaType>;
  isNaturalPersonType?: boolean;
}

export default function PersonalForm({ form, isNaturalPersonType = false }: Props) {
  return (
    <div className="grid w-full grid-cols-12 gap-4">
      <FormField
        name="name"
        control={form.control as Control<NaturalPersonSchemaType> | undefined}
        render={({ field }) => (
          <FormItem className="col-span-12 lg:col-span-6">
            <FormLabel>Nome</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Digite o nome" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {isNaturalPersonType && (
        <FormField
          name="email"
          control={form.control as Control<NaturalPersonSchemaType> | undefined}
          render={({ field }) => (
            <FormItem className="col-span-12 lg:col-span-6">
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Digite o e-mail" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
      <FormField
        name="birthday"
        control={form.control as Control<NaturalPersonSchemaType> | undefined}
        render={({ field }) => (
          <FormItem className="col-span-12 lg:col-span-6">
            <FormLabel>Data de Nascimento</FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="DD/MM/YYYYY"
                onChange={(e) => {
                  const formattedValue = FormatBirthday(e.target.value);

                  return field.onChange(formattedValue);
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="cpf"
        control={form.control as Control<NaturalPersonSchemaType> | undefined}
        render={({ field }) => (
          <FormItem className="col-span-12 lg:col-span-6">
            <FormLabel>Documento</FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="000.000.000-00 ou 0000-0000"
                onChange={(e) => {
                  const formattedValue = FormatCPF(e.target.value);

                  return field.onChange(formattedValue);
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="phone"
        control={form.control as Control<NaturalPersonSchemaType> | undefined}
        render={({ field }) => (
          <FormItem className="col-span-12 lg:col-span-6">
            <FormLabel>Celular</FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="(31) 9 9999-9999"
                onChange={(e) => {
                  const formattedValue = FormatPhone(e.target.value);

                  return field.onChange(formattedValue);
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
