'use client';

import { UseFormReturn } from 'react-hook-form';

import { Checkbox } from '@/components/shared/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/shared/ui/form';

import { FormTypePermission } from '../models';

export const checkboxReactHookFormMultipleItems = [
  {
    id: 'basico',
    label: 'Básico',
  },
  {
    id: 'medio',
    label: 'Intermediário',
  },
  {
    id: 'admin',
    label: 'Avançado',
  },
];

interface CheckBox {
  form: UseFormReturn<FormTypePermission>;
  items: Array<{ id: string; label: string }>;
}

export function CheckboxReactHookFormMultiple({ form, items }: Readonly<CheckBox>) {
  return (
    <Form {...form}>
      <form className="space-y-8">
        <FormField
          control={form.control}
          name="items"
          render={() => (
            <FormItem>
              {items.map((item) => (
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
      </form>
    </Form>
  );
}
