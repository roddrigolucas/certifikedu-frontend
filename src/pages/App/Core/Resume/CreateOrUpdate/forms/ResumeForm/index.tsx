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

import { ResumeSchemaType } from '../../validation/schema';

export function ResumeForm({ form }: { form: UseFormReturn<ResumeSchemaType> }) {
  return (
    <div className="grid grid-cols-1 gap-6">
      <FormField
        name="title"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Título</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Ex: Desenvolvedor Full Stack" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="description"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Sobre</FormLabel>
            <FormControl>
              <Textarea {...field} placeholder="Digite informações sobre você " className="h-40" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
