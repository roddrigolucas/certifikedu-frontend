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

import { PDISchemaAllType } from '../../validation/schema';

interface Props {
  form: UseFormReturn<PDISchemaAllType>;
}
export function SecondPartPDIForm({ form }: Readonly<Props>) {
  return (
    <div className="grid grid-cols-12 gap-6">
      <FormField
        name="academicExperience"
        control={form.control}
        render={({ field }) => (
          <FormItem className="col-span-12">
            <FormLabel>Qual seu nível educacional ou professional atual?</FormLabel>
            <FormControl>
              <Textarea
                className="min-h-32"
                {...field}
                placeholder="Ex: Sou formado em direto há 10 anos, e trabalho com direito tributário para multinacionais"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="previousExperience"
        control={form.control}
        render={({ field }) => (
          <FormItem className="col-span-12">
            <FormLabel>
              Qual experiência prévia você possui com os tópicos que deseja aprender?
            </FormLabel>
            <FormControl>
              <Textarea
                className="min-h-32"
                {...field}
                placeholder="Ex: Não tenho experiência prévia no tópico escolido, apenas EXCEL básico."
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="dailyDedication"
        control={form.control}
        render={({ field }) => (
          <FormItem className="col-span-12">
            <FormLabel>Quanto tempo você conseguirá dedicar por dia?</FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="Ex: 2 horas por dias, e 5 horas aos finais de semana"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
