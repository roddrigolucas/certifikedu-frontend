import { CreditCardIcon } from 'lucide-react';

import { EBrand } from '@/services/entities/app/core/credits/enums';

import { cn } from '@/utils';
import { getImageUrl } from '@/utils/image';

import { BrandIconProps } from './types';

export function BrandIcon({ brand, className }: Readonly<BrandIconProps>) {
  const defaultClass = 'flex size-8 select-none items-center justify-center rounded-lg bg-white';
  switch (brand) {
    case EBrand.VISA:
      return (
        <div className={cn(defaultClass, className)}>
          <img
            src={getImageUrl('images/brand/visa.svg')}
            alt="Visa"
            className={cn('h-5 w-8', className)}
          />
        </div>
      );
    case EBrand.AMEX:
      return (
        <div className={cn(defaultClass, className)}>
          <img
            src={getImageUrl('images/brand/amex.svg')}
            alt="Amex"
            className={cn('h-5 w-8', className)}
          />
        </div>
      );
    case EBrand.MASTERCARD:
      return (
        <div className={cn(defaultClass, className)}>
          <img
            src={getImageUrl('images/brand/mastercard.svg')}
            alt="Mastercard"
            className={cn('h-5 w-8', className)}
          />
        </div>
      );
    case EBrand.DISCOVER:
      return (
        <div className={cn(defaultClass, className)}>
          <img
            src={getImageUrl('images/brand/discover.svg')}
            alt="Discover"
            className={cn('h-5 w-8', className)}
          />
        </div>
      );
    case EBrand.DINERS:
      return (
        <div className={cn(defaultClass, className)}>
          <img
            src={getImageUrl('images/brand/diners.svg')}
            alt="Diners"
            className={cn('h-5 w-8', className)}
          />
        </div>
      );
    case EBrand.JCB:
      return (
        <div className={cn(defaultClass, className)}>
          <img
            src={getImageUrl('images/brand/jcb.svg')}
            alt="JCB"
            className={cn('h-5 w-8', className)}
          />
        </div>
      );
    case EBrand.MAESTRO:
      return (
        <div className={cn(defaultClass, className)}>
          <img
            src={getImageUrl('images/brand/maestro.svg')}
            alt="Maestro"
            className={cn('h-5 w-8', className)}
          />
        </div>
      );
    case EBrand.ELO:
      return (
        <div className={cn(defaultClass, className)}>
          <img
            src={getImageUrl('images/brand/elocard.svg')}
            alt="Elo"
            className={cn('h-5 w-8', className)}
          />
        </div>
      );
    default:
      return (
        <div
          className={cn(
            'flex size-8 select-none items-center justify-center rounded-lg bg-slate-100',
            className,
          )}
        >
          <CreditCardIcon className="size-3.5 text-slate-400" />
        </div>
      );
  }
}
