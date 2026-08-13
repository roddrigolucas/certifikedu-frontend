import { useState } from 'react';

import { useMutation } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';

import { SignInForm } from '@/pages/Authentication/SignIn/SignInForm';
import { AuthenticationPageLayout } from '@/components/layouts/authentication';
import { VerifyEmailAddressPage } from '@/components/pages/Authentication/VerifyEmailAddress';

import useAuthentication, { getJwtToken } from '@/hooks/core/useAuthentication';
import { useCertificateStore } from '@/stores/naturalPerson/certificates';

import { authenticationService } from '@/services/cognito/authentication';
import type { CustomCognitoUser, SignInParameters } from '@/services/cognito/authentication/types';
import { CertificateService } from '@/services/entities/app/naturalPerson/certificates';

import { slideLeft } from '@/utils/animations';
import {
  buildResetEmailPageUrl,
  buildResetPasswordPageUrl,
  buildSignInPageUrl,
  buildUpdatePasswordPageUrl,
} from '@/utils/url';

export const SignInPage = () => {
  const navigate = useNavigate();

  const { setUser } = useAuthentication();
  const { updateLastCertificates } = useCertificateStore();

  const [searchParameters] = useSearchParams();

  const initialEmailAddress = searchParameters.get('emailAddress');

  const [emailAddress, setEmailAddress] = useState(initialEmailAddress ?? '');

  const [password, setPassword] = useState('');

  const {
    mutate: signIn,
    isLoading: isSigningIn,
    error: signInError,
  } = useMutation<CustomCognitoUser, Error, SignInParameters>(
    ({ emailAddress, password }: SignInParameters) =>
      authenticationService.signIn({
        emailAddress,
        password,
      }),
  );

  const handleEmailAddressChange = (newEmailAddress: string) => {
    setEmailAddress(newEmailAddress);
  };

  const handlePasswordChange = (newPassword: string) => {
    setPassword(newPassword);
  };

  const handleSignInFormSubmit = ({ emailAddress, password }: SignInParameters) => {
    signIn(
      { emailAddress, password },
      {
        onSuccess: async (user) => {
          getJwtToken();
          setUser(user);
          if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
            navigate(buildUpdatePasswordPageUrl({ emailAddress }));
          }
          const response = await CertificateService.GetCertificates();

          if (response) {
            updateLastCertificates(response);
          }
        },
        onError: (error) => {
          const isUserNotConfirmedException = error.name === 'UserNotConfirmedException';

          if (isUserNotConfirmedException) {
            authenticationService.resendVerificationCode({ emailAddress });

            toast.success(`O código de verificação enviado`, {
              description: `O código de verificação foi enviado para esse email ${emailAddress}. Verifique a caixa de spam`,
            });

            const verifyEmailAddressPageUrl = buildSignInPageUrl({
              emailAddress,
            });

            navigate(verifyEmailAddressPageUrl, { replace: true });
          }
        },
      },
    );
  };

  return (
    <AuthenticationPageLayout title="Login">
      {!initialEmailAddress && (
        <motion.div
          className="flex flex-col gap-6"
          variants={slideLeft}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <h1 className="text-lg font-bold md:text-xl">Acesse sua conta</h1>

          <SignInForm
            emailAddress={emailAddress}
            onEmailAddressChange={handleEmailAddressChange}
            password={password}
            onPasswordChange={handlePasswordChange}
            onSubmit={handleSignInFormSubmit}
            isSubmitting={isSigningIn}
            errorMessage={signInError?.message}
          />
          <div className="mt-8 inline-flex w-full justify-center">
            <span className="inline-flex items-center gap-1 text-sm">
              Perdeu acesso ao e-mail?
              <Link
                className="font-bold text-primary"
                to={buildResetEmailPageUrl({ emailAddress })}
              >
                Cadastrar novo email
              </Link>
            </span>
          </div>
          <div className=" inline-flex w-full justify-center">
            <span className="inline-flex items-center gap-1 text-sm">
              Esqueceu a senha?
              <Link
                className="font-bold text-primary"
                to={buildResetPasswordPageUrl({ emailAddress })}
              >
                Recuperar
              </Link>
            </span>
          </div>
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
          <VerifyEmailAddressPage />
          {/* <div className=" flex justify-end py-10">
            <ResendEmailCode emailAddress={emailAddress} />
          </div> */}
        </motion.div>
      )}
    </AuthenticationPageLayout>
  );
};
