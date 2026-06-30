import Multiselect from '@cloudscape-design/components/multiselect';
import { UseFormReturn } from 'react-hook-form';
import { toast } from 'sonner';

import { brazilianStatePrefixes } from '@/constants/values';

import { Checkbox } from '@/components/shared/ui/checkbox';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/shared/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/shared/ui/select';

import useRequestProcessor from '@/hooks/core/useRequest';

import {
  educationLevelOptions,
  jobTypeOptions,
  seniorityLevelOptions,
  workModelOptions,
} from '@/services/entities/app/core/resume/model';

import { getCitiesFromState } from '@/utils/getAddress';

import { ProfessionalProfileSchemaAllType } from '../../validation/schema';

interface Props {
  form: UseFormReturn<ProfessionalProfileSchemaAllType>;
}

const itemsPCD = [
  {
    id: 'true',
    label: 'Necessita PCD',
  },
  {
    id: 'false',
    label: 'Não necessita PCD',
  },
];

export function SecondPartProfessionalProfileForm({ form }: Readonly<Props>) {
  const state = form.watch('state');

  const cities = useRequestProcessor().query<string[]>(
    ['cities', state],
    async () => await getCitiesFromState(state ?? ''),
    {
      enabled: !!state,
      onError: (error: any) => {
        toast.error(`${error}`);
      },
    },
  );

  return (
    <div className="grid grid-cols-12 gap-8">
      <FormField
        name="jobPeriod"
        control={form.control}
        render={({ field }) => (
          <FormItem className="col-span-12 lg:col-span-6">
            <FormLabel>Modelo de Trabalho</FormLabel>
            <FormControl>
              <Multiselect
                {...field}
                data-testId="jobPeriod-multiselect"
                selectedOptions={field.value}
                onChange={({ detail }) => field.onChange(detail.selectedOptions)}
                options={workModelOptions.map((theme) => ({
                  label: theme.label,
                  value: theme.value,
                }))}
                filteringType="auto"
                placeholder="Selecione a modalidade"
                virtualScroll={true}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="jobType"
        control={form.control}
        render={({ field }) => (
          <FormItem className="col-span-12 lg:col-span-6">
            <FormLabel>Jornada de trabalho</FormLabel>
            <FormControl>
              <Multiselect
                {...field}
                data-testId="jobType-multiselect"
                selectedOptions={field.value}
                onChange={({ detail }) => field.onChange(detail.selectedOptions)}
                options={jobTypeOptions.map((type) => ({
                  label: type.label,
                  value: type.value,
                }))}
                filteringType="auto"
                placeholder="Selecione a jornada"
                virtualScroll={true}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="seniorityLevel"
        control={form.control}
        render={({ field }) => (
          <FormItem className="col-span-12 lg:col-span-6">
            <FormLabel>Posição</FormLabel>
            <FormControl>
              <Multiselect
                {...field}
                data-testId="seniorityLevel-multiselect"
                selectedOptions={field.value}
                onChange={({ detail }) => field.onChange(detail.selectedOptions)}
                options={seniorityLevelOptions.map((type) => ({
                  label: type.label,
                  value: type.value,
                }))}
                filteringType="auto"
                placeholder="Selecione a posição"
                virtualScroll={true}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="professionalEducationLevel"
        control={form.control}
        render={({ field }) => (
          <FormItem className="col-span-12 lg:col-span-6">
            <FormLabel>Escolaridade</FormLabel>
            <FormControl>
              <Multiselect
                {...field}
                data-testId="professionalEducationLevel-multiselect"
                selectedOptions={field.value}
                onChange={({ detail }) => field.onChange(detail.selectedOptions)}
                options={educationLevelOptions.map((level) => ({
                  label: level.label,
                  value: level.value,
                }))}
                filteringType="auto"
                placeholder="Selecione o nível de formação"
                virtualScroll={true}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="state"
        control={form.control}
        render={({ field }) => (
          <FormItem className="col-span-12 lg:col-span-6">
            <FormLabel>Estado</FormLabel>
            <Select onValueChange={field.onChange} {...field}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue data-testId="state-select" placeholder="Selecione seu estado" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {brazilianStatePrefixes.map((state) => (
                  <SelectItem key={state} value={state}>
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="city"
        control={form.control}
        render={({ field }) => (
          <FormItem className="col-span-12 lg:col-span-6">
            <FormLabel>Cidade</FormLabel>
            <Select onValueChange={field.onChange} {...field}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue data-testId="city-select" placeholder="Selecione sua cidade" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {cities?.data?.map((workModel) => (
                  <SelectItem key={workModel} value={workModel}>
                    {workModel}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="col-span-6 flex flex-col gap-4">
        <FormLabel>Informações sobre candidato PCD</FormLabel>
        <FormField
          control={form.control}
          name="items"
          render={() => (
            <FormItem>
              {itemsPCD.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="items"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.id)}
                            onCheckedChange={() => {
                              return field.onChange([item.id]);
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">{item.label}</FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
