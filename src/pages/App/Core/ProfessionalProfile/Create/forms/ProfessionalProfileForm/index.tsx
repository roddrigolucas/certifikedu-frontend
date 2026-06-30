import Multiselect from '@cloudscape-design/components/multiselect';
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

import useAbilitie from '@/hooks/core/useAbilitie';

import { ProfessionalProfileSchemaAllType } from '../../validation/schema';

interface Props {
  form: UseFormReturn<ProfessionalProfileSchemaAllType>;
}
export function ProfessionalProfileForm({ form }: Readonly<Props>) {
  const { categories: allThemeOptions } = useAbilitie();

  return (
    <div className="grid grid-cols-12 gap-6">
      <FormField
        name="description"
        control={form.control}
        render={({ field }) => (
          <FormItem className="col-span-12">
            <FormLabel>Descrição</FormLabel>
            <FormControl>
              <Textarea
                data-testId="description-textarea"
                className="min-h-40"
                {...field}
                placeholder="Digite a descrição"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="yearsOfExperience"
        control={form.control}
        render={({ field }) => (
          <FormItem className="col-span-12">
            <FormLabel>Anos de Experiência</FormLabel>
            <FormControl>
              <Input
                type="number"
                data-testId="yearsOfExperience-input"
                {...field}
                placeholder="Digite a quantos anos de experiência"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="categories"
        control={form.control}
        render={({ field }) => (
          <FormItem className="col-span-12">
            <FormLabel>Áreas de Atuação</FormLabel>
            <FormControl>
              <Multiselect
                {...field}
                data-testId="categories-multiselect"
                selectedOptions={field.value}
                onChange={({ detail }) => field.onChange(detail.selectedOptions)}
                options={
                  allThemeOptions?.map((theme) => ({ label: theme, value: theme })) ?? ([] as any)
                }
                filteringType="auto"
                placeholder="Selecione as categorias"
                virtualScroll={true}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
