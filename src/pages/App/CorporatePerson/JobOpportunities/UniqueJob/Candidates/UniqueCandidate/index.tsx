import { User } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

import { ProfessionalProfile } from '@/pages/App/Core/ProfessionalProfile/ProfessionalProfileShow';
import { ApplicationLayout } from '@/components/layouts/app';
import { BackButton } from '@/components/shared/BackButton';

import useProfile from '@/hooks/core/useProfile';
import useRequestProcessor from '@/hooks/core/useRequest';

import { IProfessionalProfileResponse } from '@/services/entities/app/core/professionalProfile/model';
import { CorporativeService } from '@/services/entities/app/corporatePerson/jobOpportunity';

export default function UniqueCandidate() {
  const { selectedCorporate } = useProfile();
  const { jobId, userId } = useParams();

  const jobOpportunityCandidate = useRequestProcessor().query(
    ['selectedCorporate', `jobId: ${jobId}`, `userId: ${userId}`],
    async () =>
      await CorporativeService.GetUserByIdInJobOpportunity(
        selectedCorporate?.pjId ?? '',
        jobId ?? '',
        userId ?? '',
      ),
    {
      enabled: !!jobId && !!userId,
      onError: (error: any) => {
        toast.error(`${error}`);
      },
    },
  );

  return (
    <ApplicationLayout icon={User} title="Candidato" hideCredits>
      <div className="space-y-3">
        <BackButton href={`/jobs/view/${jobId}`}>Voltar para Vaga</BackButton>
        {!!jobOpportunityCandidate.data && (
          <ProfessionalProfile
            data={jobOpportunityCandidate.data ?? ({} as IProfessionalProfileResponse)}
            name={jobOpportunityCandidate?.data?.firstName ?? ''}
          />
        )}
      </div>
    </ApplicationLayout>
  );
}
