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

import { CurriculumSchemaType } from '../../validation/schema';

interface Props {
  form: UseFormReturn<CurriculumSchemaType>;
  isEdit?: boolean;
}

export function BasicInfoForm({ form, isEdit }: Readonly<Props>) {
  return (
    <div className="grid grid-cols-12 gap-4">
      <FormField
        name="name"
        control={form.control}
        render={({ field }) => (
          <FormItem className="col-span-12">
            <FormLabel className="font-bold">Nome *</FormLabel>
            <FormControl>
              <Input
                {...field}
                disabled={isEdit}
                data-testId="name-input"
                placeholder="Digite o nome do currículo"
              />
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
            <FormLabel className="font-bold">Descrição *</FormLabel>
            <FormControl>
              <Textarea
                {...field}
                disabled={isEdit}
                data-testId="description-input"
                placeholder="Digite a descrição"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="requiredHoursWorkload"
        control={form.control}
        render={({ field }) => (
          <FormItem className="col-span-12 lg:col-span-4">
            <FormLabel className="font-bold">Carga Horária Obrigatória *</FormLabel>
            <FormControl>
              <Input
                {...field}
                type="number"
                disabled={isEdit}
                data-testId="requiredHoursWorkload-input"
                placeholder="Digite a carga horária obrigatória"
                onChange={(e) => {
                  const formattedValue = e.target.value.replace(/\D/g, '');
                  field.onChange(Number(formattedValue));
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="electiveHoursWorkload"
        control={form.control}
        render={({ field }) => (
          <FormItem className="col-span-12 lg:col-span-4">
            <FormLabel>Carga Horária Eletiva</FormLabel>
            <FormControl>
              <Input
                {...field}
                type="number"
                disabled={isEdit}
                data-testId="electiveHoursWorkload-input"
                placeholder="Digite a carga horária eletiva"
                onChange={(e) => {
                  const formattedValue = e.target.value.replace(/\D/g, '');
                  field.onChange(Number(formattedValue));
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="complementaryHoursWorkload"
        control={form.control}
        render={({ field }) => (
          <FormItem className="col-span-12 lg:col-span-4">
            <FormLabel>Carga Horária Complementar</FormLabel>
            <FormControl>
              <Input
                {...field}
                type="number"
                disabled={isEdit}
                data-testId="complementaryHoursWorkload-input"
                placeholder="Digite a carga horária complementar"
                onChange={(e) => {
                  const formattedValue = e.target.value.replace(/\D/g, '');
                  field.onChange(Number(formattedValue));
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
