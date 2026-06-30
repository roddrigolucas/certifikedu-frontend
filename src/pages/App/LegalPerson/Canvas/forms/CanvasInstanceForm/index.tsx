import { Control, UseFormReturn } from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/shared/ui/form';
import { Input } from '@/components/shared/ui/input';

import { CanvasSchemaType } from '../../validation/schema';

interface Props {
  form: UseFormReturn<CanvasSchemaType>;
}

export default function URLForm({ form }: Props) {
  return (
    <div className="grid grid-cols-6 gap-4">
      <FormField
        name="url"
        control={form.control as Control<CanvasSchemaType> | undefined}
        render={({ field }) => (
          <FormItem className="col-span-6 lg:col-span-6">
            <FormLabel>URL</FormLabel>
            <FormControl>
              <div className="relative">
                <Input
                  {...field}
                  type="url"
                  placeholder="https://minhainstancia.instructure.com"
                  className="pr-10"
                  required={true}
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
