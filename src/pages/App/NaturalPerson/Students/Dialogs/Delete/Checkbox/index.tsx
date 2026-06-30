'use client';

import { UseFormReturn } from 'react-hook-form';

import { Checkbox } from '@/components/shared/ui/checkbox';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/shared/ui/form';

import { Ischools } from '@/services/entities/app/legalPerson/students/model';

import { FormSchemaCheckboxSchoolsType } from '../validation/schema';

interface Props {
  schools: Ischools[];
  form: UseFormReturn<FormSchemaCheckboxSchoolsType>;
}

export function CheckboxReactHookFormMultipleSchools({ schools, form }: Props) {
  return (
    <Form {...form}>
      <form className="space-y-8">
        <FormField
          control={form.control}
          name="items"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Instituições</FormLabel>
                <FormDescription>
                  Selecione as instituições que deseja removero aluno.
                </FormDescription>
              </div>
              {schools.map((item) => (
                <FormField
                  key={item.schoolId}
                  control={form.control}
                  name="items"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item.schoolId}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.schoolId)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, item.schoolId])
                                : field.onChange(
                                    field?.value?.filter((value) => value !== item.schoolId),
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">{item.schoolName}</FormLabel>
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
