// Exemplo: components/forms/CodeVerificationForm/CodeVerificationForm.tsx

import { useEffect } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

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

export interface CodeVerificationFormProps {
  onSubmit: ({ verificationCode }: { verificationCode: string }) => void;
  isSubmitting: boolean;
  errorMessage?: string;
}

export interface CodeVerificationSchemaType {
  verificationCode: string;
}

const CodeVerificationSchema = z.object({
  verificationCode: z.string().min(6, 'O código deve ter pelo menos 6 dígitos.').max(8),
});

export const CodeVerificationForm = ({
  onSubmit,
  isSubmitting,
  errorMessage,
}: CodeVerificationFormProps) => {
  const form = useForm<CodeVerificationSchemaType>({
    resolver: zodResolver(CodeVerificationSchema),
    mode: 'onChange',
    defaultValues: {
      verificationCode: '',
    },
  });

  const handleSubmit = (values: CodeVerificationSchemaType) => {
    onSubmit({ verificationCode: values.verificationCode });
  };

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
    }
  }, [errorMessage]);

  return (
    <Form {...form}>
      <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
          name="verificationCode"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Código de Verificação</FormLabel>
              <FormControl>
                <Input {...field} type="text" placeholder="Ex: 123456" maxLength={8} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" variant="secondary" isLoading={isSubmitting} className="mt-4">
          Confirmar E-mail
        </Button>
      </form>
    </Form>
  );
};
