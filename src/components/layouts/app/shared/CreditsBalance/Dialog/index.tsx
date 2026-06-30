import { useState } from 'react';

import { AlertTriangleIcon, MinusIcon, PlusIcon, ShoppingBagIcon, Trash2Icon } from 'lucide-react';
import { toast } from 'sonner';

import { Alert, AlertDescription } from '@/components/shared/ui/alert';
import { Button } from '@/components/shared/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/shared/ui/dialog';
import { ScrollArea } from '@/components/shared/ui/scroll-area';
import { Skeleton } from '@/components/shared/ui/skeleton';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/shared/ui/tooltip';

import useProfile from '@/hooks/core/useProfile';
import useRequestProcessor from '@/hooks/core/useRequest';

import { CreditsService } from '@/services/entities/app/core/credits';
import { IPriceResponse } from '@/services/entities/app/core/credits/types';
import { EUserStatus } from '@/services/entities/app/naturalPerson/profile/enums';

import { MyCards } from '../MyCards';

interface Props {
  isDisabled?: boolean;
}

export function CreditsDialog({ isDisabled }: Props) {
  const { profileInfo, profileCards, UpdateCredits, isLoading } = useProfile();
  const [purchasedAmount, setPurchasedAmount] = useState(1);
  const [isOpen, setIsOpen] = useState(false);

  const isUserEnabled =
    profileInfo?.status === EUserStatus.ENABLED || profileInfo?.status === EUserStatus.ADMIN;

  const { data: price, isLoading: isLoadingPrice } = useRequestProcessor().query<IPriceResponse>(
    ['price'],
    async () => await CreditsService.GetPriceCredits(),
    {
      enabled: !isLoading,
      onSuccess: (data: IPriceResponse) => {
        return data.price;
      },
    },
  );

  const increaseAmount = () => setPurchasedAmount(purchasedAmount + 1);
  const decreaseAmount = () => {
    if (purchasedAmount > 1) {
      setPurchasedAmount(purchasedAmount - 1);
    }
  };
  const resetAmount = () => setPurchasedAmount(1);

  function onBuy() {
    const defaultCard = profileCards?.find((card) => card.isDefault);

    if (defaultCard) {
      const response = CreditsService.PurchaseCredits(defaultCard?.cardId, purchasedAmount);

      toast.promise(response, {
        loading: 'Em processamento...',
        success: () => {
          setIsOpen(false);

          return `${purchasedAmount} créditos comprado com sucesso`;
        },
        error: () => {
          return 'Falha ao comprar créditos...';
        },
        finally: () => {
          UpdateCredits();
        },
      });
    }
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        resetAmount();
        setIsOpen(!isOpen);
      }}
    >
      <DialogTrigger asChild>
        <Button
          variant="outline"
          disabled={!isUserEnabled || isDisabled}
          className="group w-full sm:w-fit"
        >
          <ShoppingBagIcon className="mr-2 size-4 transition-transform duration-500 ease-out group-hover:rotate-[360deg]" />
          Comprar créditos
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[94%]  justify-center overflow-y-scroll sm:justify-normal ">
        <DialogHeader>
          <DialogTitle>Gerencie seus créditos e meios de pagamento</DialogTitle>
          <DialogDescription>
            Consulte o seu saldo de créditos, adicione ou remova meios de pagamento.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-full">
          <div className="flex flex-col gap-12 p-6 pb-12">
            <Alert className="max-w-80 sm:max-w-full">
              <AlertDescription>
                💡 Cada crédito equivale à emissão de um certificado
              </AlertDescription>
            </Alert>
            <div>
              <h3 className="text-base font-semibold">Meus cartões</h3>
              <MyCards />
            </div>
          </div>
        </ScrollArea>
        <DialogFooter>
          <div className="flex w-full flex-col gap-4">
            <h4 className="text-base font-semibold">Resumo da Compra</h4>
            <div className="flex flex-col gap-6 md:flex-row">
              <div className="inline-flex gap-2">
                <div className="flex w-full flex-col items-center justify-center gap-4 rounded-xl border border-slate-200 p-6 md:w-fit">
                  <span className="text-sm font-semibold text-slate-950">
                    Quantidade de Créditos
                  </span>
                  <div className="inline-flex items-center gap-6">
                    <Button size="icon" variant="outline" onClick={() => decreaseAmount()}>
                      <MinusIcon />
                    </Button>
                    <span className="w-12 text-center text-4xl text-slate-600">
                      {purchasedAmount}
                    </span>
                    <Button size="icon" variant="outline" onClick={() => increaseAmount()}>
                      <PlusIcon />
                    </Button>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => resetAmount()}
                  >
                    <Trash2Icon className="mr-2 size-3.5" />
                    Resetar
                  </Button>
                </div>
              </div>
              <div className="flex w-full flex-col items-center gap-6">
                <div className="flex flex-col gap-2 text-center">
                  <p className="text-sm font-semibold text-slate-600">Total da compra</p>
                  {isLoadingPrice && <Skeleton className="h-6 w-24" />}
                  {price && !isLoadingPrice && (
                    <span className="text-4xl font-bold text-slate-950">
                      {((price.price / 100) * purchasedAmount).toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                    </span>
                  )}
                </div>

                <div className="flex w-full flex-col gap-2 rounded-xl border border-slate-200 p-6">
                  <div className="inline-flex justify-between">
                    <span className="text-sm font-normal text-slate-600">
                      Quantidade de Créditos
                    </span>
                    <p className="text-sm font-semibold text-slate-950">{purchasedAmount}</p>
                  </div>
                  <div className="inline-flex justify-between">
                    <span className="text-sm font-normal text-slate-600">
                      Certificados para emissão
                    </span>
                    <p className="text-sm font-semibold text-slate-950">{purchasedAmount}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="inline-flex items-center justify-end gap-2">
              <DialogClose asChild>
                <Button variant="outline">Cancelar</Button>
              </DialogClose>
              <TooltipProvider>
                <Tooltip
                  disableHoverableContent={
                    !isLoading && profileCards !== null && profileCards?.length > 0
                  }
                >
                  <TooltipTrigger>
                    <Button
                      variant="success"
                      disabled={isLoading || profileCards === null || profileCards?.length == 0}
                      className="pl-5 disabled:cursor-not-allowed"
                      onClick={() => onBuy()}
                    >
                      <ShoppingBagIcon className="mr-2 size-5" />
                      Finalizar a compra
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="inline-flex items-center gap-2">
                      <AlertTriangleIcon className="size-3.5" />
                      Cadastre um cartão ou defina um padrão
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
