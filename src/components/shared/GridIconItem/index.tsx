import { LucideIcon } from 'lucide-react';

import { cn } from '@/utils';

export function GridIconItem({
  title,
  children,
  className,
  ...props
}: Readonly<{
  icon: LucideIcon;
  title: string;
  className?: string;
  children?: React.ReactNode;
}>) {
  return (
    <div className={cn('col-span-12 sm:col-span-5 flex flex-col gap-2 lg:col-span-3', className)}>
      <div className="inline-flex gap-2">
        <props.icon className="size-4 text-slate-400" />
        <div className="flex flex-col gap-1">
          <h3 className="text-xs font-bold uppercase text-slate-600">{title}</h3>
          <p className="font-normal">{children}</p>
        </div>
      </div>
    </div>
  );
}
