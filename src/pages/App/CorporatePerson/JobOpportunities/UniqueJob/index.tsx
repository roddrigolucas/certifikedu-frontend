import { useState } from 'react';

import {
  Accessibility,
  BookA,
  BookOpen,
  Briefcase,
  GraduationCap,
  Laptop,
  MapPin,
  NotebookPen,
} from 'lucide-react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

import { pagePaths } from '@/constants/navigation/pagePaths';

import { ApplicationLayout } from '@/components/layouts/app';
import { PageSkeletonFull } from '@/components/layouts/app/shared/PageSkeleton';
import { BackButton } from '@/components/shared/BackButton';
import { Badge } from '@/components/shared/ui/badge';
import { Button } from '@/components/shared/ui/button';

import useProfile from '@/hooks/core/useProfile';
import useRequestProcessor from '@/hooks/core/useRequest';

import { CorporativeService } from '@/services/entities/app/corporatePerson/jobOpportunity';
import { JobDetailResponse } from '@/services/entities/app/corporatePerson/jobOpportunity/types';

import RecommendedCandidates from './Candidates';

interface IAbilitiesSectionProps {
  title: string;
  items: string[];
}

const AbilitiesSection: React.FC<IAbilitiesSectionProps> = ({ title, items }) => {
  const [showAll, setShowAll] = useState(false);

  const handleToggleShowAll = () => {
    setShowAll(!showAll);
  };

  const maxDisplayedItems = 4;

  const itemsToShow = showAll ? items : items.slice(0, maxDisplayedItems);

  return (
    <>
      <h4 className="mt-8 text-xl font-semibold">{title}</h4>
      <div className="mt-4 flex flex-wrap gap-2">
        {itemsToShow.map((item, index) => (
          <Badge className="rounded- rounded-lg bg-slate-100 p-2" key={index} variant="outline">
            {item}
          </Badge>
        ))}
        {items.length > maxDisplayedItems && !showAll && (
          <Button variant="ghost" className="p-2 underline" size="sm" onClick={handleToggleShowAll}>
            Ver mais
          </Button>
        )}
        {showAll && items.length > maxDisplayedItems && (
          <Button variant="ghost" size="sm" className="p-2 underline" onClick={handleToggleShowAll}>
            Ver menos
          </Button>
        )}
      </div>
    </>
  );
};

interface IJobDetailResponse {
  data: JobDetailResponse;
}

const JobProfile: React.FC<IJobDetailResponse> = ({ data }) => (
  <>
    <h1 className="mt-2 text-3xl font-bold">{data?.title}</h1>
    <h2 className="text-slate-600">Código da vaga: {data?.jobCode}</h2>
    <h3 className="mt-8 text-xl font-semibold">
      R$ {data?.minimumSalaryRange ?? 'Não Informado'} - R${' '}
      {data?.maximumSalaryRange ?? 'Não Informado'}
      <span className="font-normal">/mês</span>
    </h3>
    <div className="mt-4 inline-flex flex-wrap gap-2 text-xs">
      <Badge className="gap-1 p-2  " variant="info">
        <MapPin size={16} />
        {data?.city}/{data?.state}
      </Badge>
      <Badge className="gap-1 p-2 " variant="info">
        <Laptop size={16} />
        {data?.workModel}
      </Badge>
      <Badge className="gap-1 p-2" variant="info">
        <NotebookPen size={16} />
        {data?.jobOpportunityType}
      </Badge>
      {data && (
        <Badge className="gap-1 p-2" variant="info">
          <Accessibility size={16} />
          Aceita PCD
        </Badge>
      )}
      {data?.seniorityLevel?.map((seniority, index) => (
        <Badge className="gap-1 p-2" key={index} variant="info">
          <BookOpen size={16} />
          {seniority}
        </Badge>
      ))}
      {data?.educationLevel?.map((education, index) => (
        <Badge className="gap-1 p-2" key={index} variant="info">
          <GraduationCap size={16} />
          {education}
        </Badge>
      ))}
    </div>
    <div className="flex flex-col gap-3">
      <h4 className="mt-8 text-xl font-semibold">Descrição</h4>
      <p>{data?.description}</p>
    </div>
    <div className="flex flex-col gap-5 lg:flex-row">
      <div className="mr-10 flex flex-col">
        <AbilitiesSection title="Áreas de Atuação" items={data?.workFields ?? []} />
        <AbilitiesSection
          title="Habilidades"
          items={data?.abilities?.map((ability) => ability.ability) ?? []}
        />
      </div>
    </div>
  </>
);

export default function JobProfilePage() {
  const { authenticated } = pagePaths;
  const { selectedCorporate } = useProfile();

  const { jobId } = useParams();

  const jobOpportunity = useRequestProcessor().query(
    ['jobOpportunity', jobId],
    async () =>
      await CorporativeService.GetJobOpportunity(selectedCorporate?.pjId ?? '', jobId ?? ''),
    {
      enabled: !!jobId,
      onError: (error: any) => {
        toast.error(`${error}`);
      },
    },
  );

  return (
    <ApplicationLayout icon={BookA} title="Vaga de emprego">
      <div className="space-y-3">
        <BackButton href={authenticated.corporatePerson.dashboard}>Voltar</BackButton>
        <div className="flex flex-col gap-3">
          <Header
            name={selectedCorporate?.name ?? ''}
            autoIssuer={false}
            issuedAt={jobOpportunity.data?.createdAt?.split('T')[0] ?? ''}
            updatedAt={jobOpportunity.data?.endAt?.split('T')[0] ?? ''}
          />
          {jobOpportunity.isFetching ? (
            <PageSkeletonFull />
          ) : (
            <div className="">
              <JobProfile data={jobOpportunity.data ?? ({} as JobDetailResponse)} />
              <div className="flex flex-col gap-3">
                <h4 className="mt-8 text-xl font-semibold">
                  Candidatos Recomendados ({`${jobOpportunity.data?.candidatesNumber}`})
                </h4>

                <RecommendedCandidates candidates={jobOpportunity.data?.candidates ?? []} />
              </div>
            </div>
          )}
        </div>
      </div>
    </ApplicationLayout>
  );
}

function formatDate(dateString: string): string {
  const dateParts = dateString.split('-');
  const day = parseInt(dateParts[2]);
  const month = parseInt(dateParts[1]);
  const year = parseInt(dateParts[0]);

  const date = new Date(year, month - 1, day); // Month is zero-based
  const options = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  } as Intl.DateTimeFormatOptions;
  const formattedDate = date.toLocaleDateString('pt-BR', options);

  return formattedDate;
}

function Header({
  name,
  issuedAt,
  updatedAt,
}: Readonly<{
  name: string;
  issuedAt: string;
  autoIssuer?: boolean;
  updatedAt?: string;
}>) {
  return (
    <header className="rounded-lg border border-slate-200 bg-white">
      <div className="container inline-flex w-full items-center justify-center py-4 md:justify-between">
        <div className="flex flex-col items-center gap-2 md:flex-row md:gap-4">
          <Briefcase />
          <div className="flex flex-col">
            <h1 className="md:text-md text-center text-sm font-normal md:text-left">
              Criado por <strong>{name}</strong> em{' '}
              <strong>{issuedAt && formatDate(issuedAt)}</strong>.
            </h1>
            <h1 className="mt-1 text-center text-xs font-normal md:text-left">
              Data de encerramento: {updatedAt && formatDate(updatedAt)}.
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
}
