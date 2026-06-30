import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';

import { cn } from '@/utils';
import { checkIsActive } from '@/utils/checkActive';

export function AccordionTrigger({
  menu,
  withSlash = false,
}: Readonly<{
  menu: { icon: React.ElementType; path: string; label: string };
  withSlash?: boolean;
}>) {
  return (
    <AccordionPrimitive.Trigger
      className={cn(
        'flex h-12 w-full rounded-md py-4 px-4 items-center text-sm font-semibold justify-between transition-all [&[data-state=open]>svg]:rotate-180',
        'hover:bg-[#faf2e8] text-[#6d4411] transition-colors ease border-0',
        {
          'bg-[#fff8f0] hover:bg-[#fcf0e2]': checkIsActive(menu.path, location.pathname, true),
        },
      )}
    >
      <div className="inline-flex gap-4">
        <menu.icon
          className={cn('size-5 min-w-5', {
            'text-ecstasy-500': checkIsActive(menu.path, location.pathname, true),
            'text-[#442a0b]': !checkIsActive(menu.path, location.pathname, true),
          })}
        />
        {menu.label}
      </div>
      {withSlash && <ChevronDown className="size-4 shrink-0 transition-transform duration-200" />}
    </AccordionPrimitive.Trigger>
  );
}
