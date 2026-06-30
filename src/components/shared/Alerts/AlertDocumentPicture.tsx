import { AlertTriangleIcon, ShareIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

import useProfile from '@/hooks/core/useProfile';

import { EPictureStatus } from '@/services/entities/app/naturalPerson/profile/enums';

import { Alert, AlertDescription } from '../ui/alert';
import { Button } from '../ui/button';

export function AlertDocumentPicture() {
  const { profileInfo } = useProfile();

  if (profileInfo?.pictureStatus === EPictureStatus.REVIEW) {
    return (
      <Alert variant="warning">
        <span className="inline-flex items-center gap-2">
          <AlertTriangleIcon className="size-4" />
          <AlertDescription>
            Sua documentação está em análise, aguarde a confirmação para emitir certificados e
            comprar créditos.
          </AlertDescription>
        </span>
      </Alert>
    );
  }

  if (profileInfo?.pictureStatus === EPictureStatus.DISABLED) {
    return (
      <Alert variant="destructive">
        <AlertDescription className="flex w-full flex-col items-center justify-between gap-2 md:flex-row">
          <span className="inline-flex items-center gap-2">
            <AlertTriangleIcon className="size-4" />
            Documento de identificação não confirmado, envie sua documentação para emitir
            certificados.
          </span>
          <Link replace to="/account/upload-document" className="w-full sm:w-fit">
            <Button
              variant="outline"
              size="sm"
              className="w-full border-red-50 bg-red-100 hover:bg-red-200 sm:w-fit"
            >
              <ShareIcon className="mr-2 size-4" />
              Enviar Documentos
            </Button>
          </Link>
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Alert variant="destructive">
      <AlertDescription className="flex w-full flex-col items-center justify-between gap-4 sm:flex-row sm:gap-2">
        <span className="inline-flex items-center gap-2">
          <AlertTriangleIcon className="size-4 min-w-4" />
          Você ainda não confirmou a sua identidade, envie sua documentação para emitir
          certificados.
        </span>
        <Link replace to="/account/upload-document" className="w-full sm:w-fit">
          <Button
            variant="outline"
            size="sm"
            className="w-full border-red-50 bg-red-100 hover:bg-red-200 sm:w-fit"
          >
            <ShareIcon className="mr-2 size-4" />
            Enviar Documentos
          </Button>
        </Link>
      </AlertDescription>
    </Alert>
  );
}
