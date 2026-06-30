import { useEffect, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { PasswordValidation } from '@/components/core/molecules/PasswordValidation';
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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/shared/ui/input-otp';

import { PasswordSchema, PasswordSchemaType } from '../../SignUp/LegalPersonForm/validation/schema';
import type { ChangePasswordFormProps } from './types';

export const ChangePasswordForm = ({
  onSubmit,
  isSubmitting,
  errorMessage,
}: ChangePasswordFormProps) => {
  const [verificationCode, setVerificationCode] = useState<string>('');

  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const onSubmitForm = (values: PasswordSchemaType) => {
    const newPassword = values.password;
    onSubmit({ verificationCode, newPassword });
  };

  const form = useForm<PasswordSchemaType>({
    resolver: zodResolver(PasswordSchema),
    mode: 'onChange',
  });

  const password = form.watch('password');
  const confirmPassword = form.watch('confirmPassword');

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
    }
  }, [errorMessage]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmitForm)}>
        <div className="space-y-3">
          <FormLabel>Código de verificação</FormLabel>
          <InputOTP
            name="verification-code"
            id="verification-code"
            className="mt-2 w-80"
            type="text"
            maxLength={6}
            onChange={(e) => setVerificationCode(e)}
            disabled={isSubmitting}
            required
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          <FormField
            name="password"
            key="password"
            control={form.control}
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>Nova senha</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      name="password"
                      type={passwordVisibility ? 'text' : 'password'}
                      placeholder="Digite sua senha"
                      className="pr-10"
                      disabled={isSubmitting}
                      required
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
          <FormField
            name="confirmPassword"
            key="confirmPassword"
            control={form.control}
            render={({ field }) => (
              <FormItem className="py-3">
                <FormLabel>Confirme sua senha</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      name="confirmPassword"
                      type={passwordVisibility ? 'text' : 'password'}
                      disabled={isSubmitting}
                      placeholder="Confirme sua senha"
                      required
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
          {!!password && (
            <PasswordValidation
              password={password || ''}
              confirmPassword={confirmPassword || ' '}
            />
          )}
          <Button className="w-full" variant="secondary" type="submit" isLoading={isSubmitting}>
            Trocar senha
          </Button>
        </div>
      </form>
    </Form>
  );
};
