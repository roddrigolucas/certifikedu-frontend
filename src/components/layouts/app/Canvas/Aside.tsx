import { HeadsetIcon, LogOutIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

import { pagePaths } from '@/constants/navigation/pagePaths';
import { CANVAS_TOKEN_KEY } from '@/constants/storage/cookieKeys';

import { Logo } from '@/components/core/atoms/Logo';
import { Button } from '@/components/shared/ui/button';

import useAuthentication from '@/hooks/core/useAuthentication';
import { manageAccessToken } from '@/hooks/core/useAuthentication/token';
import useProfile from '@/hooks/core/useProfile';
import { useProfileStore } from '@/stores/naturalPerson/profile';

import { getImageUrl } from '@/utils/image';

import { SelectAccount } from '../shared/SelectAccount';
import NavigationShared from './NavigationShared';

export function Aside() {
  const { user } = useAuthentication();
  const { profileData, isNaturalPerson } = useProfile();
  const { updateIsCanvas } = useProfileStore();
  const location = window.location.href;

  const handleSignOutCanvas = () => {
    manageAccessToken.remove(CANVAS_TOKEN_KEY);
    updateIsCanvas(null);
  };

  return (
    <aside className="fixed left-0 top-0 z-10 hidden size-full max-h-screen max-w-xs flex-col justify-between gap-8 bg-emerald-950 px-4 pb-8 pt-16 md:flex">
      <div className="flex h-full flex-col gap-8 overflow-y-auto">
        <Logo path={'images/logo_text.svg'} />
        {isNaturalPerson && <SelectAccount />}
        <NavigationShared />
      </div>
      {user && (
        <div className="flex w-full flex-col gap-4">
          <Link
            to={pagePaths.unauthenticated.support(
              profileData?.naturalPerson.name ?? '"SEU NOME"',
              profileData?.naturalPerson.email ?? '"SEU E-MAIL"',
            )}
            target="_blank"
            className="w-full"
          >
            <Button
              variant="secondary"
              className="w-full justify-start bg-blue-zodiac-900/30 text-slate-200 hover:bg-blue-zodiac-900/50 hover:text-white"
            >
              <HeadsetIcon className="mr-4 size-5" />
              <div className="flex w-full flex-col gap-0 text-left">
                <span className="text-sm font-bold text-slate-200">Suporte</span>
                <p className="w-full truncate text-sm text-slate-500">+55 (51) 99280-0702</p>
              </div>
            </Button>
          </Link>
        </div>
      )}
      <>
        <div className="flex justify-center ">
          <img src={getImageUrl('images/brand/canvas_nobg.png')} alt="Canvas" className="w-20 " />
        </div>
      </>
      {location.includes('localhost') && (
        <Button
          type="button"
          onClick={() => handleSignOutCanvas()}
          variant="secondary"
          className="w-full bg-inherit hover:bg-emerald-800"
        >
          <LogOutIcon className="mr-2 size-5" />
          Sair do Canvas
        </Button>
      )}
    </aside>
  );
}
