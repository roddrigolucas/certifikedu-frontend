import { PlusIcon, TrashIcon } from 'lucide-react';
import { useFieldArray, UseFormReturn } from 'react-hook-form';

import { Button } from '@/components/shared/ui/button';
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

export function ActivitiesForm({ form, isEdit }: Readonly<Props>) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'activities',
  });

  return (
    <div>
      {fields.map((field, index) => {
        return (
          <div key={field.id} className="mb-4 space-y-4 rounded-lg border-2 border-dashed p-4 ">
            <h3 className="mt-3 items-center text-center font-bold text-slate-700">
              Atividade {index + 1}
            </h3>
            <div className="grid grid-cols-12 gap-4 p-2">
              <FormField
                name={`activities.${index}.name`}
                control={form.control}
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-9">
                    <FormLabel className="font-bold">Nome *</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isEdit} placeholder="Ex: Visita Técnica" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name={`activities.${index}.hoursWorkload`}
                control={form.control}
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-3">
                    <FormLabel className="font-bold">Carga Horária *</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        disabled={isEdit}
                        data-testId="cargaHoraria-input"
                        placeholder="Digite a carga horária"
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
                name={`activities.${index}.description`}
                control={form.control}
                render={({ field }) => (
                  <FormItem className="col-span-12">
                    <FormLabel className="font-bold">Descrição da Atividade *</FormLabel>
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
            </div>
            {!isEdit && (
              <Button variant="destructive" onClick={() => remove(index)} className="mt-4">
                <TrashIcon className="mr-1 size-4" />
                Remover Atividade
              </Button>
            )}
          </div>
        );
      })}
      {!isEdit && (
        <Button
          type="button"
          variant={'outline'}
          onClick={() =>
            append({
              name: '',
              description: '',
              hoursWorkload: 0,
            })
          }
        >
          <PlusIcon className="mr-1 size-4" />
          Adicionar Atividade
        </Button>
      )}
    </div>
  );
}
