import React, { ReactElement, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Trash2Icon } from 'lucide-react';
import { useForm } from 'react-hook-form';
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

import { StudentService } from '@/services/entities/app/legalPerson/students';
import { IStudent } from '@/services/entities/app/legalPerson/students/model';

import { CheckboxReactHookFormMultipleSchools } from './Checkbox';
import { FormSchemaCheckboxSchools, FormSchemaCheckboxSchoolsType } from './validation/schema';

interface Props {
  children: ReactElement;
  student: IStudent;
}

export function DeleteStudentDialog({ student, children }: Readonly<Props>) {
  const [isOpen, setIsOpen] = useState(false);
  const { selectedPJ } = useProfile();

  const form = useForm<FormSchemaCheckboxSchoolsType>({
    resolver: zodResolver(FormSchemaCheckboxSchools),
    defaultValues: {
      items: [],
    },
  });

  function onDelete(idList: string[]) {
    const deletePromises = idList.map((id) =>
      StudentService.DeleteStudent(selectedPJ?.pjId ?? '', id, [student.document]),
    );

    toast.promise(Promise.all(deletePromises), {
      success: () => {
        setIsOpen(false);

        return <span data-testId="toast-success">Aluno(s) deletado(s) com sucesso</span>;
      },
      error: () => {
        return 'Falha ao deletar aluno(s)';
      },
      finally: () => {
        queryClient.refetchQueries({ queryKey: ['students', `PJ: ${selectedPJ?.pjId}`] });
      },
    });
  }

  const formItems = form.watch('items');

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {React.cloneElement(children as ReactElement, { onClick: () => setIsOpen(true) })}
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Você tem certeza absoluta?</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center gap-6 p-6 pb-12">
          <p className="text-sm font-normal">
            Essa ação não pode ser desfeita. Isso excluirá permanentemente sua unidade e removerá os
            dados de nossos servidores.
          </p>
        </div>
        <div className="px-6">
          <CheckboxReactHookFormMultipleSchools schools={student.schools} form={form} />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" className="w-full md:w-fit">
              Cancelar
            </Button>
          </DialogClose>
          <Button
            data-testId="submit-button"
            disabled={formItems.length < 1}
            onClick={() => onDelete(formItems)}
            variant="destructive"
            className="w-full md:w-fit"
          >
            <Trash2Icon className="mr-2 size-4" />
            Deletar Aluno
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
