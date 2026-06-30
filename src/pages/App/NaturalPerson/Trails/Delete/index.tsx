import React, { ReactElement, useState } from 'react';

import { Trash2Icon } from 'lucide-react';
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
} from '@/components/shared/ui/dialog';

import useProfile from '@/hooks/core/useProfile';

import { TrailService } from '@/services/entities/app/legalPerson/trails';

interface Props {
  children: ReactElement;
  id: string;
}

export function DeleteTrailDialog({ id, children }: Readonly<Props>) {
  const [isOpen, setIsOpen] = useState(false);
  const { selectedPJ } = useProfile();

  function onDelete() {
    const response = TrailService.DeleteTrail(selectedPJ?.pjId ?? '', id);
    toast.promise(response, {
      loading: 'Em processamento...',
      success: () => {
        setIsOpen(false);

        return <span data-testId="toast-success">Trilha deletada com sucesso</span>;
      },
      error: () => {
        return 'Falha ao apagar trilha';
      },
      finally: () => {
        queryClient.refetchQueries({
          queryKey: ['trails', `PJ: ${selectedPJ?.pjId}`],
        });
      },
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {React.cloneElement(children as ReactElement, { onClick: () => setIsOpen(true) })}
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Você tem certeza absoluta?</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center gap-6 p-6 pb-12">
          <p className="text-sm font-normal">
            Essa ação não pode ser desfeita. Isso excluirá permanentemente sua trilha e removerá os
            dados de nossos servidores.
          </p>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" className="w-full md:w-fit">
              Cancelar
            </Button>
          </DialogClose>
          <Button
            data-testId="submit-button"
            variant="destructive"
            onClick={() => onDelete()}
            className="w-full md:w-fit"
          >
            <Trash2Icon className="mr-2 size-4" />
            Deletar Trilha
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
