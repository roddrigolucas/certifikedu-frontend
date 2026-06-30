import { useState } from 'react';

import { Plus, Search, Settings2, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';

import { ApplicationLayout } from '@/components/layouts/app';
import AchievementsTable from '@/components/pages/App/NaturalPerson/Leveling/Achievements/AchievementsTable';
import MissionTable from '@/components/pages/App/NaturalPerson/LevelingPJ/Missions/MissionTable';
import RankingPJ from '@/components/pages/App/NaturalPerson/LevelingPJ/Ranking/Ranking';

import useProfile from '@/hooks/core/useProfile';

export default function LevelingPJPage() {
  const { isLoadingPJ } = useProfile();
  const [activeTab, setActiveTab] = useState('Conquistas');

  return (
    <ApplicationLayout
      icon={Trophy}
      title="Missões & Conquistas"
      isPageLoading={isLoadingPJ}
      hideCredits={true}
    >
      <div className="mb-4 flex w-full max-w-[50%] gap-4">
        <button
          onClick={() => setActiveTab('Conquistas')}
          className={`
                 rounded-t-2xl border border-b-0 px-4 py-2  text-center text-lg transition-colors
                ${activeTab === 'Conquistas' ? 'border-[#EA580C] bg-[#EA580C] font-bold text-white' : 'border-[#E2E8F0] bg-[#E2E8F0] text-[#64748B]'}
              `}
        >
          Conquistas
        </button>
        <button
          onClick={() => setActiveTab('Missões')}
          className={`
                 rounded-t-2xl border border-b-0 px-4  py-2 text-center text-lg
                ${activeTab === 'Missões' ? 'border-[#EA580C] bg-[#EA580C] font-bold text-white' : 'border-[#E2E8F0] bg-[#E2E8F0] text-[#64748B]'}
              `}
        >
          Missões
        </button>
        <button
          onClick={() => setActiveTab('Ranking')}
          className={`
                 rounded-t-2xl border border-b-0 px-4  py-2 text-center text-lg
                ${activeTab === 'Ranking' ? 'border-[#EA580C] bg-[#EA580C] font-bold text-white' : 'border-[#E2E8F0] bg-[#E2E8F0] text-[#64748B]'}
              `}
        >
          Ranking
        </button>
      </div>

      {(activeTab == 'Conquistas' || activeTab == 'Missões') && (
        <div className="flex justify-between">
          <div className=" flex h-10 w-[30%] items-center rounded-lg border border-[#94A3B8] bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:opacity-50">
            <Search className="ml-3" />
            <input
              placeholder="Pesquisar"
              className=" relative size-full rounded-lg border-r py-2 pl-2 focus:outline-none"
            />
          </div>
          <div className="flex gap-3">
            {activeTab == 'Conquistas' ? (
              <Link to={'/levelingPJ/createAchievement'}>
                <button className="flex items-center justify-center gap-2 rounded-lg bg-[#10B981] p-2 font-semibold text-white">
                  <Plus />
                  Cadastrar Conquista
                </button>
              </Link>
            ) : (
              <Link to={'/levelingPJ/createMission'}>
                <button className="flex items-center justify-center gap-2 rounded-lg bg-[#10B981] p-2 font-semibold text-white">
                  <Plus />
                  Cadastrar Missão
                </button>
              </Link>
            )}

            <button className="flex items-center justify-center gap-2 rounded-lg border border-[#94A3B8] p-2 font-semibold">
              <Settings2 />
              Visualizar
            </button>
          </div>
        </div>
      )}

      {activeTab == 'Conquistas' && <AchievementsTable isPJ={true} />}

      {activeTab == 'Missões' && <MissionTable isPJ={true} />}

      {activeTab == 'Ranking' && <RankingPJ />}
    </ApplicationLayout>
  );
}
