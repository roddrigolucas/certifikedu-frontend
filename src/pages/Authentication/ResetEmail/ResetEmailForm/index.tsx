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

import { SendEmailResetFormProps } from './types';
import { ResetEmailSchema, ResetEmailSchemaType } from './validation/schema';

export const ResetEmailForm = ({
  onSubmit,
  isSubmitting,
  errorMessage,
}: SendEmailResetFormProps) => {
  const form = useForm<ResetEmailSchemaType>({
    resolver: zodResolver(ResetEmailSchema),
    mode: 'onChange',
  });

  const handleSubmit = (values: ResetEmailSchemaType) => {
    const { email, password, newEmail } = values;

    onSubmit({
      emailAddress: email,
      password: password,
      newEmailAddress: newEmail,
    });
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
                <FormLabel>E-mail atual</FormLabel>
                <FormControl>
                  <Input {...field} type="email" placeholder="Digite seu e-mail" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input {...field} type="password" placeholder="Digite sua senha" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="newEmail" // Novo campo no Schema
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Novo E-mail</FormLabel>
                <FormControl>
                  <Input {...field} type="email" placeholder="Digite o novo e-mail" />
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
