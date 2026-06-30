import { CreditCardIcon } from 'lucide-react';

import { ApplicationLayout } from '@/components/layouts/app';
import { MyCards } from '@/components/layouts/app/shared/CreditsBalance/MyCards';

export default function CardsTab() {
  return (
    <ApplicationLayout icon={CreditCardIcon} title="Gerenciar Cartões">
      <div>
        <MyCards />
      </div>
    </ApplicationLayout>
  );
}
