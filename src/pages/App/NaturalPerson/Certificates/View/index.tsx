/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';

import {
  AwardIcon,
  BookKeyIcon,
  CalendarFoldIcon,
  Clock9Icon,
  FileBadgeIcon,
  LightbulbIcon,
  LucideIcon,
  SchoolIcon,
  UserIcon,
} from 'lucide-react';
import { useParams } from 'react-router-dom';

import { ApplicationLayout } from '@/components/layouts/app';
import { PageSkeletonFull } from '@/components/layouts/app/shared/PageSkeleton';
import { BackButton } from '@/components/shared/BackButton';
import { Alert } from '@/components/shared/ui/alert';
import { Badge } from '@/components/shared/ui/badge';

import useProfile from '@/hooks/core/useProfile';
import useRequestProcessor from '@/hooks/core/useRequest';

import { CanvasService } from '@/services/entities/app/canvas';
import { CertificateService } from '@/services/entities/app/legalPerson/certificates';

import { cn } from '@/utils';
import { getImageUrl } from '@/utils/image';
import { buildCertificatesPageUrl } from '@/utils/url';

export default function CertificateViewPageNaturalPerson() {
  const { id } = useParams();
  const { selectedPJ, isCanvas } = useProfile();

  const { isLoading, data } = useRequestProcessor().query(
    ['certificate', `id: ${id}`],
    async () =>
      !!isCanvas
        ? await CanvasService.ViewCertificateByID(id ?? '')
        : await CertificateService.GetCertificateId(selectedPJ?.pjId ?? '', id ?? ''),
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
          </header>
          <div className="flex flex-col gap-8 p-6 md:p-12">
            <div className="grid grid-cols-12 gap-8">
              <GridItem icon={SchoolIcon} title="Emitido por">
                {data.issuerName === data.receptorName ? (
                  <Badge className="uppercase" variant="success">
                    Autoemitido
                  </Badge>
                ) : (
                  data.issuerName
                )}
              </GridItem>
              <GridItem icon={UserIcon} title="Emitido para">
                {data.receptorName}
              </GridItem>
              {data.hoursWorkload > 0 && (
                <GridItem icon={Clock9Icon} title="Carga horária">
                  {data.hoursWorkload}h
                </GridItem>
              )}
              <GridItem icon={CalendarFoldIcon} title="Emissão">
                {data.issuedAt}
              </GridItem>
              {data.expiresAt && (
                <GridItem icon={CalendarFoldIcon} title="Expiração">
                  {data.expiresAt}
                </GridItem>
              )}
              <GridItem icon={BookKeyIcon} title="Blockchain">
                <Badge className="uppercase" variant={data.blockchain ? 'success' : 'destructive'}>
                  {data.blockchain ? 'Possui' : 'Não possui'}
                </Badge>
              </GridItem>
              <GridItem icon={AwardIcon} title="Open Badge">
                <Badge className="uppercase" variant={data.openBadge ? 'success' : 'destructive'}>
                  {data.openBadge ? 'Possui' : 'Não possui'}
                </Badge>
              </GridItem>
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
            </div>
            <hr className="border-dashed" />
            <div className="flex flex-col gap-4">
              <h3 className="text-xs font-bold uppercase text-slate-600">F</h3>
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

function GridItem({
  title,
  children,
  className,
  ...props
}: Readonly<{
  icon: LucideIcon;
  title: string;
  className?: string;
  children?: React.ReactNode;
}>) {
  return (
    <div className={cn('col-span-5 flex flex-col gap-2 lg:col-span-3', className)}>
      <div className="inline-flex gap-2">
        <props.icon className="size-4 text-slate-400" />
        <div className="flex flex-col gap-1">
          <h3 className="text-xs font-bold uppercase text-slate-600">{title}</h3>
          <p className="font-normal">{children}</p>
        </div>
      </div>
    </div>
  );
}
