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
import { Input } from '@/components/shared/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/shared/ui/select';

import useRequestProcessor from '@/hooks/core/useRequest';

import { getCitiesFromState } from '@/utils/getAddress';
import { FormatBirthday } from '@/utils/validation/format';

import { PublishJobSchemaAllType } from '../../validation/schema';

interface Props {
  form: UseFormReturn<PublishJobSchemaAllType>;
}

const itemsPCD = [
  {
    id: 'PCD_EXCLUSIVE',
    label: 'Vaga exclusiva pra PCD',
  },
  {
    id: 'PCD_ACCEPT',
    label: 'Aceita PCD também',
  },
  {
    id: 'PCD_DONT_ACCEPT',
    label: 'Não aceita PCD',
  },
];

export function SecondPartJobOpportunityForm({ form }: Readonly<Props>) {
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
            <Select onValueChange={field.onChange} {...field}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um modelo de trabalho" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {['REMOTE', 'HYBRID', 'ON_SITE'].map((workModel) => (
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
      <FormField
        name="jobType"
        control={form.control}
        render={({ field }) => (
          <FormItem className="col-span-12 lg:col-span-6">
            <FormLabel>Jornada de trabalho</FormLabel>
            <Select onValueChange={field.onChange} {...field}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a jornada de trabalho" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {[
                  'APPRENTICESHIP',
                  'INTERNSHIP',
                  'PART_TIME',
                  'FULL_TIME',
                  'TEMPORARY',
                  'FREELANCER',
                  'VOLUNTEER',
                ].map((workModel) => (
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
      <FormField
        name="seniorityLevel"
        control={form.control}
        render={({ field }) => (
          <FormItem className="col-span-12 lg:col-span-6">
            <FormLabel>Posição</FormLabel>
            <FormControl>
              <Multiselect
                {...field}
                selectedOptions={field.value}
                onChange={({ detail }) => field.onChange(detail.selectedOptions)}
                options={
                  [
                    'JUNIOR',
                    'ANALIST',
                    'MID_LEVEL',
                    'SENIOR',
                    'MANAGER',
                    'COORDINATOR',
                    'DIRECTOR',
                    'EXECUTIVE',
                  ].map((theme) => ({ label: theme, value: theme })) ?? ([] as any)
                }
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
            <FormLabel>Nível de graduação</FormLabel>
            <FormControl>
              <Multiselect
                {...field}
                selectedOptions={field.value}
                onChange={({ detail }) => field.onChange(detail.selectedOptions)}
                options={
                  [
                    'NONE',
                    'ELEMENTARY',
                    'HIGH_SCHOOL',
                    'ASSOCIATE',
                    'BACHELOR',
                    'MASTER',
                    'DOCTORATE',
                    'POSTDOCTORATE',
                    'VOCATIONAL',
                    'CERTIFICATION',
                  ].map((theme) => ({ label: theme, value: theme })) ?? ([] as any)
                }
                filteringType="auto"
                placeholder="Selecione o nível de graduação"
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
                  <SelectValue placeholder="Selecione seu estado" />
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
                  <SelectValue placeholder="Selecione sua cidade" />
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
      <div className="col-span-12 flex  flex-row items-end justify-between gap-4 lg:col-span-6">
        <FormField
          name="minSalary"
          control={form.control}
          render={({ field }) => (
            <FormItem className="w-full">
              <div className="flex flex-col gap-2">
                <FormLabel>Intervalo de salário R$ (Opcional)</FormLabel>
                <FormLabel>Min</FormLabel>
              </div>
              <FormControl>
                <Input {...field} type="number" placeholder="Digite o valor minímo" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="maxSalary"
          control={form.control}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Max</FormLabel>
              <FormControl>
                <Input {...field} type="number" placeholder="Digite o valor máximo" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <FormField
        name="jobClosingDate"
        control={form.control}
        render={({ field }) => (
          <FormItem className="col-span-12 mt-auto lg:col-span-6">
            <FormLabel>Data de encerramento</FormLabel>
            <FormControl>
              <Input
                {...field}
                onChange={(e) => {
                  if (e.target.value == '') {
                    form.resetField('jobClosingDate');
                  } else {
                    const formattedValue = FormatBirthday(e.target.value);
                    field.onChange(formattedValue);
                  }
                }}
                placeholder="DD/MM/AAAA"
              />
            </FormControl>
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
