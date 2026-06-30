import { useEffect } from 'react';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { Button } from '@/components/shared/ui/button';

import { authenticationService } from '@/services/cognito/authentication';
import type { SendCodeResetEmailParameters } from '@/services/cognito/authentication/types';

export const ResendEmailCode = ({
  emailAddress,
  isButtonDisabled,
}: SendCodeResetEmailParameters) => {
  const {
    mutate: sendCodeResetEmail,
    isLoading: isSendingCodeResetEmail,
    error: sendCodeResetEmailError,
  } = useMutation<unknown, Error, SendCodeResetEmailParameters>(
    ({ emailAddress }: SendCodeResetEmailParameters) =>
      authenticationService.resendVerificationCode({ emailAddress }),
  );

  const handleResetCodeFormSubmit = () => {
    sendCodeResetEmail(
      { emailAddress },
      {
        onSuccess: () => {
          toast.success(
            `Um código de verificação foi enviado para ${emailAddress}. Por favor, verifique seu Spam`,
          );
        },
      },
    );
  };

  useEffect(() => {
    if (sendCodeResetEmailError) {
      toast.error(sendCodeResetEmailError.name);
    }
  }, [sendCodeResetEmailError]);

  return (
    <div className="flex flex-col gap-10 ">
      <Button
        className="border-[1px] border-slate-400 bg-transparent text-sm hover:border-[2px] dark:text-gray-800"
        type="submit"
        isLoading={isSendingCodeResetEmail}
        disabled={isButtonDisabled || true}
        onClick={handleResetCodeFormSubmit}
      >
        Reenviar Código
      </Button>
    </div>
  );
};
