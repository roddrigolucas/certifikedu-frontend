import React, { ReactElement, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { PenLine } from 'lucide-react';
import { useForm } from 'react-hook-form';
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
import { IPermissionUserPJPatch } from '@/services/entities/app/legalPerson/legalPerson/types';

import { getInitials } from '@/utils/getInitials';

import { CheckboxReactHookFormMultiple, checkboxReactHookFormMultipleItems } from './Checkbox';
import { FormSchemaPermission, FormTypePermission } from './models';

interface DeleteUser {
  children: ReactElement;
  listOfUsers: Array<UsersPJ>;
}

export function PermissionUserDialog({ children, listOfUsers }: Readonly<DeleteUser>) {
  const [isOpen, setIsOpen] = useState(false);
  const { UpdateCredits } = useProfile();

  const form = useForm<FormTypePermission>({
    resolver: zodResolver(FormSchemaPermission),
    defaultValues: {
      items: ['medio'],
    },
  });
  const level = form.watch('items');

  const { mutate: associatePermission } = useMutation<unknown, Error, IPermissionUserPJPatch>(
    (updatePackage) => LegalPersonService.ChangePermissioningUserPJPF(updatePackage),
  );

  const onSubmit = () => {
    const updatePackage = {
      role: level[0],
      cpfs: listOfUsers.map((user) => user.document),
    };
    associatePermission(updatePackage, {
      onSuccess: () => {
        toast.success(
          `Sucesso associando o usuário ${listOfUsers[0]?.document} à sua Instituição,
          com permissionamento ${level[0]}`,
          {
            duration: 1000,
          },
        );
        setIsOpen(false);
        UpdateCredits();
      },
      onError: (error: any) => {
        toast.error(`${error}`, {
          duration: 2000,
        });
      },
    });
  };

  const handleExternalSubmit = form.handleSubmit(onSubmit);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {React.cloneElement(children as ReactElement, { onClick: () => setIsOpen(true) })}
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Alterar nível de acesso</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-6 p-6 pb-12">
          <p className="text-left text-sm font-normal">Revise as informações abaixo</p>
          <CheckboxReactHookFormMultiple items={checkboxReactHookFormMultipleItems} form={form} />
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
          <Button variant="secondary" onClick={handleExternalSubmit} className="w-full md:w-fit">
            <PenLine className="mr-2 size-4" />
            Alterar Permissionamento
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
