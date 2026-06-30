import { useMutation } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';

import { Spacer } from '@/components/core/atoms/Spacer';
import { Title } from '@/components/core/atoms/Title';
import { AuthenticationPageLayout } from '@/components/layouts/authentication';
import { UpdatePasswordForm } from '@/components/pages/Authentication/UpdatePasswordForm';

import { authenticationService } from '@/services/cognito/authentication';
import { UpdatePasswordParameters } from '@/services/cognito/authentication/types';

import { slideLeft } from '@/utils/animations';

export const UpdatePassword = () => {
  const [searchParameters] = useSearchParams();
  const emailAddress = searchParameters.get('emailAddress');

  const {
    mutate: updatePassword,
    isLoading: isUpdatingPassword,
    error: updatePasswordError,
  } = useMutation<unknown, Error, Omit<UpdatePasswordParameters, 'currentPassword'>>(
    ({ user, newPassword }: Omit<UpdatePasswordParameters, 'currentPassword'>) =>
      authenticationService.updatePassword({
        user,
        newPassword,
      }),
  );

  const handleUpdatePasswordFormSubmit = ({
    currentPassword,
    newPassword,
  }: Omit<UpdatePasswordParameters, 'user'>) => {
    const password = currentPassword;
    if (emailAddress) {
      authenticationService
        .signIn({ emailAddress, password })
        .then(async (user) => {
          if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
            updatePassword(
              { user, newPassword },
              {
                onSuccess: () => {
                  toast.success('Senha atualizada com sucesso.');
                  setTimeout(() => {
                    window.location.reload();
                  }, 1500);
                },
                // onError: () => {
                //   toast.error('Erro atualizando a senha.');
                // },
              },
            );
          } else {
          }
        })
        .catch(() => {
          toast.error('Erro no login, por favor, tente logar novamente:');
        });
    }
  };

  return (
    <AuthenticationPageLayout title="Recuperar senha">
      <AnimatePresence>
        <motion.div
          key="_signin"
          variants={slideLeft}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <Title>Atualizar senha</Title>
          <Spacer size="large" />
          <UpdatePasswordForm
            onSubmit={handleUpdatePasswordFormSubmit}
            isSubmitting={isUpdatingPassword}
            errorMessage={updatePasswordError?.message}
          />
        </motion.div>
      </AnimatePresence>
    </AuthenticationPageLayout>
  );
};
