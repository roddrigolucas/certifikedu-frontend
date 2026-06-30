/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';

import {
  AwardIcon,
  BookKeyIcon,
  CalendarFoldIcon,
  Clock9Icon,
  FileBadgeIcon,
  FileSearchIcon,
  LightbulbIcon,
  LinkIcon,
  SchoolIcon,
  Share2Icon,
  UserIcon,
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

import LinkedInButton from '@/components/core/molecules/AddCertificateLinkedinButton';
import { ApplicationLayout } from '@/components/layouts/app';
import { PageSkeletonFull } from '@/components/layouts/app/shared/PageSkeleton';
import { queryClient } from '@/components/Providers';
import { BackButton } from '@/components/shared/BackButton';
import { GridIconItem } from '@/components/shared/GridIconItem';
import { Alert } from '@/components/shared/ui/alert';
import { Badge } from '@/components/shared/ui/badge';
import { Button } from '@/components/shared/ui/button';

import useProfile from '@/hooks/core/useProfile';
import useRequestProcessor from '@/hooks/core/useRequest';

import { CertificateService } from '@/services/entities/app/naturalPerson/certificates';
import { ECertificateStatus } from '@/services/entities/app/naturalPerson/certificates/enums';
import { IUserCertificate } from '@/services/entities/app/naturalPerson/certificates/model';

import { getImageUrl } from '@/utils/image';
import { buildCertificatesPageUrl } from '@/utils/url';

export default function CertificateViewPage() {
  const { id } = useParams();
  const { profileData } = useProfile();

  const { isLoading, data } = useRequestProcessor().query(
    ['certificate', `id: ${id}`],
    async () => await CertificateService.GetById(id ?? ''),
    {
      enabled: !!id,
    },
  );
  if (isLoading || !data || !id) {
    return (
      <ApplicationLayout icon={FileBadgeIcon} title="Carregando ...">
        <PageSkeletonFull />
      </ApplicationLayout>
    );
  }

  return (
    <ApplicationLayout icon={FileBadgeIcon} title="Meu Certificado" hideCredits>
      <div className="space-y-3">
        <BackButton href={buildCertificatesPageUrl()}>Voltar para Meus Certificados</BackButton>
        <div className="mb-48 flex-col rounded-xl border border-slate-200 bg-white">
          <header className="flex w-full flex-col justify-between gap-4 rounded-t-xl border-b border-slate-200 bg-slate-50 p-6 lg:flex-row lg:items-center">
            <div className="inline-flex items-center gap-6">
              <div className="flex size-16 items-center justify-center rounded-2xl  md:size-24">
                <img src={getImageUrl('images/badge.svg')} alt="Certificate" className="w-full" />
              </div>
              <h2 className="text-lg font-bold md:text-3xl">{data.name}</h2>
            </div>
            {data.receptorDoc === profileData?.naturalPerson?.cpf && (
              <CreatePublicLink data={data} />
            )}
          </header>
          <div className="flex flex-col gap-8 p-6 md:p-12">
            <div className="grid grid-cols-12 gap-8">
              <GridIconItem icon={SchoolIcon} title="Emitido por">
                {data.issuerName === data.receptorName ? (
                  <Badge data-testId="selfIssued-badge" className="uppercase" variant="success">
                    Autoemitido
                  </Badge>
                ) : (
                  data.issuerName
                )}
              </GridIconItem>
              <GridIconItem icon={UserIcon} title="Emitido para">
                {data.receptorName}
              </GridIconItem>
              {data.hoursWorkload > 0 && (
                <GridIconItem icon={Clock9Icon} title="Carga horária">
                  <p>
                    {Number(data.hoursWorkload) % 1 === 0
                      ? Number(data.hoursWorkload)
                      : Number(data.hoursWorkload).toFixed(2)}
                    h
                  </p>
                </GridIconItem>
              )}
              <GridIconItem icon={CalendarFoldIcon} title="Emissão">
                {data.issuedAt}
              </GridIconItem>
              {data.expiresAt && (
                <GridIconItem icon={CalendarFoldIcon} title="Expiração">
                  {data.expiresAt}
                </GridIconItem>
              )}
              <GridIconItem icon={BookKeyIcon} title="Blockchain">
                <Badge className="uppercase" variant={data.blockchain ? 'success' : 'destructive'}>
                  {data.blockchain ? 'Possui' : 'Não possui'}
                </Badge>
              </GridIconItem>
              <GridIconItem icon={AwardIcon} title="Open Badge">
                <Badge className="uppercase" variant={data.openBadge ? 'success' : 'destructive'}>
                  {data.openBadge ? 'Possui' : 'Não possui'}
                </Badge>
              </GridIconItem>
            </div>
            <Alert variant="info">
              💡 A tecnologia de Blockchain agrega recursos de segurança que são incorporados no
              certificado, e o torna: seguro contra possibilidade de fraude, compartilhável e
              verificável instantaneamente em qualquer lugar do mundo
            </Alert>
            <div className="flex flex-col gap-1">
              <h3 className="text-xs font-bold uppercase text-slate-600">Descrição</h3>
              <ul className="font-normal">
                {(data.description ?? 'Sem descrição').split('\\n').map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              {/* <p className="font-normal">{data.description ?? 'Sem descrição'}</p> */}
            </div>
            <hr className="border-dashed" />
            <div className="flex flex-col gap-4">
              <h3 className="text-xs font-bold uppercase text-slate-600">
                Competências/Habilidades
              </h3>
              <ul className="flex flex-col gap-2">
                {data.abilities.length > 0 &&
                  Object.values(
                    data.abilities.reduce(
                      (
                        acc: { [key: string]: { category: string; abilities: string[] } },
                        ability,
                      ) => {
                        if (!acc[ability.category]) {
                          acc[ability.category] = { category: ability.category, abilities: [] };
                        }
                        acc[ability.category].abilities.push(ability.ability);

                        return acc;
                      },
                      {},
                    ),
                  ).map((group) => (
                    <li key={group.category}>
                      <div className="inline-flex items-center gap-2">
                        <LightbulbIcon className="size-4 text-slate-400" />
                        <h3 className="font-semibold text-slate-600">{group.category}</h3>
                      </div>
                      <ul className="ml-12 list-disc">
                        {group.abilities.map((ability) => (
                          <li key={ability}>{ability}</li>
                        ))}
                      </ul>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </ApplicationLayout>
  );
}

interface IShareCertificate {
  data: IUserCertificate;
}

function CreatePublicLink({ data }: Readonly<IShareCertificate>) {
  const { id } = useParams();
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();

  const isCertificateEnabledAndHashEmpty =
    data.status === ECertificateStatus.ENABLED && data.certificateHash === '';

  const shareUrl = `${import.meta.env.VITE_APPLICATION_URL}/certificates/share/${data.certificateHash}`;

  const handleReview = () => {
    const response = CertificateService.RequestApproval(id ?? '');
    toast.promise(response, {
      loading: 'Em processamento...',
      success: () => {
        return `Solicitação feita com sucesso`;
      },
      error: () => {
        return 'Falha ao solicitar revisão...';
      },
      finally: () => {
        queryClient.invalidateQueries({ queryKey: ['certificate', `id: ${id}`] });
      },
    });
  };

  const handleShare = async () => {
    if (isCertificateEnabledAndHashEmpty) {
      setIsLoading(true);
      const response = await CertificateService.CreateHash(id ?? '');

      if (response) {
        navigate(`/certificates/share/${response.certificateHash}`);
      }
    } else {
      navigate(`/certificates/share/${data.certificateHash}`);
    }
    setIsLoading(false);
  };

  if (data.status === ECertificateStatus.REVIEW) {
    return (
      <Button disabled={data.statusRequest} variant="default" onClick={() => handleReview()}>
        <FileSearchIcon className="mr-2 size-5" />
        {data.statusRequest ? 'Solicitado Revisão' : 'Solicitar Revisão'}
      </Button>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <Button
        isLoading={isLoading}
        size={'sm'}
        disabled={data.status !== ECertificateStatus.ENABLED}
        variant={isCertificateEnabledAndHashEmpty ? 'secondary' : 'success'}
        onClick={() => handleShare()}
      >
        {!isLoading && isCertificateEnabledAndHashEmpty ? (
          <LinkIcon className="mr-2 size-5" />
        ) : (
          <Share2Icon className="mr-2 size-5" />
        )}
        {isCertificateEnabledAndHashEmpty
          ? 'Gerar Certificado Público'
          : 'Compartilhar Certificado'}
      </Button>
      <LinkedInButton
        certificationName={data.name}
        organizationId={93244559}
        issueYear={Number(data.issuedAt.split('/').at(-1))}
        issueMonth={Number(data.issuedAt.split('/')[1])}
        expirationYear={Number(data.expiresAt?.split('/').at(-1))}
        expirationMonth={Number(data.expiresAt?.split('/')?.[1])}
        certUrl={shareUrl}
        certId={data.certificateHash}
      />
    </div>
  );
}
