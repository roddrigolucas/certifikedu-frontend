import { useState } from 'react';

import { useMutation } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';

import { ResetPassword } from '@/pages/Authentication/ResetPassword/ResetPassword';
import { ResetPasswordForm } from '@/pages/Authentication/ResetPassword/ResetPasswordForm';
import { Spacer } from '@/components/core/atoms/Spacer';
import { Title } from '@/components/core/atoms/Title';
import { AuthenticationPageLayout } from '@/components/layouts/authentication';

import { authenticationService } from '@/services/cognito/authentication';
import type { SendPasswordResetEmailParameters } from '@/services/cognito/authentication/types';
import { AuthenticationService } from '@/services/entities/authentication';
import {
  ICheckResetPassword,
  IResponseCheckResetPassword,
} from '@/services/entities/authentication/types';

import { slideLeft } from '@/utils/animations';
import { buildResetPasswordPageUrl, buildSignInPageUrl } from '@/utils/url';

export const ResetPasswordPage = () => {
  const navigate = useNavigate();

  const [searchParameters] = useSearchParams();

  const initialEmailAddress = searchParameters.get('emailAddress');

  const [emailAddress, setEmailAddress] = useState(initialEmailAddress ?? '');

  const {
    mutate: sendPasswordResetEmail,
    isLoading: isSendingPasswordResetEmail,
    error: sendPasswordResetEmailError,
  } = useMutation<unknown, Error, SendPasswordResetEmailParameters>(
    ({ emailAddress }: SendPasswordResetEmailParameters) =>
      authenticationService.sendPasswordResetEmail({ emailAddress }),
  );

  const { mutate: checkSendPasswordResetEmail, isLoading: checkIsSendingPasswordResetEmail } =
    useMutation<IResponseCheckResetPassword, Error, ICheckResetPassword>(
      ({ email }: ICheckResetPassword) => AuthenticationService.CheckResetPassword({ email }),
    );

  const handleEmailAddressChange = (newEmailAddress: string) => {
    setEmailAddress(newEmailAddress);
  };

  const handleResetPasswordFormSubmit = ({ emailAddress }: SendPasswordResetEmailParameters) => {
    const email = emailAddress;
    checkSendPasswordResetEmail(
      { email },
      {
        onSuccess: (data: IResponseCheckResetPassword) => {
          if (!data?.hasAccount) {
            toast.error(
              `Este email ${emailAddress} não possui cadastro na CertifikEDU. Cadastre-se agora mesmo!`,
            );
          } else if (data?.isRaw) {
            toast.success(
              `Um novo email com a sua senha foi enviado para ${emailAddress}. Por favor, verifique seu Spam.`,
            );

            navigate(buildSignInPageUrl(), { replace: true });
          } else {
            sendPasswordResetEmail(
              { emailAddress },
              {
                onSuccess: () => {
                  toast.success(
                    `Um código de verificação foi enviado para ${emailAddress}. Por favor, verifique seu Spam.`,
                  );

                  const changePasswordPageUrl = buildResetPasswordPageUrl({
                    emailAddress,
                  });

                  navigate(changePasswordPageUrl, { replace: true });
                },
              },
            );
          }
        },
      },
    );
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
            <Title>Recuperar senha</Title>
            <Spacer size="large" />

            <ResetPasswordForm
              emailAddress={emailAddress}
              onEmailAddressChange={handleEmailAddressChange}
              onSubmit={handleResetPasswordFormSubmit}
              isSubmitting={isSendingPasswordResetEmail || checkIsSendingPasswordResetEmail}
              errorMessage={sendPasswordResetEmailError?.message}
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
