import { AlertTriangleIcon, ArrowUpRightFromSquareIcon } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/shared/ui/alert';
import { Button } from '@/components/shared/ui/button';

export function AlertEnv() {
  const location = window.location.href;
  if (location.includes('devcertifikedu')) {
    return (
      <>
        <Alert variant="destructive" className="inline-flex items-center justify-between">
          <div className="mx-auto flex flex-col items-center gap-2 md:flex-row">
            <AlertTriangleIcon className="size-3.5" />
            <AlertTitle>AMBIENTE DE DESENVOLVIMENTO</AlertTitle>
            <AlertDescription>
              Você está acessando o ambiente de desenvolvimento da CertifikEDU. Se você é um usuário
              tradicional, clique no botão para acessar o ambiente correto.
            </AlertDescription>
            <a href="https://app.certifikedu.com/">
              <Button variant="destructive" size="sm">
                <ArrowUpRightFromSquareIcon className="mr-2 size-4" />
                Acessar CertifikEDU.com.br
              </Button>
            </a>
          </div>
        </Alert>
      </>
    );
  }
}
