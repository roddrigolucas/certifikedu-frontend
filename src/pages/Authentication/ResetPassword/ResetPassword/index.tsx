import { useMutation } from '@tanstack/react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';

import { Spacer } from '@/components/core/atoms/Spacer';
import { Title } from '@/components/core/atoms/Title';

import { authenticationService } from '@/services/cognito/authentication';
import type { ChangePasswordParameters } from '@/services/cognito/authentication/types';

import { ChangePasswordForm } from '../../UpdatePassword/ChangePasswordForm';

export const ResetPassword = () => {
  const navigate = useNavigate();

  const [searchParameters] = useSearchParams();

  const emailAddress = searchParameters.get('emailAddress')!;

  const {
    mutate: changePassword,
    isLoading: isResettingPassword,
    error: changePasswordError,
  } = useMutation<unknown, Error, ChangePasswordParameters>(
    ({ emailAddress, verificationCode, newPassword }: ChangePasswordParameters) =>
      authenticationService.changePassword({
        emailAddress,
        verificationCode,
        newPassword,
      }),
  );

  const handleChangePasswordFormSubmit = ({
    verificationCode,
    newPassword,
  }: Omit<ChangePasswordParameters, 'emailAddress'>) => {
    changePassword(
      {
        emailAddress,
        verificationCode,
        newPassword,
      },
      {
        onSuccess: () => {
          toast.success('Sua senha foi reiniciada.');

          navigate('/authentication/sign-in', { replace: true });
        },
      },
    );
  };

  return (
    <>
      <Title>Trocar Senha</Title>
      <Spacer size="large" />
      <ChangePasswordForm
        onSubmit={handleChangePasswordFormSubmit}
        isSubmitting={isResettingPassword}
        errorMessage={changePasswordError?.message}
      />
    </>
  );
};
