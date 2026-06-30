import { SettingsIcon } from 'lucide-react';

import { ApplicationLayout } from '@/components/layouts/app';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/shared/ui/tabs';

import CardsTab from '../Account/Cards';
import PlansTab from '../Account/Plans';
import ProfileTab from '../Account/Profile/Tab';

export default function SettingsPage() {
  return (
    <ApplicationLayout icon={SettingsIcon} title="Configurações" hideCredits>
      <Tabs defaultValue="profile">
        <TabsList className="w-fit">
          <TabsTrigger className="w-fit" value="profile">
            Perfil
          </TabsTrigger>
          <TabsTrigger className="w-fit" value="plan">
            Planos
          </TabsTrigger>
          <TabsTrigger className="w-fit" value="wallet">
            Carteira
          </TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <div className="flex flex-col gap-8 rounded-xl border border-slate-100 p-6 pb-12">
            <ProfileTab />
          </div>
        </TabsContent>
        <TabsContent value="security"></TabsContent>
        <TabsContent value="plan">
          <div className="flex flex-col gap-8 rounded-xl border border-slate-100 p-6 pb-12">
            <PlansTab />
          </div>
        </TabsContent>
        <TabsContent value="wallet">
          <div className="flex flex-col gap-8 rounded-xl border border-slate-100 p-6 pb-12">
            <CardsTab />
          </div>
        </TabsContent>
      </Tabs>
    </ApplicationLayout>
  );
}
