import { UseFormReturn } from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/shared/ui/form';
import { Input } from '@/components/shared/ui/input';
import { Textarea } from '@/components/shared/ui/textarea';

import { FormatCNPJ, FormatPhone } from '@/utils/validation/format';

import { SchoolSchemaNoStudentType } from '../../validation/schema';

interface Props {
  form: UseFormReturn<SchoolSchemaNoStudentType>;
}

export function SchoolForm({ form }: Readonly<Props>) {
  return (
    <div className="grid grid-cols-12 gap-4">
      <FormField
        name="name"
        control={form.control}
        render={({ field }) => (
          <FormItem className="col-span-12 lg:col-span-6">
            <FormLabel>Instituição/Organização</FormLabel>
            <FormControl>
              <Input
                {...field}
                data-testId="name-input"
                placeholder="Digite o nome da sua instituição/organização"
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
            <FormLabel>E-mail Corporativo</FormLabel>
            <FormControl>
              <Input {...field} data-testId="email-input" placeholder="Digite o e-mail" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="phone"
        control={form.control}
        render={({ field }) => (
          <FormItem className="col-span-12 lg:col-span-6">
            <FormLabel>Telefone</FormLabel>
            <FormControl>
              <Input
                {...field}
                data-testId="phone-input"
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
      <FormField
        name="document"
        control={form.control}
        render={({ field }) => (
          <FormItem className="col-span-12 lg:col-span-6">
            <FormLabel>CNPJ</FormLabel>
            <FormControl>
              <Input
                {...field}
                data-testId="document-input"
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
        name="website"
        control={form.control}
        render={({ field }) => (
          <FormItem className="col-span-12 lg:col-span-6">
            <FormLabel>Site</FormLabel>
            <FormControl>
              <Input {...field} data-testId="website-input" placeholder="Digite o Website" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="description"
        control={form.control}
        render={({ field }) => (
          <FormItem className="col-span-12">
            <FormLabel>Descrição</FormLabel>
            <FormControl>
              <Textarea
                {...field}
                data-testId="description-textarea"
                placeholder="Digite a descrição"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
