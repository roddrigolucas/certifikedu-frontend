import { Fragment } from 'react';

import { CheckIcon, Clock9Icon, LogOutIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

import { pagePaths } from '@/constants/navigation/pagePaths';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/shared/ui/avatar';
import { Button } from '@/components/shared/ui/button';

import useProfile from '@/hooks/core/useProfile';

import { getInitials } from '@/utils/getInitials';

export function Footer() {
  const { handleSignOut, profileData, profileInfo, isUserEnabled } = useProfile();

  return (
    <Fragment>
      <hr className="border-slate-200" />
      <div className="flex w-full flex-col items-center justify-between gap-2">
        <Link to={pagePaths.authenticated.legalPerson.profile} className="w-full">
          <Button
            aria-label="Meu Perfil"
            variant="ghost"
            className="inline-flex h-fit w-full justify-start gap-3 truncate px-3 py-4 text-left hover:bg-[#fcf2e5]"
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
                {getInitials(profileData?.naturalPerson.name ?? profileInfo?.name ?? '')}
              </AvatarFallback>
            </Avatar>
            <div className="flex w-full flex-col gap-0">
              <span className="text-sm font-bold text-[#4d2f0c]">
                {profileData?.naturalPerson.name ?? profileInfo?.name ?? 'Desconhecido'}
              </span>
              <p className="w-full truncate text-sm text-[#a0661f]">
                {profileData?.naturalPerson.email ?? profileInfo?.email ?? 'E-mail desconhecido'}
              </p>
            </div>
          </Button>
        </Link>
        <Button
          type="button"
          onClick={handleSignOut}
          variant="ghost"
          className="w-full text-[#4d2f0c] hover:bg-[#fcf0e2]"
        >
          <LogOutIcon className="mr-2 size-5" />
          Sair da Conta
        </Button>
      </div>
    </Fragment>
  );
}
