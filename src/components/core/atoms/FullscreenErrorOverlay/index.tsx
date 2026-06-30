import { AirplayIcon, HeadphonesIcon, LogInIcon, LogOutIcon, RefreshCcwIcon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

import { pagePaths } from '@/constants/navigation/pagePaths';

import { Button } from '@/components/shared/ui/button';

import useAuthentication from '@/hooks/core/useAuthentication';
import useProfile from '@/hooks/core/useProfile';

import { Logo } from '../Logo';

interface Props {
  title?: string;
  description?: string;
}
export default function FullscreenErrorOverlay({
  title = 'Erro ao acessar a página',
  description = 'Entre em contato com o suporte ou tente novamente mais tarde.',
}: Readonly<Props>) {
  const location = useLocation();
  const { user } = useAuthentication();
  const { handleSignOut, profileData } = useProfile();

  return (
    <div className="relative flex h-screen w-screen flex-col items-center justify-center gap-8 bg-white px-4 text-center">
      <Logo path={'images/logo_text_color.svg'} className="mr-6 h-8 md:h-12" />
      {/* <img src={getImageUrl('images/error/global.svg')} alt="global" className="h-36 w-full" /> */}
      <div className="flex flex-col items-center justify-center gap-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-bold md:text-xl">{title}</h2>
          <p className="text-sm text-slate-600 md:text-base">{description}</p>
        </div>
        <div className="flex w-full flex-col items-center justify-center gap-2 md:flex-row">
          <Button
            className="w-full md:w-fit"
            variant="outline"
            onClick={() => window.location.reload()}
          >
            <RefreshCcwIcon className="mr-2 size-5" />
            Tentar Novamente
          </Button>
          <Link
            to={pagePaths.unauthenticated.support(
              profileData?.naturalPerson.name ?? '"SEU NOME"',
              profileData?.naturalPerson.email ?? '"SEU E-MAIL"',
            )}
            target="_blank"
            className="w-full md:w-fit"
          >
            <Button className="w-full md:w-fit" variant="secondary">
              <HeadphonesIcon className="mr-2 size-5" /> Entrar em Contato
            </Button>
          </Link>
        </div>
      </div>

      {user ? (
        <footer className="absolute bottom-0 left-0 inline-flex w-full justify-end gap-2 self-start border-t border-slate-100 p-8">
          <Link to={pagePaths.authenticated.dashboard}>
            <Button variant="outline">
              <AirplayIcon className="mr-2 size-5" />
              Ir para Meu Painel
            </Button>
          </Link>
          <Button
            onClick={() => {
              handleSignOut();
              window.location.reload();
            }}
            variant="secondary"
          >
            <LogOutIcon className="mr-2 size-5" />
            Sair da Conta
          </Button>
        </footer>
      ) : (
        <>
          {location.pathname !== pagePaths.unauthenticated.signIn && (
            <footer className="absolute bottom-0 left-0 inline-flex w-full justify-end gap-2 self-start border-t border-slate-100 p-8">
              <Link to={pagePaths.unauthenticated.signIn}>
                <Button variant="outline">
                  <LogInIcon className="mr-2 size-5" />
                  Ir para Login
                </Button>
              </Link>
            </footer>
          )}
        </>
      )}
    </div>
  );
}
