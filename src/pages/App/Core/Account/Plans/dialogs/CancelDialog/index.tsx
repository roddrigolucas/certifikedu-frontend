import { useState } from 'react';

import { BanIcon } from 'lucide-react';
import { toast } from 'sonner';

import { queryClient } from '@/components/Providers';
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

import { PlansService } from '@/services/entities/app/core/plans';

export default function CancelPlan() {
  const [isOpen, setIsOpen] = useState(false);
  const { profileCredits } = useProfile();

  const handleCancelPlan = () => {
    const response = PlansService.CancelPlan(profileCredits?.subscriptionId ?? '');

    toast.promise(response, {
      loading: 'Em processamento...',
      success: () => {
        return `Plano cancelado com sucesso`;
      },
      error: () => {
        return 'Falha ao cancelar plano...';
      },
      finally: () => {
        queryClient.invalidateQueries({ queryKey: ['profile'] });
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="border border-red-50/20 text-red-100 hover:border-red-500 hover:bg-red-500 hover:text-white"
        >
          Cancelar
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Você tem certeza absoluta?</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center gap-6 p-6 pb-12">
          <p className="text-sm font-normal">
            Essa ação não pode ser desfeita. Isso cancelará seu plano atual.
          </p>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" className="w-full md:w-fit">
              Cancelar
            </Button>
          </DialogClose>
          <Button
            variant="destructive"
            onClick={() => handleCancelPlan()}
            className="w-full md:w-fit"
          >
            <BanIcon className="mr-2 size-4" />
            Cancelar plano
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
