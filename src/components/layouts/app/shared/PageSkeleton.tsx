import { Fragment } from 'react';

import { Skeleton } from '@/components/shared/ui/skeleton';

export function PageSkeleton() {
  return (
    <Fragment>
      <div className="inline-flex h-12 w-full items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 p-3">
        <Skeleton className="size-4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
      <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-4 md:gap-8">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="flex w-full flex-col items-start justify-between gap-2 rounded-xl border border-slate-100 p-4 "
          >
            <header className="inline-flex w-full justify-between">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="size-4" />
            </header>
            <Skeleton className="size-9" />
          </div>
        ))}
      </div>
    </Fragment>
  );
}

export function PageSkeletonFull() {
  return (
    <Fragment>
      <div className="inline-flex h-12 w-full items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 p-3">
        <Skeleton className="size-4" />
        <Skeleton className="h-4 w-1/2" />
      </div>

      <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-4 md:gap-8">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="flex w-full flex-col items-start justify-between gap-2 rounded-xl border border-slate-100 p-4 "
          >
            <header className="inline-flex w-full justify-between">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="size-4" />
            </header>
            <Skeleton className="size-20" />
          </div>
        ))}
        <Skeleton className="size-80 p-4" />
        <div className="flex w-full flex-col items-start justify-between gap-2 rounded-xl border border-slate-100 p-4 ">
          <header className="inline-flex w-full justify-between">
            <Skeleton className="h-4 w-32" />
            {/* <Skeleton className="size-4" /> */}
          </header>
          <Skeleton className="size-20" />
        </div>
      </div>
    </Fragment>
  );
}

export function PageSkeletonImage() {
  return (
    <Fragment>
      <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-4 md:gap-8">
        <Skeleton className="h-[400px] w-[700px] p-4 xl:h-[450px] xl:w-[1100px]" />
      </div>
    </Fragment>
  );
}
