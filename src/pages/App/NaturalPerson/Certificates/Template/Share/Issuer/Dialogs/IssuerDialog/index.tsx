import React, { ReactElement, useState } from 'react';

import { useMutation } from '@tanstack/react-query';
import AtomicSpinner from 'atomic-spinner';
import { Clock2, PenLine, Users } from 'lucide-react';
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

import useCertificatePJ from '@/hooks/core/useCertificatePJ';
import useProfile from '@/hooks/core/useProfile';

import { CanvasService } from '@/services/entities/app/canvas';
import { CertificateService } from '@/services/entities/app/legalPerson/certificates';
import { IStudentIssuerCourse } from '@/services/entities/app/legalPerson/students/model';

interface IEmiteCertificate {
  children: ReactElement;
  templateName?: string;
  users: IStudentIssuerCourse[];
}

interface ICPF {
  cpfs: string[];
}

interface IIDs {
  userIds: string[];
}

export function IssuerUserDialog({ children, users }: Readonly<IEmiteCertificate>) {
  const [isOpen, setIsOpen] = useState(false);
  const { lastCertificatesState, lastCertificatesStateCanvas } = useCertificatePJ();
  const [isLoading, setIsLoading] = useState(false);

  const { selectedPJ, UpdateCredits, isCanvas } = useProfile();
  const { id } = useParams();

  const { mutate: EmitTemplatesToStudents, isLoading: isLoadingEmitTemplatesToStudents } =
    useMutation<any, Error, { selectedPJ: string; id: string; data: ICPF }>(
      ({ selectedPJ, id, data }) =>
        CertificateService.EmitTemplatesToStudents(selectedPJ, id, data),
    );

  const { mutate: EmitTemplatesToCanvasStudents } = useMutation<
    any,
    Error,
    { templateId: string; data: IIDs }
  >(({ templateId, data }) => CanvasService.EmitTemplatesToStudents(templateId, data));

  function onSubmit() {
    if (selectedPJ) {
      const valuesList = users?.map((user) => user?.document);

      const CPFS = { cpfs: valuesList };
      EmitTemplatesToStudents(
        {
          selectedPJ: selectedPJ?.pjId ?? '',
          id: id ?? '',
          data: CPFS,
        },
        {
          onSuccess: () => {
            toast.success(
              <span data-testId="toast-success">Certificado(s) emitido(s) com sucesso</span>,
            );
            setIsLoading(true);
            setTimeout(() => {
              lastCertificatesState.refetch();
              UpdateCredits();
            }, 2000);
            setTimeout(() => {
              setIsLoading(false);
              setIsOpen(false);
            }, 15000);
          },
          onError: () => {
            toast.error('Erro ao emitir certificado(s), tente novamente...');
          },
        },
      );
    } else if (!!isCanvas) {
      const valuesList = users?.map((user) => user?.userId);

      const IDs = { userIds: valuesList ?? [] } as IIDs;
      EmitTemplatesToCanvasStudents(
        {
          templateId: id ?? '',
          data: IDs,
        },
        {
          onSuccess: () => {
            toast.success('Envio feito com successo');
            setIsLoading(true);
            lastCertificatesStateCanvas.refetch();
            queryClient.refetchQueries({ queryKey: ['canvas-certificates'] });
            setTimeout(() => {
              setIsLoading(false);
              setIsOpen(false);
            }, 15000);
          },
          onError: () => {
            toast.error('Erro emitindo certificados, tente novamente...');
          },
        },
      );
    }
  }

  const handleExternalSubmit = onSubmit;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {React.cloneElement(children as ReactElement, { onClick: () => setIsOpen(true) })}
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {isLoading ? 'Gerando certificados ...' : 'Emitir certificado para alunos'}
          </DialogTitle>
        </DialogHeader>
        {isLoading && (
          <>
            <div className="flex justify-center">
              <AtomicSpinner displayElectronPaths={false} electronPathCount={15} />
            </div>
            <p className="text-md px-4 text-left font-bold">
              Os certificados estão sendo gerados para {users?.length ?? '0'} aluno(s).
            </p>
            <div className="inline-flex gap-2 px-4">
              <Clock2 />
              <p className="text-md text-left font-normal ">
                Dependendo da quantidade, esse processo pode levar alguns minutos para gerar todas
                as imagens e salvar em nossa blockchain.
              </p>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button
                  onClick={() => setIsLoading(false)}
                  variant="outline"
                  className="w-full md:w-fit"
                >
                  Fechar
                </Button>
              </DialogClose>
            </DialogFooter>
          </>
        )}
        {!isLoading && (
          <>
            <div className="flex flex-col gap-6 p-6">
              <p className="text-left text-sm font-bold">Revise as informações abaixo</p>
              <div className="flex flex-col gap-6 py-6 pb-12">
                <p className="text-sm font-normal">
                  Essa ação não pode ser desfeita. Voce emitirá o certificado:
                </p>
                <div className="mr-auto mt-5 flex flex-row gap-3">
                  <Users />
                  <p className="text-lg font-normal">Para {users?.length ?? '0'} aluno(s).</p>
                </div>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" className="w-full md:w-fit">
                  Cancelar
                </Button>
              </DialogClose>
              <Button
                variant="secondary"
                data-testId="submit-button"
                isLoading={isLoadingEmitTemplatesToStudents}
                onClick={handleExternalSubmit}
                className="w-full md:w-fit"
              >
                <PenLine className="mr-2 size-4" />
                Emitir Certificados
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
