import { CheckIcon } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/shared/ui/button';
import { Separator } from '@/components/shared/ui/separator';

import useProfile from '@/hooks/core/useProfile';

import { CreditsService } from '@/services/entities/app/core/credits';

import { BrandIcon } from '../BrandIcon';
import { DeleteCardDialog } from './Dialogs/DeleteCardDialog';
import { CreditCardProps } from './types';

export function CreditCard({
  brand,
  month,
  year,
  digits,
  card,
  isDefault = false,
}: Readonly<CreditCardProps>) {
  const { UpdateCards } = useProfile();

  function SetDefault() {
    const response = CreditsService.SetDefaultCreditCard(card.cardId);

    toast.promise(response, {
      loading: 'Em processamento...',
      success: () => {
        return `Cartão com final ${digits} definido como padrão`;
      },
      error: () => {
        return 'Falha ao definir cartão...';
      },
      finally: () => {
        UpdateCards();
      },
    });
  }

  return (
    <div className="flex w-80 flex-col gap-4 rounded-xl border border-slate-200 p-4">
      <div className="space-y-2">
        <BrandIcon brand={brand} />
        <div>
          <h4 className="text-sm font-bold text-slate-950">**** **** **** {digits}</h4>
          <p className="text-xs text-slate-500">
            Expira {month}/{year}
          </p>
        </div>
      </div>
      <Separator className="bg-slate-100" />
      <footer className="inline-flex w-full items-center justify-between gap-2">
        <Button
          className="rounded-full"
          variant={isDefault ? 'secondary' : 'outline'}
          size="sm"
          onClick={() => {
            isDefault ? null : SetDefault();
          }}
        >
          {isDefault && <CheckIcon className="mr-2 size-3.5" />}
          {isDefault ? 'Padrão' : 'Tornar padrão'}
        </Button>
        <div className="inline-flex gap-2">
          <DeleteCardDialog brand={brand} card={card} month={month} year={year} digits={digits} />
        </div>
      </footer>
    </div>
  );
}
