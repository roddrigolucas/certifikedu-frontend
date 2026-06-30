import React, { forwardRef, ReactElement, useImperativeHandle, useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { Trash2Icon } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

import { pagePaths } from '@/constants/navigation/pagePaths';

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

import { CanvasService } from '@/services/entities/app/canvas';
import { CertificateService } from '@/services/entities/app/legalPerson/certificates';

interface DeleteUser {
  children: ReactElement;
  templateName?: string;
  templateId?: string;
}

const DeleteTemplateDialog = forwardRef(
  ({ children, templateName, templateId }: Readonly<DeleteUser>, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { selectedPJ, isCanvas } = useProfile();
    const { id } = useParams();

    useImperativeHandle(ref, () => ({
      openDialog: () => setIsOpen(true),
    }));

    function onDelete() {
      const response = selectedPJ
        ? CertificateService.DeleteTemplatesById(selectedPJ?.pjId ?? '', id ?? templateId ?? '')
        : CanvasService.DeleteTemplate(templateId ?? '');

      toast.promise(response, {
        loading: 'Em processamento...',
        success: () => {
          setIsOpen(false);
          if (selectedPJ) {
            queryClient.invalidateQueries(['templates', `PJ: ${selectedPJ?.pjId}`]).then(() => {
              queryClient.refetchQueries({ queryKey: ['templates', `PJ: ${selectedPJ?.pjId}`] });
              navigate('/certificates/templates', { replace: true });
            });
          } else if (!!isCanvas) {
            queryClient.refetchQueries({ queryKey: ['canvas-info'] });
            navigate(pagePaths.authenticated.canvas.dashboard, { replace: true });
          }

          return (
            <span data-testId="toast-success">Modelo {templateName} foi deletado com sucesso</span>
          );
        },
        error: () => {
          return 'Falha ao apagar modelo de certificado';
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
              Essa ação não pode ser desfeita. Isso excluirá permanentemente esse modelo de
              certificado e removerá os dados de nossos servidores.
            </p>
            <p className="mr-auto text-3xl font-normal">{templateName}</p>
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
              Deletar modelo de certificado
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  },
);

DeleteTemplateDialog.displayName = 'DeleteTemplateDialog';
export { DeleteTemplateDialog };
