import React, { ReactElement, useState } from 'react';

import { Trash2Icon } from 'lucide-react';
import { toast } from 'sonner';

import { UsersPJ } from '@/components/pages/App/LegalPerson/Users/columns';
import { Avatar, AvatarFallback } from '@/components/shared/ui/avatar';
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

import { LegalPersonService } from '@/services/entities/app/legalPerson/legalPerson';

import { getInitials } from '@/utils/getInitials';

interface DeleteUser {
  children: ReactElement;
  listOfUsers: Array<UsersPJ>;
}

export function DeleteUserDialog({ children, listOfUsers }: Readonly<DeleteUser>) {
  const [isOpen, setIsOpen] = useState(false);
  const { UpdateCredits } = useProfile();

  function onDelete() {
    const admins = listOfUsers.flatMap((user) =>
      user.pjRoles.map((role) => ({
        adminId: role.adminId,
        role: role.role,
        environment: role.environment,
      })),
    );

    const response = LegalPersonService.DeleteUsersById(admins);
    toast.promise(response, {
      loading: 'Em processamento...',
      success: () => {
        setIsOpen(false);

        return `Colaborador(es) removido(s) com sucesso`;
      },
      error: () => {
        return 'Falha ao remover colaborador(es)';
      },
      finally: () => {
        UpdateCredits();
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
            Essa ação não pode ser desfeita. Isso excluirá permanentemente seus colaboradores e
            removerá os dados de nossos servidores.
          </p>
          <div className="container w-full space-y-4 py-4">
            {listOfUsers.map((user) => (
              <div key={user.email} className="inline-flex  items-center justify-between gap-6">
                <Avatar className="rounded-lg">
                  <AvatarFallback className="rounded-lg bg-slate-50">
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex w-40 flex-col">
                  <strong>{user.name}</strong>
                  <p className="text-sm font-normal text-slate-600">{user.email}</p>
                </div>
              </div>
            ))}
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
            Remover colaborador(es)
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
