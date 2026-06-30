import { UserSquareIcon } from 'lucide-react';

import { ApplicationLayout } from '@/components/layouts/app';
import { BackButton } from '@/components/shared/BackButton';

import ProfileTab from './Tab';

export default function ProfilePage() {
  return (
    <ApplicationLayout icon={UserSquareIcon} title="Meu Perfil" hideCredits>
      <div className="space-y-3">
        <BackButton />
        <ProfileTab />
      </div>
    </ApplicationLayout>
  );
}
