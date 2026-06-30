import { Logo } from '@/components/core/atoms/Logo';

import useAuthentication from '@/hooks/core/useAuthentication';
import useProfile from '@/hooks/core/useProfile';

import { SelectAccount } from '../shared/SelectAccount';
import { Footer } from './Footer';
import NavigationShared from './NavigationShared';

export function Aside() {
  const { user } = useAuthentication();
  const { isNaturalPerson } = useProfile();

  return (
    <aside className="fixed left-0 top-0 z-10 hidden size-full max-h-screen max-w-xs flex-col justify-between gap-8 bg-slate-950 px-4 pb-8 pt-16 md:flex">
      <div className="flex h-full flex-col gap-8 overflow-y-auto">
        <Logo path={'images/logo_text.svg'} />
        {isNaturalPerson && <SelectAccount />}
        <NavigationShared />
      </div>
      {user && (
        <div className="flex w-full flex-col gap-4">
          <Footer />
        </div>
      )}
    </aside>
  );
}
