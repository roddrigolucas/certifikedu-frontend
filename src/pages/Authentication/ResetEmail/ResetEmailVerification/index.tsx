// Seu arquivo: pages/authentication/VerifyNewEmailPage.tsx

import { useMutation } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';

import { Spacer } from '@/components/core/atoms/Spacer';
import { Title } from '@/components/core/atoms/Title';
import { AuthenticationPageLayout } from '@/components/layouts/authentication';

import { authenticationService } from '@/services/cognito/authentication';
import type { VerifyNewEmailParameters } from '@/services/cognito/authentication/types';

import { slideLeft } from '@/utils/animations';
import { buildSignInPageUrl } from '@/utils/url';

import { CodeVerificationForm } from './CodeVerificationForm.tsx';

interface VerifyCodeFormParameters {
  verificationCode: string;
}

export const VerifyNewEmailPage = () => {
  const navigate = useNavigate();
  const [searchParameters] = useSearchParams();

  const newEmailAddress = searchParameters.get('emailAddress');
  const oldEmailAddress = searchParameters.get('oldEmailAddress');

  const {
    mutate: verifyNewEmail,
    isLoading: isVerifying,
    error: verifyError,
  } = useMutation<unknown, Error, VerifyNewEmailParameters>((params: VerifyNewEmailParameters) =>
    // Chama o serviço que usa Auth.verifyUserAttribute
    authenticationService.verifyEmailUpdate(params),
  );

  const handleVerifyFormSubmit = ({ verificationCode }: VerifyCodeFormParameters) => {
    if (!newEmailAddress) {
      toast.error('E-mail de destino não encontrado. Volte para a tela de login.');

      return;
    }
    verifyNewEmail(
      {
        emailAddress: newEmailAddress,
        verificationCode,
      },
      {
        onSuccess: async () => {
          await authenticationService.syncEmailToDatabase({
            newEmail: newEmailAddress,
            oldEmail: oldEmailAddress as string,
          });
          try {
            toast.success('E-mail atualizado com sucesso!', {
              description: `Seu novo e-mail (${newEmailAddress}) foi confirmado.`,
            });
            navigate(buildSignInPageUrl(), { replace: true });
          } catch (error) {
            console.error('Erro ao sincronizar BD:', error);
            toast.error('Alerta! O e-mail foi trocado, mas houve falha na sincronização do BD.');
            navigate(buildSignInPageUrl(), { replace: true });
          }

          navigate(buildSignInPageUrl(), { replace: true });
        },
        onError: async (error) => {
          toast.error(
            error.message || 'Código inválido ou expirado. Verifique o código e tente novamente.',
          );
        },
      },
    );
  };

  return (
    <AuthenticationPageLayout title="Confirmar Novo E-mail">
      <motion.div
        variants={slideLeft}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <Title>Confirme seu Novo E-mail</Title>
        <Spacer size="medium" />

        <p className="text-center text-sm text-gray-600">
          Enviamos um código de verificação para o seu novo e-mail:
          <span className="font-bold text-primary"> {newEmailAddress}</span>. Digite-o abaixo para
          finalizar a troca.
        </p>
        <Spacer size="large" />
        <CodeVerificationForm
          onSubmit={handleVerifyFormSubmit}
          isSubmitting={isVerifying}
          errorMessage={verifyError?.message}
        />
      </motion.div>
    </AuthenticationPageLayout>
  );
};
