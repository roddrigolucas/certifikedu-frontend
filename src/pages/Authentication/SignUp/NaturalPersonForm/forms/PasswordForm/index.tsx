import { useState } from 'react';

import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { Control, UseFormReturn } from 'react-hook-form';

import { PasswordValidation } from '@/components/core/molecules/PasswordValidation';
import { Button } from '@/components/shared/ui/button';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/shared/ui/form';
import { Input } from '@/components/shared/ui/input';

import { LegalPersonSchemaType } from '../../../LegalPersonForm/validation/schema';
import { NaturalPersonSchemaType } from '../../validation/schema';

interface Props {
  form: UseFormReturn<NaturalPersonSchemaType> | UseFormReturn<LegalPersonSchemaType>;
}

export default function PasswordForm({ form }: Props) {
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const watcher = form.watch();

  return (
    <div className="grid grid-cols-12 gap-4">
      <FormField
        name="password"
        control={form.control as Control<NaturalPersonSchemaType> | undefined}
        render={({ field }) => (
          <FormItem className="col-span-12 lg:col-span-6">
            <FormLabel>Senha</FormLabel>
            <FormControl>
              <div className="relative">
                <Input
                  {...field}
                  type={passwordVisibility ? 'text' : 'password'}
                  placeholder="Digite sua senha"
                  className="pr-10"
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
        control={form.control as Control<NaturalPersonSchemaType> | undefined}
        render={({ field }) => (
          <FormItem className="col-span-12 lg:col-span-6">
            <FormLabel>Confirme a senha</FormLabel>
            <FormControl>
              <div className="relative">
                <Input
                  {...field}
                  type={passwordVisibility ? 'text' : 'password'}
                  placeholder="Digite sua senha"
                  className="pr-10"
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

      <div className="col-span-12 md:col-span-6">
        <PasswordValidation
          password={watcher?.password ?? ''}
          confirmPassword={watcher?.confirmPassword ?? ' '}
        />
      </div>
    </div>
  );
}
