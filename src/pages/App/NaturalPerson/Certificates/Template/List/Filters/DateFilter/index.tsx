'use client';

import { CalendarIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';
import { Trash2Icon } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';

import { CourseSchemaNaturalPersonType } from '@/pages/App/NaturalPerson/Courses/View/validation/schema';
import { Button } from '@/components/shared/ui/button';
import { Calendar } from '@/components/shared/ui/calendar';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
} from '@/components/shared/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/shared/ui/popover';

import { cn } from '@/utils';

interface TemplatesDateFilterProps {
  form: UseFormReturn<CourseSchemaNaturalPersonType>;
}

export function DatePickerWithRange({ form }: TemplatesDateFilterProps) {
  const formDob = form.watch('dob');

  return (
    <Form {...form}>
      <form className="w-full max-w-md space-y-8">
        <FormField
          control={form.control}
          name="dob"
          render={({ field }) => (
            <FormItem className="mt-5 flex flex-col">
              <Popover>
                <div className="flex flex-row">
                  <PopoverTrigger asChild>
                    <FormControl>
                      <div className="w-full">
                        <Button
                          id="date"
                          variant={'outline'}
                          type="button"
                          className={cn(
                            ' pl-3 text-left font-normal w-full',
                            !field.value && 'text-muted-foreground',
                          )}
                        >
                          <CalendarIcon className="mr-2 size-4" />
                          {field?.value?.from ? (
                            field?.value?.to ? (
                              <>
                                {/* {console.log(field?.value)} */}
                                {format(field?.value?.from, 'LLL dd, y')} -{' '}
                                {format(field?.value?.to, 'LLL dd, y')}
                              </>
                            ) : (
                              format(field?.value?.from, 'LLL dd, y')
                            )
                          ) : (
                            <span>Selecione uma data</span>
                          )}
                        </Button>
                      </div>
                    </FormControl>
                  </PopoverTrigger>
                  {!!formDob && (
                    <Button
                      onClick={() => field.onChange(null)}
                      size="icon"
                      type="button"
                      variant="outline"
                      className="my-auto ml-1 flex hover:border-red-100 hover:bg-red-50 hover:text-red-600  "
                    >
                      <Trash2Icon className="size-4" />
                    </Button>
                  )}
                </div>

                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={field?.value?.from}
                    selected={field?.value}
                    onSelect={field.onChange}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
              <FormDescription className="text-center">
                Selecione um período para filtrar os certificados.
              </FormDescription>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
