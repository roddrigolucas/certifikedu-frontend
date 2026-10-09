import { useEffect } from 'react';

import Cookies from 'js-cookie';
import { Loader2 } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';

import { pagePaths } from '@/constants/navigation/pagePaths';
import { ACCESS_TOKEN_KEY } from '@/constants/storage/cookieKeys';

import { AuthenticationPageLayout } from '@/components/layouts/authentication';

import useAuthentication, { getJwtToken } from '@/hooks/core/useAuthentication';

export const MoodleAuthPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { setUser } = useAuthentication();

  useEffect(() => {
    const accessToken = searchParams.get('accessToken');

    if (accessToken) {
      // Save token in cookie with similar config to standard login
      Cookies.set(ACCESS_TOKEN_KEY, accessToken, {
        secure: import.meta.env.PROD,
        sameSite: 'lax',
        path: '/',
        expires: 7, // 7 days expiration
      });

      // Update auth store
      getJwtToken()
        .then(() => {
          toast.success('Autenticado com sucesso via Moodle LTI');
          // Since we might not have full CustomCognitoUser properties right away,
          // the app will reload user info when needed, but we at least set it so App layout knows we are authenticated
          setUser({ email: 'moodle-auth', isLocalAuth: true } as any);
          navigate(pagePaths.authenticated.naturalPerson.dashboard, { replace: true });
        })
        .catch(() => {
          toast.error('Erro ao configurar autenticação');
          navigate(pagePaths.unauthenticated.signIn, { replace: true });
        });
    } else {
      toast.error('Token de acesso não encontrado');
      navigate(pagePaths.unauthenticated.signIn, { replace: true });
    }
  }, [searchParams, navigate, setUser]);

  return (
    <AuthenticationPageLayout title="Moodle Auth">
      <div className="flex size-full flex-col items-center justify-center gap-4">
        <Loader2 className="size-10 animate-spin text-primary" />
        <h2 className="text-xl font-semibold">Autenticando via Moodle...</h2>
        <p className="text-center text-sm text-muted-foreground">
          Aguarde enquanto configuramos sua sessão.
        </p>
      </div>
    </AuthenticationPageLayout>
  );
};
