import { LucideIcon } from 'lucide-react';

import { Skeleton } from '@/components/shared/ui/skeleton';

interface Props {
  isLoading?: boolean;
  isError?: boolean;
  title: string;
  value?: string | null;
  icon: LucideIcon;
}

export function CardInformation({
  title,
  value,
  icon,
  isLoading = false,
  isError = false,
}: Readonly<Props>) {
  const Icon = icon;

  if (isLoading ?? !value) {
    return <SkeletonCard />;
  }

  return (
    <div className="ease group relative flex w-full flex-col items-start justify-between gap-2 rounded-xl border-2 border-slate-200 p-4 text-slate-950 transition-all duration-500 hover:bg-slate-50">
      <header className="inline-flex w-full justify-between gap-4">
        <h3 className="text-sm font-medium">{title}</h3>
        <Icon className="size-5 text-slate-400" />
      </header>
      <span className="text-2xl font-bold">{isError ? '0' : value}</span>
      <footer className="inline-flex w-full justify-end">
        {/* <ExternalLinkIcon className="size-4 text-slate-300" /> */}
      </footer>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="flex w-full flex-col items-start justify-between gap-2 rounded-xl border border-slate-100 p-4 ">
      <header className="inline-flex w-full justify-between">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="size-4" />
      </header>
      <Skeleton className="size-9" />
    </div>
  );
}
