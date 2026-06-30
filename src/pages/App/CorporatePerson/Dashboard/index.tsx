import { AirplayIcon, ArrowUpDownIcon, FileBadgeIcon } from 'lucide-react';

import { ApplicationLayout } from '@/components/layouts/app';
import { CardInformation } from '@/components/pages/Authentication/CardInformation';
import { AlertAdmin } from '@/components/shared/Alerts/AlertAdmin';

import useProfile from '@/hooks/core/useProfile';

import JobOppurtinityCards from '../JobOpportunities';

export default function DashboardPageCorporate() {
  const { isLoading, jobsOpportunity } = useProfile();

  return (
    <ApplicationLayout icon={AirplayIcon} title="Meu Painel" isPageLoading={isLoading} hideCredits>
      <div className="flex flex-col gap-4">
        <AlertAdmin />
      </div>

      <div className="grid w-full grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-8">
        <CardInformation
          title="Vagas Cadastradas"
          value={jobsOpportunity.data?.jobOpportunities?.length.toString()}
          icon={ArrowUpDownIcon}
          isLoading={isLoading}
        />
        <CardInformation
          title="Candidatos Encontrados"
          value={jobsOpportunity.data?.jobOpportunities
            ?.map((job) => job.candidates)
            .reduce((a, b) => a + b, 0)
            .toString()}
          icon={FileBadgeIcon}
          isLoading={isLoading}
        />
      </div>
      <JobOppurtinityCards />
    </ApplicationLayout>
  );
}
