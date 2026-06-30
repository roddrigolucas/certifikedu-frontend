import { Fragment } from 'react';

import { CheckIcon, Clock9Icon, LogOutIcon, UserIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

import { pagePaths } from '@/constants/navigation/pagePaths';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/shared/ui/avatar';
import { Button } from '@/components/shared/ui/button';

import useProfile from '@/hooks/core/useProfile';

import { getInitials } from '@/utils/getInitials';

export function Footer() {
  const { handleSignOut, profileData, isUserEnabled } = useProfile();

  return (
    <Fragment>
      <hr className="border-blue-zodiac-900/30" />
      <div className="flex w-full flex-col items-center justify-between gap-2">
        <Link to={pagePaths.authenticated.account.profile} className="w-full">
          <Button
            aria-label="Meu Perfil"
            variant="ghost"
            className="inline-flex h-fit w-full justify-start gap-3 truncate px-3 py-4 text-left hover:bg-blue-zodiac-900/30"
          >
            <Avatar className="relative overflow-visible">
              {isUserEnabled ? (
                <div className="absolute bottom-0 right-0 z-[100] flex size-4 items-center justify-center rounded-full bg-blue-zodiac-500">
                  <CheckIcon className="size-2.5 text-white" />
                </div>
              ) : (
                <div className="absolute bottom-0 right-0 z-[100] flex size-4 items-center justify-center rounded-full bg-ecstasy-500">
                  <Clock9Icon className="size-2.5 text-white" />
                </div>
              )}
              <AvatarImage src="123" />
              <AvatarFallback>
                {profileData?.naturalPerson.name ? (
                  getInitials(profileData.naturalPerson.name)
                ) : (
                  <UserIcon className="size-5" />
                )}
              </AvatarFallback>
            </Avatar>
            <div className="flex w-full flex-col gap-0">
              <span className="text-sm font-bold text-white">
                {profileData?.naturalPerson.name ?? 'Desconhecido'}
              </span>
              <p className="w-full truncate text-sm text-slate-500">
                {profileData?.naturalPerson.email ?? 'E-mail desconhecido'}
              </p>
            </div>
          </Button>
        </Link>
        <Button
          type="button"
          data-testId="logout-button"
          onClick={handleSignOut}
          variant="secondary"
          className="w-full hover:bg-blue-zodiac-900/30"
        >
          <LogOutIcon className="mr-2 size-5" />
          Sair da Conta
        </Button>
      </div>
    </Fragment>
  );
}
