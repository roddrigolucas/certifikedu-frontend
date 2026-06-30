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
export function PDIForm({ form }: Readonly<Props>) {
  return (
    <div className="grid grid-cols-12 gap-6">
      <FormField
        name="title"
        control={form.control}
        render={({ field }) => (
          <FormItem className="col-span-12">
            <FormLabel>Título</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Escolha um título para seu PDI" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="learningGoal"
        control={form.control}
        render={({ field }) => (
          <FormItem className="col-span-12">
            <FormLabel>Objetivo de Aprendizagem</FormLabel>
            <FormControl>
              <Textarea
                className="min-h-32"
                {...field}
                placeholder="Ex: Quero aprender programação em python nos próximos 6 meses para fazer análises de dados e inferências estátisticas"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="learningTopics"
        control={form.control}
        render={({ field }) => (
          <FormItem className="col-span-12">
            <FormLabel>Escreva com mais detalhes os tópicos que deseja aprender</FormLabel>
            <FormControl>
              <Textarea
                className="min-h-32"
                {...field}
                placeholder="Ex: Quero aprender a escrever classes e funções em python, utilizar modelos de ML, e dominiar a bilbioteca Pandas"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
