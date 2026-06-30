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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/shared/ui/select';

import { resumeLanguageLevelOptions } from '@/services/entities/app/core/resume/model';

import { ResumeSchemaType } from '../../validation/schema';

export function LanguageForm({ form }: { form: UseFormReturn<ResumeSchemaType> }) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'languages',
  });

  return (
    <div>
      {fields.map((field, index) => (
        <div key={field.id} className="mb-4 border p-4">
          <h3 className="text-lg font-semibold">Idioma {index + 1}</h3>
          <div className="grid grid-cols-2 gap-4">
            <FormField
              name={`languages.${index}.language`}
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Idioma</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Ex: Inglês" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name={`languages.${index}.level`}
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nível</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o nível" />
                      </SelectTrigger>
                      <SelectContent>
                        {resumeLanguageLevelOptions.map((level) => (
                          <SelectItem key={level.value} value={level.value}>
                            {level.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button size="sm" variant="destructive" onClick={() => remove(index)} className="mt-4">
            <TrashIcon className="mr-1 size-4" />
            Remover Idioma
          </Button>
        </div>
      ))}
      <Button
        type="button"
        onClick={() => append({ language: '', level: '', certificates: [] })}
        variant={'outline'}
      >
        <PlusIcon className="mr-1" />
        Adicionar Idioma
      </Button>
    </div>
  );
}
