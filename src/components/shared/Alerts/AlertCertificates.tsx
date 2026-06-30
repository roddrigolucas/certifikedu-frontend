import { FileBadgeIcon } from 'lucide-react';

import { Alert, AlertDescription } from '../ui/alert';

interface Props {
  totalCertificates: number;
}
export function AlertCertificates({ totalCertificates }: Props) {
  return (
    <Alert>
      <FileBadgeIcon className="size-4" />
      <AlertDescription className="pt-1 [&_p]:leading-4">
        <strong>
          {totalCertificates} {totalCertificates > 1 ? 'certificados' : 'certificado'}
        </strong>{' '}
        para emitir, salvo com segurança em nossa blockchain.
      </AlertDescription>
    </Alert>
  );
}
