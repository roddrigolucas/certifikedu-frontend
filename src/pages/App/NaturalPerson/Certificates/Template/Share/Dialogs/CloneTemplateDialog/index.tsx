import React, { forwardRef, ReactElement, useImperativeHandle, useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import AtomicSpinner from 'atomic-spinner';
import { Copy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
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

interface CloneCertificate {
  children: ReactElement;
  templateName: string;
  templateId: string;
}

const CloneTemplateDialog = forwardRef(
  ({ children, templateName, templateId }: Readonly<CloneCertificate>, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { selectedPJ, isCanvas } = useProfile();

    useImperativeHandle(ref, () => ({
      openDialog: () => setIsOpen(true),
    }));

    function onClone() {
      const response = selectedPJ
        ? CertificateService.CloneTemplate(selectedPJ?.pjId ?? '', templateId)
        : CanvasService.CloneTemplate(templateId);

      setIsLoading(true);
      toast.promise(response, {
        loading: 'Em processamento...',
        success: () => {
          setIsLoading(false);
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
            <span data-testId="cloned-success">Modelo de certificado clonado com sucesso</span>
          );
        },
        error: () => {
          return 'Falha ao clonar modelo de certificado';
        },
        finally: () => {
          setIsLoading(false);
        },
      });
    }

    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        {React.cloneElement(children as ReactElement, { onClick: () => setIsOpen(true) })}
        {isLoading ? (
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Clonar Modelo de Certificado</DialogTitle>
            </DialogHeader>
            <div className="flex justify-center ">
              <AtomicSpinner displayElectronPaths={false} electronPathCount={15} />
            </div>
            <div className="flex flex-col gap-6 p-6 pb-12">
              <p className=" text-center text-2xl font-normal">O certificado está sendo clonado!</p>
            </div>
          </DialogContent>
        ) : (
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Clonar Modelo de Certificado</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-6 p-6 pb-12">
              <p className="text-sm font-normal">Tem certeza que deseja clonar este certificado?</p>
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
                variant="success"
                onClick={() => onClone()}
                isLoading={isLoading}
                disabled={isLoading}
                className="w-full md:w-fit"
              >
                <Copy className="mr-2 size-4" />
                Clonar Modelo de Certificado
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    );
  },
);

CloneTemplateDialog.displayName = 'CloneTemplateDialog';
export { CloneTemplateDialog };
