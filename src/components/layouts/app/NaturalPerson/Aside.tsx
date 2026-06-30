/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable tailwindcss/enforces-negative-arbitrary-values */
import { useCallback, useLayoutEffect, useRef, useState } from 'react';

import { HeadsetIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

import { pagePaths } from '@/constants/navigation/pagePaths';

import { Logo } from '@/components/core/atoms/Logo';
import { Button } from '@/components/shared/ui/button';

import useAuthentication from '@/hooks/core/useAuthentication';
import useProfile from '@/hooks/core/useProfile';

import { SelectAccount } from '../shared/SelectAccount';
import { Footer } from './Footer';
import NavigationShared from './NavigationShared';

const ScrollIndicator = () => {
  return (
    <div className="bg-trasparent -mt-10 flex items-center justify-center">
      <div className="relative w-6 ">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className={`duration-3000 animate-move absolute h-2 w-7
                        scale-50 opacity-0 ease-out
                        ${index === 0 ? 'delay-1000' : ''}
                        ${index === 1 ? 'delay-2000' : ''}`}
            style={{
              animationIterationCount: 'infinite',
            }}
          >
            <div className="absolute top-0 h-full w-1/2 skew-y-[28deg] bg-white"></div>
            <div className="absolute right-0 top-0 h-full w-1/2 -skew-y-[28deg] bg-white"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export function Aside() {
  const { user } = useAuthentication();
  const { profileData, isNaturalPerson } = useProfile();
  const [showIndicator, setShowIndicator] = useState<boolean>(true);
  const [lastTimeoutId, setLastTimeoutId] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;

    const { scrollTop, scrollHeight, clientHeight } = container;

    if (lastTimeoutId !== null) clearTimeout(lastTimeoutId);
    const timeoutId = window.setTimeout(() => {
      setShowIndicator(scrollTop + clientHeight < scrollHeight);
    }, 500);

    setLastTimeoutId(timeoutId);
  }, [lastTimeoutId]);

  useLayoutEffect(() => {
    const container = scrollRef.current;

    if (container) {
      container.addEventListener('scroll', handleScroll);

      if (showIndicator) {
        setShowIndicator(container.scrollHeight > container.clientHeight);
      }

      return () => {
        container.removeEventListener('scroll', handleScroll);
        if (lastTimeoutId !== null) clearTimeout(lastTimeoutId);
      };
    }
  }, [handleScroll]);

  return (
    <aside className="fixed left-0 top-0 z-10 hidden size-full max-h-screen max-w-xs flex-col justify-between gap-8 bg-blue-zodiac-950 px-4 pb-8 pt-16 md:flex">
      <div ref={scrollRef} className="flex h-full flex-col gap-8 overflow-y-auto ">
        <Logo path={'images/logo_text.svg'} />
        {isNaturalPerson && <SelectAccount />}
        <NavigationShared />
      </div>
      {showIndicator && <ScrollIndicator />}
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
              className="w-full justify-start text-slate-200 hover:bg-blue-zodiac-900/30 hover:text-white"
            >
              <HeadsetIcon className="mr-4 size-5" />
              <div className="flex w-full flex-col gap-0 text-left">
                <span className="text-sm font-bold text-slate-200">Suporte</span>
                <p className="w-full truncate text-sm text-slate-500">+55 (51) 99280-0702</p>
              </div>
            </Button>
          </Link>
          <Footer />
        </div>
      )}
    </aside>
  );
}
