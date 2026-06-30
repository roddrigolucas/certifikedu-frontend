import { useState } from 'react';

import { ArrowRightLeft, Award, CopyIcon, Download, QrCodeIcon } from 'lucide-react';
import QRCode from 'qrcode.react';
import { Helmet } from 'react-helmet';
import { FaFacebook, FaLinkedin } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { FacebookShareButton, LinkedinShareButton } from 'react-share';
import { toast } from 'sonner';

import FullscreenLoadingOverlay from '@/components/core/atoms/FullscreenLoadingOverlay';
import { Logo } from '@/components/core/atoms/Logo';
import { BackButton } from '@/components/shared/BackButton';
import { Button } from '@/components/shared/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/shared/ui/dialog';
import { Input } from '@/components/shared/ui/input';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/shared/ui/tooltip';

import useRequestProcessor from '@/hooks/core/useRequest';

import { CertificateService } from '@/services/entities/app/naturalPerson/certificates';

import { getImageUrl } from '@/utils/image';

export default function CertificateShareViewPage() {
  const { hash } = useParams();
  const [seeInverse, setSeeInverse] = useState(false);

  const { isLoading, data } = useRequestProcessor().query(
    ['certificate', `hash: ${hash}`],
    async () => await CertificateService.GetPublic(hash ?? ''),
    {
      enabled: !!hash,
    },
  );

  if (isLoading || !data || !hash) {
    return <FullscreenLoadingOverlay />;
  }

  return (
    <div className="relative h-full min-h-screen bg-white">
      <Helmet>
        <title>{`${data.name} de ${data.receptorName} - CertifikEDU`}</title>
        <meta
          name="title"
          property="og:title"
          content={`${data.name} de ${data.receptorName} - CertifikEDU`}
        />
        <meta name="description" property="og:description" content={data.description} />
        <meta name="image" property="og:image" content={getImageUrl(data.certificatePicture)} />
        <meta
          property="og:url"
          content={`${import.meta.env.VITE_APPLICATION_URL}/certificates/share/${hash}`}
        />
        <meta property="og:site_name" content="CertifikDU" />
      </Helmet>
      <Header />
      <div className="absolute w-full select-none bg-ecstasy-50 " />
      <div className="container relative z-10 flex flex-col items-center gap-8 py-12 md:gap-12">
        <div className="mr-auto flex">
          <BackButton href={`/certificates/share/${hash}`}>Voltar</BackButton>
        </div>
        <div className="flex flex-row gap-2 md:-mt-5">
          <h2 className="text-center text-xl font-bold md:text-4xl">Conquista Atingida! </h2>
          <Award className="size-12  text-amber-600" />
        </div>
        <div className="w-full max-w-screen-md">
          {!!data?.inverseUrl && (
            <Button
              onClick={() => setSeeInverse(!seeInverse)}
              variant="ghost"
              className="group mr-auto flex items-start justify-start sm:w-fit"
              size="sm"
            >
              <ArrowRightLeft className="ease mr-1 size-4 transition-transform duration-500 group-hover:rotate-180" />
              {seeInverse ? 'Ver Frente' : 'Ver Verso'}
            </Button>
          )}
          <img
            src={getImageUrl(seeInverse ? data?.inverseUrl ?? '' : data.certificatePicture)}
            alt="Certificate"
            className="w-full max-w-screen-md rounded-2xl border"
          />
        </div>
        <ShareCertificate
          title={`${data.name} de ${data.receptorName} - CertifikEDU`}
          description={data.description}
          certificatePicture={data.certificatePicture}
        />
      </div>
    </div>
  );
}

function Header() {
  return (
    <header className="flex w-full flex-col border border-ecstasy-100 bg-white">
      <div className=" inline-flex h-20 w-full items-center bg-ecstasy-50 md:h-24">
        <div className="container inline-flex items-center">
          <Logo path="images/logo_text_color.svg" className="h-8 md:h-10" />
        </div>
      </div>
    </header>
  );
}

function ShareCertificate({
  title,
  description,
  certificatePicture,
}: Readonly<{
  title: string;
  description: string;
  certificatePicture: string;
  inversePicture?: boolean;
}>) {
  const { hash } = useParams();

  const location = window.location.pathname;
  const urlOrigin = import.meta.env.VITE_APPLICATION_URL;

  const url = `${urlOrigin}${location}`;

  const onCopy = () => {
    navigator.clipboard?.writeText(url).then(() => {
      toast.success('Link copiado com sucesso');
    });
  };

  return (
    <div className="flex flex-col items-center gap-2 md:items-end">
      <h5 className="mx-auto flex text-xs font-bold uppercase">Compartilhe esse certificado</h5>
      <TooltipProvider>
        <div className="inline-flex gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <a href={getImageUrl(certificatePicture)} download={`Certificado-${hash}.png`}>
                <Button variant="outline" size="icon">
                  <Download className="size-5" />
                </Button>
              </a>
            </TooltipTrigger>
            <TooltipContent>
              <p>Baixar</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <FacebookShareButton url={url} hashtag="CertifikEDU">
                <Button variant="outline" size="icon">
                  <FaFacebook className="size-5" />
                </Button>
              </FacebookShareButton>
            </TooltipTrigger>
            <TooltipContent>
              <p>Facebook</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <LinkedinShareButton
                url={`${urlOrigin}/${certificatePicture.split('/certificate_image.png')[0]}/${hash}`}
                title={title}
                summary={description}
                source="CertifikEDU"
              >
                <Button variant="outline" size="icon">
                  <FaLinkedin className="size-5" />
                </Button>
              </LinkedinShareButton>
            </TooltipTrigger>
            <TooltipContent>
              <p>LinkedIn</p>
            </TooltipContent>
          </Tooltip>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon">
                <QrCodeIcon className="size-5" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Compartilhe esse certificado</DialogTitle>
              </DialogHeader>
              <div className="flex flex-col items-center gap-6 p-8">
                <p className="text-slate-600">
                  Agora você pode compartilhar esse certificado de forma rápida e eficiente! Basta
                  escanear o QR Code exibido na tela para enviar esse certificado para amigos,
                  colegas ou redes sociais.
                </p>
                <QRCode value={url} size={248} className="size-full" />
                <div className="relative flex w-full flex-col items-center py-2 text-slate-600">
                  <span className="absolute z-10 bg-white px-2">Ou copie o link abaixo:</span>
                  <hr className="absolute w-full translate-y-3" />
                </div>
                <div className="inline-flex w-full gap-2 pt-6">
                  <Input value={url} disabled className="h-12" />
                  <Button size="icon" variant="outline" onClick={() => onCopy()}>
                    <CopyIcon className="size-5" />
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </TooltipProvider>
    </div>
  );
}
