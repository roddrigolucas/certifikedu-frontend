import { useState } from 'react';

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
  DialogTrigger,
} from '@/components/shared/ui/dialog';
import { DropdownMenuItem } from '@/components/shared/ui/dropdown-menu';

import { AdminService } from '@/services/entities/app/admin';

interface Props {
  id: string;
  isDeletable: boolean;
}
export function DeleteEmailDialog({ id, isDeletable }: Readonly<Props>) {
  const [isOpen, setIsOpen] = useState(false);

  function onDelete() {
    const response = AdminService.DeleteEmailTemplate(id);

    toast.promise(response, {
      loading: 'Em processamento...',
      success: () => {
        setIsOpen(false);

        return `Email deletado com sucesso`;
      },
      error: () => {
        return 'Falha ao deletar email';
      },
      finally: () => {
        queryClient.invalidateQueries({ queryKey: ['admin', 'emails'] });
      },
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {isDeletable ? (
          <DropdownMenuItem
            onSelect={(event) => event.preventDefault()}
            className="inline-flex w-full gap-2 hover:bg-red-50 hover:text-red-600 focus:bg-red-50 focus:text-red-600"
          >
            <Trash2Icon className="size-4" />
            Deletar
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem className="inline-flex w-full cursor-not-allowed gap-2 bg-gray-100 text-gray-400 focus:bg-gray-100 focus:text-gray-400">
            <Trash2Icon className="size-4" />
            <span className="opacity-50">Deletar</span>
          </DropdownMenuItem>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Você tem certeza absoluta?</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center gap-6 p-6 pb-12">
          <p className="text-sm font-normal">
            Essa ação não pode ser desfeita. Isso excluirá permanentemente seu email de nossos
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
            Deletar email
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
