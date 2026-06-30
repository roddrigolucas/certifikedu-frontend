import { useMutation } from '@tanstack/react-query';
import {
  AirplayIcon,
  AlertTriangleIcon,
  BookOpenText,
  LockKeyhole,
  Network,
  UserCog2Icon,
} from 'lucide-react';
import { toast } from 'sonner';

import CopyButton from '@/components/core/molecules/CopyButton/CopyButton';
import { ApplicationLayout } from '@/components/layouts/app';
import { Alert, AlertDescription } from '@/components/shared/ui/alert';
import { Badge } from '@/components/shared/ui/badge';
import { Button } from '@/components/shared/ui/button';

import useProfile from '@/hooks/core/useProfile';

import { LegalPersonService } from '@/services/entities/app/legalPerson/legalPerson';
import { EPictureStatus } from '@/services/entities/app/naturalPerson/profile/enums';

import { DataTableLegalPerson } from './Table';

interface AlertAdminProps {
  name: string;
}

function AlertLegalPerson({ name }: AlertAdminProps): JSX.Element {
  return (
    <Alert variant="success">
      <AlertDescription className="flex w-full flex-col items-center  justify-between gap-4 sm:flex-row sm:gap-2">
        <span className="inline-flex items-center gap-2">
          <UserCog2Icon className="size-4 min-w-4" />
          Bem-vindo ao ambiente corporativo da CertifikEDU! Você está na conta que administra a
          Instituição
        </span>
        <div className="flex w-full items-center justify-center rounded-full border border-emerald-950/5 px-4 py-2 md:w-fit">
          <div className="flex items-center justify-center text-emerald-950">
            <BookOpenText className="mr-2 size-5" />
            <p className="text-md">{name}</p>
          </div>
        </div>
      </AlertDescription>
    </Alert>
  );
}
function AlertDocumentPicture() {
  const { profileInfo } = useProfile();

  if (profileInfo?.status !== EPictureStatus.ENABLED) {
    return (
      <Alert variant="warning">
        <span className="inline-flex items-center gap-2">
          <AlertTriangleIcon className="size-4" />
          <AlertDescription>
            Sua documentação está em análise, aguarde a confirmação para emitir certificados e
            cadastrar colaboradores .
          </AlertDescription>
        </span>
      </Alert>
    );
  }
}

export default function LegalPersonTablePage() {
  const { profileInfo, UpdateCredits } = useProfile();

  const { mutate: createApiKey, isLoading } = useMutation<unknown, Error, any>(
    async () => await LegalPersonService.CreateApiKey(),
  );

  const generateApiKey = async () => {
    createApiKey(undefined, {
      onSuccess: () => {
        toast.success('API Key gerada com sucesso.', {
          duration: 2000,
        });
        UpdateCredits();
      },
      onError: () => {
        toast.error('Erro gerando API Key, por favor, atualize a página', {
          duration: 2000,
        });
      },
    });
  };

  return (
    <ApplicationLayout icon={AirplayIcon} hideCredits={true} title="Meu Painel">
      <AlertLegalPerson name={profileInfo?.name ?? ''} />
      <AlertDocumentPicture />
      <div className="flex flex-col gap-10 md:flex-row">
        {profileInfo?.apiEnabled && (
          <div>
            <h3 className="text-xl font-bold text-slate-800">Gestão da API</h3>
            <div className="inline-flex gap-2">
              {profileInfo?.apiKey !== null && (
                <div className="inline-flex w-full items-center gap-4">
                  <LockKeyhole className="hidden size-6 text-ecstasy-500 md:flex" />
                  <CopyButton apiKey={profileInfo?.apiKey?.apiKey ?? ''} />
                </div>
              )}
              {profileInfo?.apiKey === null && (
                <div>
                  <Button
                    type="button"
                    onClick={() => generateApiKey()}
                    variant="secondary"
                    className="w-full"
                    isLoading={isLoading}
                  >
                    <Network className="mr-3" />
                    Gerar API KEY
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
        <div className="flex flex-col ">
          <h3 className="text-xl font-bold text-slate-800">Integração com Canvas</h3>
          <div className="inline-flex gap-2">
            <div className="mt-3 inline-flex w-full items-center gap-4">
              <Badge variant={profileInfo?.canvasConfigured ? 'success' : 'destructive'}>
                {profileInfo?.canvasConfigured ? 'Configurado' : 'Não configurado'}
              </Badge>
            </div>
          </div>
        </div>
      </div>
      <DataTableLegalPerson data={profileInfo?.admins ?? []} />
    </ApplicationLayout>
  );
}
