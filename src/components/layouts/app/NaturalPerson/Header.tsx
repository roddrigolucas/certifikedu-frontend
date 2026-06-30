import { LucideIcon } from 'lucide-react';

import useProfile from '@/hooks/core/useProfile';

import { CreditsBalance } from '../shared/CreditsBalance';
import { MobileMenu } from './MobileMenu';

interface Props {
  icon: LucideIcon;
  title: string;
  description?: string;
  hideCredits?: boolean;
}

export function Header({ title, description, hideCredits, ...props }: Readonly<Props>) {
  const { isLoading, profileCredits, profileInfo } = useProfile();

  return (
    <header className="flex flex-col-reverse justify-between gap-8 md:gap-4 lg:flex-row">
      <div className="inline-flex gap-2 md:gap-3">
        <props.icon className="mt-1 size-5 min-w-5 text-slate-800 md:size-6 md:min-w-6" />
        <div className="flex flex-col gap-1 md:gap-2">
          <h2 className="text-lg font-bold text-slate-800 md:text-2xl">{title}</h2>
          {description && (
            <p className="md:text-md text-sm font-normal text-slate-600">{description}</p>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-4 md:items-end">
        <MobileMenu />
        {!hideCredits && (
          <CreditsBalance
            balance={profileCredits?.monthSpentCredits ?? 0}
            credits={profileCredits?.certificateCredits ?? 0}
            additionalCredits={profileCredits?.additionalCertificateCredits ?? 0}
            isLoading={isLoading}
            isDisabled={profileInfo?.status == null}
          />
        )}
      </div>
    </header>
  );
}
