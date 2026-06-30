import React, { ReactElement, useState } from 'react';

import { Trash2Icon } from 'lucide-react';
import { useParams } from 'react-router-dom';
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

import { CourseService } from '@/services/entities/app/legalPerson/courses';

interface Props {
  children: ReactElement;
  id: string;
}

export function DeleteCurriculumDialog({ id, children }: Readonly<Props>) {
  const [isOpen, setIsOpen] = useState(false);
  const { selectedPJ } = useProfile();
  const params = useParams();

  function onDelete() {
    const response = CourseService.DeleteCurriculum(selectedPJ?.pjId ?? '', id);
    toast.promise(response, {
      loading: 'Em processamento...',
      success: () => {
        setIsOpen(false);

        return <span data-testId="toast-success">Currículo deletado com sucesso</span>;
      },
      error: () => {
        return 'Falha ao apagar currículo';
      },
      finally: () => {
        queryClient.refetchQueries({
          queryKey: ['courses', `PJ: ${selectedPJ?.pjId}`, `School: ${params.id}`],
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
            Essa ação não pode ser desfeita. Isso excluirá permanentemente seu currículo e removerá
            os dados de nossos servidores.
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
            Deletar Currículo
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
