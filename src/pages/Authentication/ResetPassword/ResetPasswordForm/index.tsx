import { useEffect } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronRight } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/components/shared/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/shared/ui/form';
import { Input } from '@/components/shared/ui/input';

import type { SendPasswordResetEmailFormProps } from './types';
import { ResetPasswordSchema, ResetPasswordSchemaType } from './validation/schema';

export const ResetPasswordForm = ({
  onSubmit,
  isSubmitting,
  errorMessage,
}: SendPasswordResetEmailFormProps) => {
  const form = useForm<ResetPasswordSchemaType>({
    resolver: zodResolver(ResetPasswordSchema),
    mode: 'onChange',
  });

  const handleSubmit = (values: ResetPasswordSchemaType) => {
    const { email } = values;

    onSubmit({ emailAddress: email });
  };

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
    }
  }, [errorMessage]);

  return (
    <>
      <Form {...form}>
        <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(handleSubmit)}>
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input {...field} type="email" placeholder="Digite seu e-mail" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            variant="secondary"
            isLoading={isSubmitting}
            className="group mt-4 pl-6"
          >
            Enviar
            <ChevronRight className="ease ml-1 size-5 transition-transform duration-500 group-hover:translate-x-1" />
          </Button>
        </form>
      </Form>
    </>
  );
};
