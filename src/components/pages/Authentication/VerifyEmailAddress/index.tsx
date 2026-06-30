import { useMutation } from '@tanstack/react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';

import { VerifyEmailAddressForm } from '@/components/pages/Authentication/Form/VerifyEmailAddressForm';

import { authenticationService } from '@/services/cognito/authentication';
import type { VerifyEmailAddressParameters } from '@/services/cognito/authentication/types';

import { getImageUrl } from '@/utils/image';
import { buildSignInPageUrl } from '@/utils/url';

export const VerifyEmailAddressPage = () => {
  const navigate = useNavigate();

  const [searchParameters] = useSearchParams();

  const emailAddress = searchParameters.get('emailAddress')!;

  const {
    mutate: verifyEmailAddress,
    isLoading: isVerifyingEmailAddress,
    error: verifyingEmailAddressError,
  } = useMutation<unknown, Error, VerifyEmailAddressParameters>(
    ({ emailAddress, verificationCode }: VerifyEmailAddressParameters) =>
      authenticationService.verifyEmailAddress({
        emailAddress,
        verificationCode,
      }),
  );

  const handleVerifyEmailAddressFormSubmit = ({
    verificationCode,
  }: {
    verificationCode: string;
  }) => {
    verifyEmailAddress(
      { emailAddress, verificationCode },
      {
        onSuccess: () => {
          toast.success('Seu email foi verificado.');

          const signInPageUrl = buildSignInPageUrl();

          navigate(signInPageUrl, { replace: true });
        },
      },
    );
  };

  return (
    <div className="flex flex-col items-center justify-center gap-2 text-center">
      <img
        src={getImageUrl('images/empty/notification.svg')}
        alt="notification"
        className="h-48 w-full"
      />
      <h1 className="text-lg font-bold md:text-xl">Código de verificação de e-mail</h1>
      <VerifyEmailAddressForm
        onSubmit={handleVerifyEmailAddressFormSubmit}
        isSubmitting={isVerifyingEmailAddress}
        errorMessage={verifyingEmailAddressError?.message}
      />
    </div>
  );
};
