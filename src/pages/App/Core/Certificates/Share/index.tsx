import { useState } from 'react';

import { PDFDownloadLink } from '@react-pdf/renderer';
import {
  ArrowRightLeft,
  BookKeyIcon,
  Clock9Icon,
  CopyIcon,
  Download,
  EyeIcon,
  FileBadge,
  LucideIcon,
  QrCodeIcon,
  School2,
} from 'lucide-react';
import QRCode from 'qrcode.react';
import { Helmet } from 'react-helmet';
import { FaFacebook, FaLinkedin } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import { FacebookShareButton, LinkedinShareButton } from 'react-share';
import { toast } from 'sonner';

import FullscreenLoadingOverlay from '@/components/core/atoms/FullscreenLoadingOverlay';
import { Logo } from '@/components/core/atoms/Logo';
import { GridIconItem } from '@/components/shared/GridIconItem';
import { Avatar, AvatarFallback } from '@/components/shared/ui/avatar';
import { Badge } from '@/components/shared/ui/badge';
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

import { CategoriesSection } from '@/utils/abilitiesSection';
import { getInitials } from '@/utils/getInitials';
import { getImageUrl } from '@/utils/image';

import CertificatePDF from './PDF';
import TrailView from './TrailView';

interface IHandleExternalDownload {
  filePath: string;
  fileName: string;
}

async function handleExternalDownload({ filePath, fileName }: IHandleExternalDownload) {
  const url = getImageUrl(filePath);
  const response = await fetch(url);
  const blob = await response.blob();
  const objectURL = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = objectURL;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(objectURL);
}

