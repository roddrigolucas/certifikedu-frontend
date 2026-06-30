import { Briefcase } from 'lucide-react';

import { ApplicationLayout } from '@/components/layouts/app';
import { PageSkeletonFull } from '@/components/layouts/app/shared/PageSkeleton';

import { useProfileStore } from '@/stores/naturalPerson/profile';

import CreateProfessionalProfilePage from './Create';
import ProfessionalProfilePage from './ProfessionalProfileShow';

export default function ProfessionalProfilePageEntry() {
  const { profileInfo } = useProfileStore();

  if (!profileInfo) {
    return (
      <ApplicationLayout
        icon={Briefcase}
        title="Perfil Profissional"
        description="Carregando..."
        hideCredits
      >
        <PageSkeletonFull />;
      </ApplicationLayout>
    );
  }

  return (
    <>
      {!profileInfo?.hasProfessionalProfile && (
        <div>
          <CreateProfessionalProfilePage />
        </div>
      )}
      {profileInfo?.hasProfessionalProfile && (
        <div>
          <ProfessionalProfilePage />
        </div>
      )}
    </>
  );
}
