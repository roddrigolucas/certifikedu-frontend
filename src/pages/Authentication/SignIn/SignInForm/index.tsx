import { useEffect, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronRight, EyeIcon, EyeOffIcon } from 'lucide-react';
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

import { AuthenticationCredentials } from '@/services/cognito/authentication/types';

import { SignupSchema, SignupSchemaType } from './validation/schema';

interface Props {
  emailAddress: string;
  onEmailAddressChange: (newEmailAddress: string) => void;
  password: string;
  onPasswordChange: (newPassword: string) => void;
  onSubmit: ({ emailAddress, password }: AuthenticationCredentials) => void;
  isSubmitting: boolean;
  errorMessage?: string;
}

export function SignInForm({ onSubmit, errorMessage, isSubmitting }: Readonly<Props>) {
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const form = useForm<SignupSchemaType>({
    resolver: zodResolver(SignupSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  function handleSubmit(values: SignupSchemaType) {
    const { email, password } = values;
    onSubmit({ emailAddress: email, password });
  }

  useEffect(() => {
    if (errorMessage && errorMessage !== 'User is not confirmed.') {
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
                  <Input
                    {...field}
                    type="email"
                    data-testid="email-input"
                    placeholder="Digite seu e-mail"
                  />
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
                  <div className="relative">
                    <Input
                      {...field}
                      type={passwordVisibility ? 'text' : 'password'}
                      data-testid="password-input"
                      placeholder="Digite sua senha"
                      className="pr-10"
                    />
                    <Button
                      size="icon"
                      variant="ghost"
                      type="button"
                      className="absolute inset-y-[5px] right-1 size-8"
                      onClick={() => setPasswordVisibility(!passwordVisibility)}
                    >
                      {passwordVisibility ? (
                        <EyeOffIcon className="size-5 text-slate-500" />
                      ) : (
                        <EyeIcon className="size-5 text-slate-500" />
                      )}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            data-testid="login-button"
            variant="secondary"
            isLoading={isSubmitting}
            className="group mt-4 pl-6"
          >
            Entrar
            <ChevronRight className="ease ml-1 size-5 transition-transform duration-500 group-hover:translate-x-1" />
          </Button>
        </form>
      </Form>
    </>
  );
}
