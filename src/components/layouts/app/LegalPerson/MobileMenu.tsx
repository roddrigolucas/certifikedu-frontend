import { CheckIcon, Clock9Icon, LogOutIcon, MenuIcon, XIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

import { pagePaths } from '@/constants/navigation/pagePaths';

import { Logo } from '@/components/core/atoms/Logo';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/shared/ui/avatar';
import { Button } from '@/components/shared/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from '@/components/shared/ui/sheet';

import useAuthentication from '@/hooks/core/useAuthentication';
import useProfile from '@/hooks/core/useProfile';

import { SelectAccount } from '../shared/SelectAccount';
import NavigationShared from './NavigationShared';

export function MobileMenu() {
  const { user } = useAuthentication();
  const { profileData, profileInfo, isUserEnabled, isNaturalPerson, handleSignOut } = useProfile();

  function getInitials(name: string) {
    const nameArray = name.split(' ');
    const firstName = nameArray[0].charAt(0).toUpperCase();
    const lastName = nameArray[nameArray.length - 1].charAt(0).toUpperCase();

    return firstName + lastName;
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="inline-flex md:hidden">
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="bg-darkGray h-screen w-full flex-col justify-between gap-8 overflow-y-auto border-0 p-4 py-6"
      >
        <SheetHeader className="inline-flex w-full flex-row items-center justify-between gap-8 pb-12">
          <Logo path={'images/logo_text_color.svg'} className="mt-2 h-8" />
          <SheetClose asChild>
            <Button
              size="icon"
              variant="secondary"
              className="border border-blue-zodiac-900/10 bg-transparent text-slate-800 hover:bg-slate-50"
            >
              <XIcon />
            </Button>
          </SheetClose>
        </SheetHeader>
        <div className="flex w-full flex-col gap-8">
          {isNaturalPerson && <SelectAccount />}
          <NavigationShared />
          {user && (
            <div className="flex size-full flex-col gap-4">
              <hr className="border-slate-200" />
              <div className="flex w-full flex-col items-center justify-between gap-2">
                <Link to={pagePaths.authenticated.legalPerson.profile} className="w-full">
                  <Button
                    aria-label="Meu Perfil"
                    variant="ghost"
                    className="inline-flex h-fit w-full justify-start gap-3 truncate px-3 py-4 text-left hover:bg-[#fcf0e2]"
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
                        {profileData?.naturalPerson.name ?? profileInfo?.name}
                      </span>
                      <p className="w-full truncate text-sm text-[#a0661f]">
                        {profileData?.naturalPerson.email}
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
            </div>
          )}
        </div>
        <SheetFooter></SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