export default function CertificateSharePage() {
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
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>{`${data.name} de ${data.receptorName} - CertifikEDU`}</title>
        <meta
          name="title"
          property="og:title"
          content={`${data.name} de ${data.receptorName} - CertifikEDU`}
        />
        <meta name="description" property="og:description" content={data.description} />
        <meta
          name="image"
          property="og:image"
          content={getImageUrl(`public_certificates/${hash}.png`)}
        />
        <meta
          property="og:url"
          content={`${import.meta.env.VITE_APPLICATION_URL}/certificates/share/${hash}`}
        />
        <meta property="og:site_name" content="CertifikDU" />
      </Helmet>
      <Header
        name={data.receptorName || ''}
        autoIssuer={data.issuerName === data.receptorName}
        issuedAt={data.issuedAt}
      />
      <div className="container flex flex-col gap-8 py-8 md:gap-6">
        <h2 className="text-center text-xl font-bold md:text-left md:text-4xl">
          Certificado de Conclusão
        </h2>
        {!!data?.inverseUrl && (
          <Button
            onClick={() => setSeeInverse(!seeInverse)}
            variant="ghost"
            className="group sm:w-fit"
            size="sm"
          >
            <ArrowRightLeft className="ease mr-1 size-4 transition-transform duration-500 group-hover:rotate-180" />
            {seeInverse ? 'Ver Frente' : 'Ver Verso'}
          </Button>
        )}
        <div className="mt-2 grid grid-cols-2 gap-12">
          <div className="col-span-2 flex w-full flex-col gap-6 lg:col-span-1 lg:gap-8">
            <div className="relative w-full overflow-hidden rounded-3xl border border-slate-200 ">
              <div className="absolute z-10 inline-flex size-full flex-col-reverse justify-start gap-4 bg-gradient-to-t from-white via-white to-transparent p-6 md:flex-row md:items-end md:justify-between md:via-white/80 md:p-9">
                <Link to={`/certificates/share/${hash}/view`}>
                  <Button variant="outline" className="w-full md:w-fit">
                    <EyeIcon className="mr-2 size-5" />
                    Visualizar Certificado
                  </Button>
                </Link>
                <ShareCertificate
                  title={`${data.name} de ${data.receptorName} - CertifikEDU`}
                  description={data.description}
                  certificatePicture={data.certificatePicture}
                  inverseUrl={data.inverseUrl}
                  hoursWorkload={data.hoursWorkload}
                  data={data}
                />
              </div>
              <img
                src={getImageUrl(seeInverse ? data?.inverseUrl ?? '' : data.certificatePicture)}
                alt="Certificate"
                className="w-full border pb-48 md:pb-0"
              />
            </div>
          </div>
          <div className="col-span-2 flex flex-col gap-6 md:col-span-1 md:gap-8">
            <div id="content" className="flex flex-col gap-8">
              <h3 className="text-2xl font-bold">{data.name}</h3>
              <SectionItem title="Emitido por" icon={School2}>
                {data.issuerName === data.receptorName ? (
                  <Badge className="uppercase" variant="success">
                    Autoemitido
                  </Badge>
                ) : (
                  <p className="text-slate-600">{data.issuerName}</p>
                )}
              </SectionItem>
              {data.hoursWorkload > 0 && (
                <SectionItem title="Carga Horária" icon={Clock9Icon}>
                  <p className="text-slate-600">
                    {Number(data.hoursWorkload) % 1 === 0
                      ? Number(data.hoursWorkload)
                      : Number(data.hoursWorkload).toFixed(2)}{' '}
                    horas
                  </p>
                </SectionItem>
              )}
              <div className="flex flex-row gap-5">
                <GridIconItem icon={BookKeyIcon} title="Blockchain">
                  <Badge
                    className="w-fit uppercase"
                    variant={data.blockchain ? 'success' : 'destructive'}
                  >
                    {data.blockchain ? 'Possui' : 'Não possui'}
                  </Badge>
                </GridIconItem>
                <GridIconItem icon={FileBadge} title="OpenBadge">
                  <Badge
                    className="w-fit uppercase"
                    variant={data.openBadge ? 'success' : 'destructive'}
                  >
                    {data.openBadge ? 'Possui' : 'Não possui'}
                  </Badge>
                </GridIconItem>
              </div>
              {data.openBadge && (
                <div className="flex items-start justify-start">
                  <Button
                    variant="secondary"
                    className="group w-full lg:w-fit"
                    size="sm"
                    onClick={() =>
                      handleExternalDownload({
                        filePath: data.openBadgePicture,
                        fileName: `OpenBadge-${data.name} de ${data.receptorName}-CertifikEDU.png`,
                      })
                    }
                  >
                    <Download className="ease mr-1 size-4 transition-transform duration-500 group-hover:rotate-[360deg]" />
                    Baixar OpenBadge®
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="mt-4 text-xl font-bold">Descrição</h1>
          <p className="leading-[175%] text-slate-600">{data.description}</p>
        </div>
        <div className="mt-2 flex flex-col gap-2">
          <SectionItem title="Competências/Habilidades">
            <div className="inline-flex flex-wrap gap-1">
              {data.abilities.length > 0 && <CategoriesSection items={data.abilities} />}
            </div>
          </SectionItem>
        </div>
        <div className="mt-2 flex gap-2">
          {data.pathInfo && (
            <SectionItem title="Trilha de Aprendizagem">
              <TrailView data={data.pathInfo} />
            </SectionItem>
          )}
        </div>

        {/* {data.openBadge && !closeOpenBadge && (
          <motion.div
            variants={slideUp}
            initial="hidden"
            animate="show"
            className="fixed bottom-0 z-20 max-w-screen-xl pr-8 xl:pr-0"
          >
            <div className="flex flex-row items-start justify-between">
              <Alert variant="success">
                <div className="flex flex-row">
                  💡 OpenBadges® são distintivos digitais que validam suas habilidades e
                  conquistas. Eles são fáceis de compartilhar em redes sociais e currículos online,
                  aumentando sua visibilidade profissional. Cada badge contém metadados verificáveis
                  que detalham como, quando e por quem foi emitido, oferecendo um reconhecimento
                  transparente e confiável de suas capacidades.
                  <div className="flex items-start">
                    <Badge
                      onClick={() => setCloseOpenBadge(true)}
                      className="ml-4 cursor-pointer hover:bg-green-200"
                      variant="outline"
                    >
                      X
                    </Badge>
                  </div>
                </div>
                <Button
                  variant="secondary"
                  className="group mt-3"
                  size="sm"
                  onClick={() =>
                    handleExternalDownload({
                      filePath: data.openBadgePicture,
                      fileName: `OpenBadge-${data.name} de ${data.receptorName}-CertifikEDU.png`,
                    })
                  }
                >
                  <Download className="ease mr-1 size-4 transition-transform duration-500 group-hover:rotate-[360deg]" />
                  Baixar OpenBadge®
                </Button>
              </Alert>
            </div>
          </motion.div>
        )} */}
      </div>
    </div>
  );
}

function Header({
  name,
  issuedAt,
  autoIssuer = false,
}: Readonly<{
  name: string;
  issuedAt: string;
  autoIssuer?: boolean;
}>) {
  function formatDate(dateString: string): string {
    const dateParts = dateString.split('/');
    const day = parseInt(dateParts[0]);
    const month = parseInt(dateParts[1]);
    const year = parseInt(dateParts[2]);

    const date = new Date(year, month - 1, day); // Month is zero-based

    const options = {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    } as Intl.DateTimeFormatOptions;
    const formattedDate = date.toLocaleDateString('pt-BR', options);

    return formattedDate;
  }

  return (
    <header className="flex w-full flex-col border border-slate-100 bg-white">
      <div className=" inline-flex h-20 w-full items-center border-b border-ecstasy-100 bg-ecstasy-50 md:h-24">
        <div className="container inline-flex items-center">
          <Logo path="images/logo_text_color.svg" className="h-8 md:h-10" />
        </div>
      </div>
      <div className="container inline-flex w-full items-center justify-center py-4 md:justify-between">
        <div className="flex flex-col items-center gap-2 md:flex-row md:gap-4">
          <Avatar className="rounded-lg">
            <AvatarFallback className="rounded-lg bg-slate-50">{getInitials(name)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <h1 className="text-center text-sm font-normal md:text-left md:text-base">
              Emitido para <strong>{name}</strong> em <strong>{formatDate(issuedAt)}</strong>.
            </h1>
          </div>
        </div>
        {!autoIssuer && (
          <div className="inline-flex items-center gap-2">
            <img src={getImageUrl('images/medal.svg')} alt="Badge" className="size-6" />
            <p className="text-ecstasy-950">Autenticidade garantida</p>
          </div>
        )}
      </div>
    </header>
  );
}

function SectionItem({
  title,
  children,
  ...props
}: Readonly<{
  title: string;
  icon?: LucideIcon;
  children: React.ReactNode;
}>) {
  return (
    <div className="flex w-full flex-col gap-2">
      <h3 className="text-xl font-bold">{title}</h3>
      <div className="inline-flex items-center gap-2">
        {props.icon && <props.icon className="size-4 text-slate-600" />}
        {children}
      </div>
    </div>
  );
}

function ShareCertificate({
  title,
  description,
  certificatePicture,
  inverseUrl,
  hoursWorkload,
  data,
}: Readonly<{
  title: string;
  description: string;
  certificatePicture: string;
  inverseUrl?: string;
  hoursWorkload?: number;
  data: any;
}>) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { hash } = useParams();
  const location = window.location.pathname;
  const urlOrigin = import.meta.env.VITE_APPLICATION_URL;
  const url = `${urlOrigin}${location}`;
  // Logic to download images
  const handleDownloadImages = async () => {
    // Download Front
    await handleExternalDownload({
      filePath: certificatePicture,
      fileName: `Certificado-Frente-${title}.png`,
    });

    // If Back exists, download Back
    if (inverseUrl) {
      setTimeout(() => {
        handleExternalDownload({
          filePath: inverseUrl,
          fileName: `Certificado-Verso-${title}.png`,
        });
      }, 500); // Small delay to ensure browser handles both downloads
    }

    setIsDropdownOpen(false);
  };

  const onCopy = () => {
    navigator.clipboard?.writeText(url).then(() => {
      toast.success('Link copiado com sucesso');
    });
  };

  return (
    <div className="flex flex-col items-center gap-2 md:items-end">
      <h5 className="mx-auto flex text-xs font-bold uppercase">Compartilhe esse certificado</h5>
      <TooltipProvider>
        <div className="relative inline-flex gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <Download className="size-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Baixar</p>
            </TooltipContent>
          </Tooltip>
          {isDropdownOpen && (
            <div className="absolute bottom-full left-0 mb-2 w-40 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
              <div className="py-1">
                <PDFDownloadLink
                  document={
                    <CertificatePDF
                      certificateImageUrl={getImageUrl(certificatePicture)}
                      certificateCode={hash || ''}
                      inverseImageUrl={inverseUrl ? getImageUrl(inverseUrl) : undefined}
                      description={description}
                      hoursWorkload={hoursWorkload}
                      dataAbilities={data.abilities}
                    />
                  }
                  fileName={`Certificado-${title}.pdf`}
                >
                  {({ loading }) => (
                    <button className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100">
                      {loading ? 'Gerando PDF...' : 'Baixar como PDF'}
                    </button>
                  )}
                </PDFDownloadLink>

                <button
                  onClick={handleDownloadImages}
                  className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                >
                  {inverseUrl ? 'Baixar Imagens (Frente/Verso)' : 'Baixar como Imagem'}
                </button>
              </div>
            </div>
          )}
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
