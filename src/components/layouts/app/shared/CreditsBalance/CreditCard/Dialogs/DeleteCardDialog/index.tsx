import { useState } from 'react';

import { Trash2Icon } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/shared/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/shared/ui/dialog';

import useProfile from '@/hooks/core/useProfile';

import { DeleteCreditCard } from '@/services/entities/app/core/credits';

import { BrandIcon } from '../../../BrandIcon';
import { CreditCardProps } from '../../types';

export function DeleteCardDialog({ brand, month, year, digits, card }: Readonly<CreditCardProps>) {
  const [isOpen, setIsOpen] = useState(false);
  const { UpdateCards } = useProfile();

  function onDelete() {
    const response = DeleteCreditCard(card.cardId);

    toast.promise(response, {
      loading: 'Em processamento...',
      success: () => {
        setIsOpen(false);

        return `Cartão com final ${digits} com sucesso`;
      },
      error: () => {
        return 'Falha ao deletar cartão';
      },
      finally: () => {
        UpdateCards();
      },
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          size="icon"
          variant="outline"
          className="hover:border-red-100 hover:bg-red-50 hover:text-red-600"
        >
          <Trash2Icon className="size-4" />
          <span className="sr-only">Deletar</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Você tem certeza absoluta?</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center gap-6 p-6 pb-12">
          <p className="text-sm font-normal">
            Essa ação não pode ser desfeita. Isso excluirá permanentemente seu cartão e removerá
            seus dados de nossos servidores.
          </p>
          <div className="flex h-48 w-80 flex-col justify-end gap-4 rounded-xl border border-slate-200 px-4 py-6">
            <div className="space-y-2">
              <BrandIcon brand={brand} />
              <div>
                <h4 className="text-sm font-bold text-slate-950">**** **** **** {digits}</h4>
                <p className="text-xs text-slate-500">
                  Expira {month}/{year}
                </p>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" className="w-full md:w-fit">
              Cancelar
            </Button>
          </DialogClose>
          <Button variant="destructive" onClick={() => onDelete()} className="w-full md:w-fit">
            <Trash2Icon className="mr-2 size-4" />
            Deletar cartão
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
