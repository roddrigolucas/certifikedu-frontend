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

import { IAbility } from '@/services/entities/app/core/abilities/model';

import { PublishJobSchemaAllType } from '../../validation/schema';

interface Props {
  form: UseFormReturn<PublishJobSchemaAllType>;
}
export function JobOpportunityForm({ form }: Readonly<Props>) {
  const { abilities: allEnabledAbilities, categories: allThemeOptions } = useAbilitie();

  const transformAbilitiesToOptions = (abilities: IAbility) => {
    return Object.keys(abilities).map((tema) => ({
      label: tema,
      options: abilities[tema].map(({ habilidade, habilidadeId }) => ({
        label: habilidade,
        value: habilidadeId,
      })),
    }));
  };

  return (
    <div className="grid grid-cols-12 gap-6">
      <FormField
        name="jobName"
        control={form.control}
        render={({ field }) => (
          <FormItem className="col-span-12">
            <FormLabel>Nome da vaga</FormLabel>
            <FormControl>
              <Input {...field} data-testId="name-input" placeholder="Digite o nome da vaga" />
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
                className="min-h-40"
                {...field}
                data-testId="description-textarea"
                placeholder="Digite a descrição"
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
      <FormField
        name="abilities"
        control={form.control}
        render={({ field }) => (
          <FormItem className="col-span-12">
            <FormLabel>Habilidades</FormLabel>
            <FormControl>
              <Multiselect
                {...field}
                data-testId="abilities-multiselect"
                selectedOptions={field.value}
                onChange={({ detail }) => field.onChange(detail.selectedOptions)}
                options={
                  allEnabledAbilities ? transformAbilitiesToOptions(allEnabledAbilities) : []
                }
                filteringType="auto"
                placeholder="Selecione as habilidades"
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
