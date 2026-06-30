import { LogOutIcon, MenuIcon, XIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

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

import { getInitials } from '@/utils/getInitials';

import { SelectAccount } from '../shared/SelectAccount';
import NavigationShared from './NavigationShared';

export function MobileMenu() {
  const { user } = useAuthentication();
  const { profileData, isNaturalPerson, handleSignOut } = useProfile();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="inline-flex md:hidden">
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="h-screen w-full flex-col justify-between gap-8 overflow-y-auto border-0 bg-slate-950 p-4 py-6"
      >
        <SheetHeader className="inline-flex w-full flex-row items-center justify-between gap-8 pb-12">
          <Logo path={'images/logo_text.svg'} className="mt-2 h-8" />
          <SheetClose asChild>
            <Button
              size="icon"
              variant="secondary"
              className="border border-blue-zodiac-900/30 hover:bg-blue-zodiac-900/30"
            >
              <XIcon />
            </Button>
          </SheetClose>
        </SheetHeader>
        <div className="flex h-[45vh] w-full flex-col gap-8">
          {isNaturalPerson && <SelectAccount />}
          <NavigationShared />
          {user && (
            <div className="flex size-full flex-col gap-4">
              <hr className="border-blue-zodiac-900/30" />
              <div className="flex w-full flex-col items-center justify-between gap-2">
                <Link to="/profile" className="w-full">
                  <Button
                    variant="ghost"
                    className="inline-flex h-fit w-full justify-start gap-3 truncate p-3 text-left hover:bg-blue-zodiac-900/30"
                  >
                    <Avatar>
                      <AvatarImage src="123" />
                      <AvatarFallback>
                        {getInitials(profileData?.naturalPerson.name ?? '')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex w-full flex-col gap-0">
                      <span className="text-sm font-bold text-white">
                        {profileData?.naturalPerson.name}
                      </span>
                      <p className="w-full truncate text-sm text-slate-500">
                        {profileData?.naturalPerson.email}
                      </p>
                    </div>
                  </Button>
                </Link>
                <Button
                  type="button"
                  onClick={handleSignOut}
                  variant="secondary"
                  className="w-full hover:bg-blue-zodiac-900/30"
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
