import type { FormEvent } from 'react';
import { useEffect, useState } from 'react';

import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp';
import { LockKeyholeIcon } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';

import { Button } from '@/components/shared/ui/button';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/shared/ui/input-otp';

import type { VerifyEmailAddressFormProps } from './types';

export const VerifyEmailAddressForm = ({
  onSubmit,
  isSubmitting,
  errorMessage,
}: VerifyEmailAddressFormProps) => {
  const [searchParameters] = useSearchParams();

  const emailAddress = searchParameters.get('emailAddress')!;
  const [verificationCode, setVerificationCode] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onSubmit({ verificationCode });
  };

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
    }
  }, [errorMessage]);

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col items-center justify-center gap-4 py-4">
        <InputOTP
          maxLength={6}
          pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
          value={verificationCode}
          onChange={(value) => setVerificationCode(value)}
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

        <p className="text-sm text-slate-600">
          Um código de confirmação foi enviado para seu e-mail <strong>{emailAddress}</strong>,
          confira a caixa de Spam
        </p>
      </div>

      <Button variant="secondary" type="submit" isLoading={isSubmitting}>
        <LockKeyholeIcon className="mr-2 size-5" />
        Confirmar código
      </Button>
    </form>
  );
};
