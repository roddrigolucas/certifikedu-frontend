import { useState } from 'react';

import { CopyIcon, LockKeyhole, QrCodeIcon, Settings } from 'lucide-react';
import QRCode from 'qrcode.react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

import FileUploaderTest from '@/components/core/molecules/UploadFileButton';
import { Button } from '@/components/shared/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/shared/ui/dialog';
import { Input } from '@/components/shared/ui/input';

import useProfile from '@/hooks/core/useProfile';

import { ITemplate } from '@/services/entities/app/naturalPerson/templates/model';

import { QrCodeForm } from './QrCodeForm';

interface QrCodeSectionProps {
  qrCodeData: ITemplate;
}

export function QrCodeSection({ qrCodeData }: QrCodeSectionProps) {
  const { id } = useParams<{ id: string }>();
  const { selectedPJ } = useProfile();
  const [isQRCodeSettings, setIsQRCodeSettings] = useState<boolean>(false);

  const url = `${import.meta.env.VITE_APPLICATION_URL}/certificates/receive/${id}`;

  const onCopy = () => {
    navigator.clipboard?.writeText(url).then(() => {
      toast.success('Link copiado com sucesso');
    });
  };

  return (
    <div className="inline-flex gap-2 ">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full gap-2 p-3 hover:bg-emerald-200" size="icon">
            <QrCodeIcon className="size-5" />
            Visualizar QRCode
          </Button>
        </DialogTrigger>
        <DialogContent className="h-[90%] overflow-auto md:h-auto  ">
          <DialogHeader>
            <DialogTitle>QRCode para compartilhar com o público</DialogTitle>
          </DialogHeader>
          {isQRCodeSettings ? (
            id && (
              <QrCodeForm
                setIsQRCodeSettings={setIsQRCodeSettings}
                id={id}
                selectedPJ={selectedPJ?.pjId ?? ''}
                qrCodeData={qrCodeData}
              />
            )
          ) : (
            <div className="flex flex-col items-center gap-6 p-8">
              <p className="center-text text-slate-600">
                Agora você pode emitir seu certificado de forma rápida e eficiente!{' '}
                <span className="font-bold">
                  {' '}
                  Basta escanear o QR Code exibido na tela para que leitor receba esse certificado
                  em sua conta Certifikedu.
                </span>
              </p>
              <QRCode value={url} size={248} className="w-full" />
              <div className="relative flex w-full flex-col items-center py-2 text-slate-600">
                <span className="absolute z-10 bg-white px-2">Ou copiar o link abaixo:</span>
                <hr className="absolute w-full translate-y-3" />
              </div>
              <div className="inline-flex w-full gap-2 pt-6">
                <Input value={url} disabled className="h-12" />
                <Button size="icon" variant="outline" onClick={() => onCopy()}>
                  <CopyIcon className="size-5" />
                </Button>
              </div>
              <div className="col-span-12 flex flex-col gap-4 md:flex-row lg:col-span-2">
                <Button variant="ghost" type="button" onClick={() => setIsQRCodeSettings(true)}>
                  <Settings className="mr-1 size-5" />
                  Configurações do QRCode
                </Button>
                <FileUploaderTest>
                  <Button variant="ghost" type="button">
                    <LockKeyhole className="mr-1 size-5" />
                    Cadastrar CPFs permitidos
                  </Button>
                </FileUploaderTest>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
