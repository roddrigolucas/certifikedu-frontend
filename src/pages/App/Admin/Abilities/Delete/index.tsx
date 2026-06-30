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
} from '@/components/shared/ui/dialog';
import { DropdownMenuItem } from '@/components/shared/ui/dropdown-menu';

import { AdminService } from '@/services/entities/app/admin';

export function DeleteAbilityDialog({ id }: Readonly<{ id: string }>) {
  const [isOpen, setIsOpen] = useState(false);

  function onDelete() {
    const response = AdminService.DeleteAbility(id);

    toast.promise(response, {
      loading: 'Em processamento...',
      success: () => {
        setIsOpen(false);

        return `Habilidade deletada com sucesso`;
      },
      error: () => {
        return 'Falha ao deletar habilidade';
      },
      finally: () => {},
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {/* <DialogTrigger asChild> */}
      <DropdownMenuItem className="inline-flex w-full cursor-not-allowed gap-2 text-gray-400 focus:bg-gray-100 focus:text-gray-400">
        <Trash2Icon className="size-4" />
        Deletar
      </DropdownMenuItem>
      {/* </DialogTrigger> */}
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Você tem certeza absoluta?</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center gap-6 p-6 pb-12">
          <p className="text-sm font-normal">
            Essa ação não pode ser desfeita. Isso excluirá permanentemente a habilidade de nossos
            servidores.
          </p>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" className="w-full md:w-fit">
              Cancelar
            </Button>
          </DialogClose>
          <Button variant="destructive" onClick={() => onDelete()} className="w-full md:w-fit">
            <Trash2Icon className="mr-2 size-4" />
            Deletar Habilidade
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
