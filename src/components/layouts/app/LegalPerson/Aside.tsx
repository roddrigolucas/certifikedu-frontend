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
            <div className="absolute top-0 h-full w-1/2 skew-y-[28deg] bg-black"></div>
            <div className="absolute right-0 top-0 h-full w-1/2 -skew-y-[28deg] bg-black"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export function Aside() {
  const { user } = useAuthentication();
  const { profileData, profileInfo, isNaturalPerson } = useProfile();
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
    <aside className="bg-darkGray fixed left-0 top-0 z-10 hidden size-full max-h-screen max-w-xs flex-col justify-between gap-8 px-4 pb-8 pt-16 md:flex">
      <div ref={scrollRef} className="flex h-full flex-col gap-8 overflow-y-auto">
        <Logo path={'images/logo_text_color.svg'} />
        {isNaturalPerson && <SelectAccount />}
        <NavigationShared />
      </div>
      {showIndicator && <ScrollIndicator />}

      {user && (
        <div className="flex w-full flex-col gap-4">
          <Link
            to={pagePaths.unauthenticated.support(
              profileData?.naturalPerson.name ?? profileInfo?.name ?? '"SEU NOME"',
              profileData?.naturalPerson.email ?? profileInfo?.email ?? '"SEU E-MAIL"',
            )}
            target="_blank"
            className="w-full"
          >
            <Button
              variant="ghost"
              className="w-full justify-start text-slate-800 hover:bg-[#fcf2e5] hover:text-slate-600"
            >
              <HeadsetIcon className="mr-4 size-5" />
              <div className="flex w-full flex-col gap-0 text-left">
                <span className="text-sm font-bold text-[#4d2f0c] ">Suporte</span>
                <p className="w-full truncate text-sm text-[#a0661f]">+55 (51) 99280-0702</p>
              </div>
            </Button>
          </Link>
          <Footer />
        </div>
      )}
    </aside>
  );
}
