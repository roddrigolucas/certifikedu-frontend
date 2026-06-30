import { BookOpen } from 'lucide-react';

import { ApplicationLayout } from '@/components/layouts/app';
import { PageSkeletonFull } from '@/components/layouts/app/shared/PageSkeleton';

import { useProfileStore } from '@/stores/naturalPerson/profile';

import CreateOrUpdateResumePage from './CreateOrUpdate';
import ResumeShowPage from './ResumeShow';

export default function ResumePageEntry() {
  const { profileInfo } = useProfileStore();

  return (
    <>
      {!profileInfo && (
        <ApplicationLayout icon={BookOpen} title="Currículos" description="Carregando...">
          <PageSkeletonFull />
        </ApplicationLayout>
      )}
      {profileInfo && !profileInfo.hasResumes && <CreateOrUpdateResumePage />}
      {profileInfo && profileInfo.hasResumes && <ResumeShowPage />}
    </>
  );
}
