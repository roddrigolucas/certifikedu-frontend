import { UseFormReturn } from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/shared/ui/form';
import { Input } from '@/components/shared/ui/input';

import { FormatBirthday, FormatCNPJ, FormatPhone } from '@/utils/validation/format';

import { LegalPersonSchemaType } from '../../validation/schema';

interface Props {
  form: UseFormReturn<LegalPersonSchemaType>;
}

export default function CompanyForm({ form }: Props) {
  return (
    <div className="grid w-full grid-cols-12 gap-4">
      <FormField
        name="cnpj"
        control={form.control}
        render={({ field }) => (
          <FormItem className="col-span-12 lg:col-span-6">
            <FormLabel>CNPJ</FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="00.000.000/0000-00"
                onChange={(e) => {
                  const formattedValue = FormatCNPJ(e.target.value);

                  return field.onChange(formattedValue);
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="email"
        control={form.control}
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
      <FormField
        name="companyName"
        control={form.control}
        render={({ field }) => (
          <FormItem className="col-span-12 lg:col-span-6">
            <FormLabel>Razão Social</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Digite a razão social" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="fantasyName"
        control={form.control}
        render={({ field }) => (
          <FormItem className="col-span-12 lg:col-span-6">
            <FormLabel>Nome Fantasia</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Digite o nome fantasia" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="companyPhone"
        control={form.control}
        render={({ field }) => (
          <FormItem className="col-span-12 lg:col-span-6">
            <FormLabel>Telefone Corporativo</FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="Digite o celular"
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
      <FormField
        name="companyDateCreation"
        control={form.control}
        render={({ field }) => (
          <FormItem className="col-span-12 lg:col-span-6">
            <FormLabel>Data de Criação</FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="DD/MM/YYYY"
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
    </div>
  );
}
