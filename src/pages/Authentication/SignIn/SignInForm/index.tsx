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
                <FormLabel className="text-slate-300 font-medium">E-mail</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      type="email"
                      data-testid="email-input"
                      placeholder="Digite seu e-mail"
                      className="bg-[#101827] border-[rgba(147,197,253,0.3)] text-white placeholder-slate-500 focus:border-blue-400 focus:ring-blue-400/20 pr-10 h-12 rounded-lg"
                    />
                    <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-slate-400">
                      <svg width="18" height="18" viewBox="0 0 38 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.0538 21.8904H11.8495V11.8491H15.0538V21.8904Z" fill="currentColor"/>
                        <path d="M20.3902 21.8904H17.1871V11.8491H20.3902V21.8904Z" fill="currentColor"/>
                        <path d="M25.7279 21.8904H22.5237V11.8491H25.7279V21.8904Z" fill="currentColor"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M3.34671 19.396C3.34671 16.1721 3.5995 14.3526 4.72151 11.5442C5.92188 8.53622 6.46737 8.41264 7.69878 6.55874L10.5342 9.33884C12.2785 8.21607 12.1884 7.3539 16.1427 5.35856C22.4211 2.19131 29.6439 2.9418 35.4269 6.96377C35.9266 7.31072 36.3139 7.59364 36.7249 8.00463C37.1816 8.46326 37.5926 8.6628 37.9637 9.10506C41.1657 12.9216 43.2914 16.6546 43.2914 22.3682C43.2914 26.0224 41.9299 30.4777 39.8293 33.2845C39.4568 33.7818 39.2217 34.041 38.9394 34.58L36.0227 31.7255C33.7077 33.368 34.2813 33.7745 30.2367 35.8324C25.691 38.1463 19.2974 38.3176 14.589 36.0945C13.5631 35.6105 12.4293 35.0237 11.5852 34.4237C10.58 33.7104 9.94133 33.1565 9.06028 32.269C5.65874 28.8411 3.34818 24.505 3.34818 19.393L3.34671 19.396ZM10.6509 4.83739L7.73574 1.82499C6.57232 2.62165 4.53821 5.06521 3.71776 6.30709C-0.269176 12.3319 -1.10441 20.1852 1.47964 26.7565C4.69786 34.9418 12.7368 41.0009 21.3759 41.0009C22.6271 41.0009 24.9175 39.8657 28.8392 27.2206L31.3118 31.6439C31.8019 31.6439 33.2607 29.6736 33.6474 29.1499C36.3519 25.4956 37.4704 22.3627 37.4704 17.3757C37.4704 12.8333 34.7338 7.07197 31.5913 4.64857C29.8304 3.29064 29.4484 2.73333 26.8808 1.58156C25.2281 0.840873 23.6587 0.381844 21.8026 0.144537C19.8417 -0.105953 18.1866 -0.026851 16.3162 0.350682C15.3072 0.55443 14.2899 0.822898 13.3797 1.17287C12.5004 1.51204 11.5783 1.9519 10.831 2.38577C10.0053 2.86518 9.34253 3.37334 8.57389 3.8923L8.57274 3.89351Z" fill="currentColor"/>
                      </svg>
                    </div>
                  </div>
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
                <FormLabel className="text-slate-300 font-medium">Senha</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      type={passwordVisibility ? 'text' : 'password'}
                      data-testid="password-input"
                      placeholder="Digite sua senha"
                      className="bg-[#101827] border-[rgba(147,197,253,0.3)] text-white placeholder-slate-500 focus:border-blue-400 focus:ring-blue-400/20 pr-10 h-12 rounded-lg"
                    />
                    <Button
                      size="icon"
                      variant="ghost"
                      type="button"
                      className="absolute inset-y-[8px] right-2 size-8 text-slate-400 hover:text-white hover:bg-transparent"
                      onClick={() => setPasswordVisibility(!passwordVisibility)}
                    >
                      {passwordVisibility ? (
                        <EyeOffIcon className="size-5" />
                      ) : (
                        <EyeIcon className="size-5" />
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
            isLoading={isSubmitting}
            className="group mt-6 h-12 border border-[#F59E0B] bg-[#0A0F1D] text-white hover:bg-[#F59E0B] hover:text-[#0A0F1D] font-bold rounded-lg transition-all duration-300 flex justify-center items-center gap-1"
          >
            Entrar
            <ChevronRight className="ease ml-1 size-5 transition-transform duration-500 group-hover:translate-x-1" />
          </Button>
        </form>
      </Form>
    </>
  );
}
