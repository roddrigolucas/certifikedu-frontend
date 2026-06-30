import { ScrollArea } from '@radix-ui/react-scroll-area';
import { CreditCardIcon } from 'lucide-react';

import { Button } from '@/components/shared/ui/button';
import { Skeleton } from '@/components/shared/ui/skeleton';

import useProfile from '@/hooks/core/useProfile';

import { CreditsService } from '@/services/entities/app/core/credits';

import { getImageUrl } from '@/utils/image';

import { CreditCard } from '../CreditCard';
import { AddCardDialog } from '../CreditCard/Dialogs';

export function MyCards({}) {
  const { isLoading, profileCards, profileCredits, isUserEnabled } = useProfile();

  const registerCustomerPagarMe = () => {
    if (profileCredits?.customerId === null) {
      CreditsService.RegisterCustomerId();
    }
  };

  return (
    <div className="space-y-6 ">
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex w-full space-x-4">
          {profileCards === null ? (
            <Skeleton className="h-24 w-full" />
          ) : (
            profileCards.map((card) => (
              <CreditCard
                key={card.cardId}
                card={card}
                brand={card.brand}
                month={card.expMonth}
                year={card.expYear}
                digits={card.lastFourDigits}
                isDefault={card.isDefault || false}
              />
            ))
          )}
          {!isLoading && profileCards && profileCards.length === 0 && (
            <div className="flex w-full flex-col gap-4 text-center ">
              <div className="flex flex-col items-center gap-4">
                <div className="flex max-w-sm flex-col items-center gap-2">
                  <img
                    src={getImageUrl('images/empty/invoice.svg')}
                    alt="Billing"
                    className="size-48"
                  />
                  <div className="flex flex-col gap-2">
                    <h5 className="text-lg font-bold">Nenhum cartão encontrado</h5>
                  </div>
                </div>
                <AddCardDialog
                  trigger={
                    <Button
                      disabled={!isUserEnabled}
                      onClick={() => registerCustomerPagarMe()}
                      variant="outline"
                    >
                      <CreditCardIcon className="mr-2 size-4" />
                      Cadastrar cartão
                    </Button>
                  }
                />
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
      {!isLoading && profileCards && profileCards.length > 0 && (
        <AddCardDialog
          trigger={
            <Button disabled={!isUserEnabled} variant="outline">
              <CreditCardIcon className="mr-2 size-4" />
              Cadastrar cartão
            </Button>
          }
        />
      )}
    </div>
  );
}
