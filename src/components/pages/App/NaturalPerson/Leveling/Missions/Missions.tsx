import { useEffect, useState } from 'react';

import { ChevronLeft, Eye, Search, Trophy } from 'lucide-react';
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

import { authApi } from '@/services/api/api';

// Interface matching the backend response
interface Mission {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  status: 'IN_PROGRESS' | 'COMPLETED' | 'CLAIMED';
  currentCount: number;
  requiredCount: number;
  badgeUrl?: string;
  progress: number; // Calculated on backend or here
}

export default function Missions() {
  const { isLoadingPJ } = useProfile();

  const [missions, setMissions] = useState<Mission[]>([]);
  const [filteredMissions, setFilteredMissions] = useState<Mission[]>([]);

  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function fetchMissions() {
      try {
        setLoading(true);
        const response = await authApi.get('/leveling/pf/missions');

        // Ensure progress is calculated if backend sends raw counts
        const formattedData = response.data.map((m: any) => ({
          ...m.mission,
          status: m.status,
          currentCount: m.currentCount,
          progress: Math.min((m.currentCount / m.mission.requiredCount) * 100, 100),
        }));

        setMissions(formattedData);
        setFilteredMissions(formattedData);
      } catch (error) {
        console.error('Failed to fetch missions', error);
      } finally {
        setLoading(false);
      }
    }
    fetchMissions();
  }, []);

  useEffect(() => {
    let result = missions;

    // Filter by Status
    if (statusFilter !== 'all') {
      if (statusFilter === 'active') {
        result = result.filter((m: { status: string }) => m.status === 'IN_PROGRESS');
      } else if (statusFilter === 'completed') {
        result = result.filter(
          (m: { status: string }) => m.status === 'COMPLETED' || m.status === 'CLAIMED',
        );
      }
    }

    // Filter by Search
    if (searchTerm) {
      const lower = searchTerm.toLowerCase();
      result = result.filter((m: { title: string }) => m.title.toLowerCase().includes(lower));
    }

    setFilteredMissions(result);
  }, [statusFilter, searchTerm, missions]);

  // Helper for Badge Colors based on status
  const getStatusBadge = (status: string) => {
    if (status === 'COMPLETED' || status === 'CLAIMED') {
      return { label: 'Concluída', bg: 'bg-[#2B9A66]' };
    }

    return { label: 'Em Progresso', bg: 'bg-[#EA580C]' };
  };

  return (
    <ApplicationLayout icon={Trophy} title="Missões" isPageLoading={isLoadingPJ} hideCredits={true}>
      <Link to={'/leveling'}>
        <div className="flex items-center gap-4 text-sm font-bold transition-colors hover:text-gray-700">
          <ChevronLeft className="size-4" />
          Voltar para Missões & Conquistas
        </div>
      </Link>

      {/* FILTERS */}
      <div className="mb-8 mt-6 flex gap-3">
        <div className="flex h-10 w-full max-w-[40%] items-center rounded-lg border border-[#94A3B8] bg-background text-sm">
          <Search className="ml-3 text-slate-400" />
          <input
            placeholder="Pesquisar missão"
            className="relative size-full rounded-lg border-none bg-transparent py-2 pl-2 focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="w-[180px]">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="rounded-lg border-[#94A3B8]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              <SelectItem value="active">Em andamento</SelectItem>
              <SelectItem value="completed">Concluídas</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* MISSIONS GRID */}
      {loading ? (
        <div className="py-20 text-center text-slate-500">Carregando missões...</div>
      ) : filteredMissions.length === 0 ? (
        <div className="py-20 text-center text-slate-500">Nenhuma missão encontrada.</div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredMissions.map((mission: Mission) => {
            const badge = getStatusBadge(mission.status);

            return (
              <div
                key={mission.id}
                className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
              >
                {/* HEADER: Icon + Status Badge */}
                <div className="flex flex-row items-end justify-between gap-2">
                  <img
                    src={'/staticImages/missionBadge.svg'}
                    className="size-14 object-contain"
                    alt="Badge"
                  />
                  <span
                    className={`flex h-6 items-center justify-center rounded-full px-3 text-xs font-semibold text-white ${badge.bg}`}
                  >
                    {badge.label}
                  </span>
                </div>

                {/* TITLE & DESC */}
                <div className="flex min-h-[60px] flex-col gap-1">
                  <span className="line-clamp-2 text-base font-bold text-slate-800">
                    {mission.title}
                  </span>
                  <span className="line-clamp-2 text-xs text-slate-500">{mission.description}</span>
                </div>

                {/* PROGRESS BAR */}
                <div className="flex items-center gap-3 text-xs font-medium text-slate-600">
                  <span>{Math.floor(mission.progress)}%</span>
                  <div className="h-2 w-full overflow-hidden rounded-full border border-slate-200 bg-slate-100">
                    <div
                      className="h-full rounded-full bg-[#10B981] transition-all duration-500"
                      style={{ width: `${mission.progress}%` }}
                    />
                  </div>
                </div>

                {/* ACTION BUTTON */}
                <Link to={`/leveling/missions/detail/${mission.id}`} className="mt-auto">
                  <button className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg border border-[#94A3B8] px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50">
                    Detalhes
                    <Eye className="size-4" />
                  </button>
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </ApplicationLayout>
  );
}
