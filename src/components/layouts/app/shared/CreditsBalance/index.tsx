import { Fragment } from 'react';

import { AlertTriangleIcon, FileBadgeIcon } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/shared/ui/alert';
import { Progress } from '@/components/shared/ui/progress';
import { Skeleton } from '@/components/shared/ui/skeleton';

import { cn } from '@/utils';

import { CreditsDialog } from './Dialog';
import { CreditsDialogProps } from './types';

export function CreditsBalance({
  balance,
  credits,
  additionalCredits,
  isLoading,
  isDisabled,
}: Readonly<CreditsDialogProps>) {
  if (isLoading) {
    return <CreditsLoadingSkeleton />;
  }

  const total = credits + additionalCredits;

  function CalculateBalance(balance: number) {
    if (balance === 0) {
      return 5;
    }

    if (balance > total) {
      return 100;
    }

    return (balance / total) * 100;
  }

  return (
    <div className="inline-flex w-full flex-col gap-4 rounded-lg border border-slate-100 bg-white p-4 lg:w-fit">
      <div className="inline-flex flex-col items-center justify-between gap-4 sm:flex-row sm:gap-8">
        <div className="inline-flex items-center justify-center gap-4">
          <div
            className={cn('inline-flex min-w-10 size-10 items-center justify-center rounded-full', {
              'bg-red-600': CalculateBalance(balance) === 100,
              'bg-slate-900': CalculateBalance(balance) < 100,
            })}
          >
            <FileBadgeIcon className="size-4 min-w-4 text-white" />
          </div>

          <div className="flex min-w-36 flex-col items-start gap-1">
            <h4 className="text-xs font-semibold">Saldo de Créditos</h4>
            <p className="text-sm font-medium">
              {balance}
              <span className="font-normal text-slate-400"> / {credits} Créditos</span>
              {additionalCredits > 0 && (
                <span className="font-semibold text-emerald-600"> +{additionalCredits}</span>
              )}
            </p>
          </div>
        </div>
        <CreditsDialog isDisabled={isDisabled} />
      </div>
      <CreditsProgress balance={CalculateBalance(balance)} />
    </div>
  );
}

function CreditsLoadingSkeleton() {
  return (
    <div className="inline-flex w-full flex-col gap-4 rounded-lg border border-slate-100 p-4 md:w-fit">
      <div className="inline-flex items-center justify-between gap-8">
        <div className="inline-flex items-center justify-center gap-4">
          <Skeleton className="size-10 rounded-full" />
          <div className="flex flex-col items-start gap-1">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-5 w-20" />
          </div>
        </div>
        <Skeleton className="h-12 w-[173px]" />
      </div>
      <Skeleton className="h-1.5 w-full rounded-full" />
    </div>
  );
}

function CreditsProgress({ balance }: Readonly<{ balance: number }>) {
  return (
    <Fragment>
      <Progress
        className="h-3 md:h-2"
        indicatorClassName={cn('bg-emerald-400', {
          'bg-red-600': balance >= 70,
        })}
        value={balance}
      />
      {balance === 100 && (
        <Alert variant="destructive">
          <AlertTriangleIcon className="size-3.5" />
          <AlertTitle>Cota Excedida</AlertTitle>
          <AlertDescription>Adquira mais créditos para continuar emitindo</AlertDescription>
        </Alert>
      )}
    </Fragment>
  );
}
