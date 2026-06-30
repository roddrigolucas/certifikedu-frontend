import { useState } from 'react';

import { useMutation } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';

import { ResetPassword } from '@/pages/Authentication/ResetPassword/ResetPassword';
import { Spacer } from '@/components/core/atoms/Spacer';
import { Title } from '@/components/core/atoms/Title';
import { AuthenticationPageLayout } from '@/components/layouts/authentication';

import { authenticationService } from '@/services/cognito/authentication';

import { slideLeft } from '@/utils/animations';
import { buildVerifynewEmailPageUrl } from '@/utils/url';

import { ResetEmailForm } from './ResetEmailForm';
import { StartEmailUpdateParameters } from './ResetEmailForm/types';

export const ResetEmailPage = () => {
  const navigate = useNavigate();

  const [searchParameters] = useSearchParams();

  const initialEmailAddress = searchParameters.get('emailAddress');

  const [emailAddress, setEmailAddress] = useState(initialEmailAddress ?? '');

  const {
    mutate: startEmailUpdate,
    isLoading: isUpdatingEmail,
    error: updateEmailError,
  } = useMutation<unknown, Error, StartEmailUpdateParameters>(
    (params: StartEmailUpdateParameters) =>
      authenticationService.authenticateAndStartEmailUpdate(params),
  );

  const handleEmailAddressChange = (newEmailAddress: string) => {
    setEmailAddress(newEmailAddress);
  };

  const handleResetEmailFormSubmit = (params: StartEmailUpdateParameters) => {
    startEmailUpdate(params, {
      onSuccess: () => {
        toast.success(
          `Um código de verificação foi enviado para o novo email: ${params.newEmailAddress}. Por favor, verifique seu Spam.`,
        );

        const verifyNewEmailPageUrl = buildVerifynewEmailPageUrl({
          emailAddress: params.newEmailAddress,
          oldEmailAddress: params.emailAddress,
        });

        navigate(verifyNewEmailPageUrl, { replace: true });
      },
      onError: (error) => {
        toast.error(
          error.message || 'Erro ao iniciar a troca de e-mail. Verifique suas credenciais.',
        );
      },
    });
  };

  return (
    <AuthenticationPageLayout title="Recuperar senha">
      <AnimatePresence>
        {!initialEmailAddress && (
          <motion.div
            key="_sendEmail"
            variants={slideLeft}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <Title>Alterar email</Title>
            <Spacer size="large" />

            <ResetEmailForm
              emailAddress={emailAddress}
              onEmailAddressChange={handleEmailAddressChange}
              onSubmit={handleResetEmailFormSubmit} // <- Novo handler
              isSubmitting={isUpdatingEmail} // <- Novo isLoading
              errorMessage={updateEmailError?.message} // <- Novo erro
            />
          </motion.div>
        )}
        {initialEmailAddress && (
          <motion.div
            key="_confirmCode"
            variants={slideLeft}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <ResetPassword />
          </motion.div>
        )}
      </AnimatePresence>
    </AuthenticationPageLayout>
  );
};
