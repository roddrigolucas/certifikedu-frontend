import { ChevronLeft, Search, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';

import { ApplicationLayout } from '@/components/layouts/app';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/shared/ui/select';

import useProfile from '@/hooks/core/useProfile';

import AchievementsTable from './AchievementsTable';

export default function Achievements() {
  const { isLoadingPJ } = useProfile();

  return (
    <ApplicationLayout
      icon={Trophy}
      title="Conquistas"
      isPageLoading={isLoadingPJ}
      hideCredits={true}
    >
      <Link to={'/leveling'}>
        <div className="flex items-center gap-4 text-sm font-bold">
          <ChevronLeft />
          Voltar para Missões & Conquistas
        </div>
      </Link>

      <div className="flex max-w-[60%] gap-3">
        <div className=" flex h-10 w-full  items-center rounded-lg border border-[#94A3B8] bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:opacity-50">
          <Search className="ml-3" />
          <input
            placeholder="Pesquisar"
            className=" relative size-full rounded-lg border-r py-2 pl-2 focus:outline-none"
          />
        </div>
        <div className="w-[35%] rounded-lg border border-[#94A3B8]">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={'active'}>Ativa</SelectItem>
              <SelectItem value={'unlocked'}>Desbloqueada</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <AchievementsTable />
    </ApplicationLayout>
  );
}
