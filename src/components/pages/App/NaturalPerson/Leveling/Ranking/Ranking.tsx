import { useEffect, useState } from 'react';

import { DoubleArrowLeftIcon, DoubleArrowRightIcon } from '@radix-ui/react-icons';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@radix-ui/react-select';
import {
  ChevronLeft,
  ChevronLeftIcon,
  ChevronRightIcon,
  ListFilter,
  Search,
  Trophy,
} from 'lucide-react';
import { Link } from 'react-router-dom';

import { ApplicationLayout } from '@/components/layouts/app';
import { Button } from '@/components/shared/ui/button';

import useProfile from '@/hooks/core/useProfile';

import { authApi } from '@/services/api/api';

interface RankingUser {
  rank: number;
  userId: string;
  name: string;
  xp: number;
  img: string;
  title?: string; // e.g. "Iniciante", "Mestre"
}

export default function Ranking() {
  const { isLoadingPJ } = useProfile(); // Assuming this handles generic loading state

  const [rankingData, setRankingData] = useState<RankingUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Semanal'); // Future implementation for filtering

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(50);

  useEffect(() => {
    async function fetchRanking() {
      try {
        setLoading(true);

        const response = await authApi.get('/leveling/pf/global-ranking');
        setRankingData(response.data);
      } catch (error) {
        console.error('Failed to fetch global ranking', error);
      } finally {
        setLoading(false);
      }
    }

    fetchRanking();
  }, []);

  return (
    <ApplicationLayout
      icon={Trophy}
      title="Rankings"
      isPageLoading={isLoadingPJ}
      hideCredits={true}
    >
      <Link to={'/leveling'}>
        <div className="flex items-center gap-4 text-sm font-bold transition-colors hover:text-gray-700">
          <ChevronLeft className="size-4" />
          Voltar para Missões & Conquistas
        </div>
      </Link>

      <div className="my-6 flex justify-between">
        <div className="flex h-10 w-full max-w-[40%] items-center rounded-lg border border-[#94A3B8] bg-background text-sm">
          <Search className="ml-3 text-slate-400" />
          <input
            placeholder="Pesquisar"
            className="relative size-full rounded-lg border-none bg-transparent py-2 pl-2 focus:outline-none"
          />
        </div>

        <Button variant="outline" className="text-bold gap-3 border-[#94A3B8] text-base font-bold">
          Filtre por trilha
          <ListFilter size={18} />
        </Button>
      </div>

      <div className="w-full lg:max-w-[40%] 2xl:max-w-[25%]">
        {/* TABS */}
        <div className="mb-4 flex gap-0">
          <button
            onClick={() => setActiveTab('Semanal')}
            className={`
                w-1/2 rounded-l-xl border border-r-0 px-4 py-2 text-center text-base transition-colors
                ${activeTab === 'Semanal' ? 'border-[#FF7B0F] bg-[#FF7B0F] font-bold text-white' : 'border-[#E2E8F0] bg-white text-[#64748B] hover:bg-slate-50'}
              `}
          >
            Semanal
          </button>
          <button
            onClick={() => setActiveTab('Mensal')}
            className={`
                w-1/2 rounded-r-xl border border-l-0 px-4 py-2 text-center text-base
                ${activeTab === 'Mensal' ? 'border-[#FF7B0F] bg-[#FF7B0F] font-bold text-white' : 'border-[#E2E8F0] bg-white text-[#64748B] hover:bg-slate-50'}
              `}
          >
            Mensal
          </button>
        </div>

        {/* TABLE */}
        <div className="min-h-[300px] rounded-xl border bg-white p-4 shadow-sm">
          {loading ? (
            <div className="flex h-full items-center justify-center text-slate-500">
              Carregando Ranking...
            </div>
          ) : rankingData.length === 0 ? (
            <div className="flex h-full items-center justify-center text-slate-500">
              Nenhum dado disponível.
            </div>
          ) : (
            <table className="w-full">
              <tbody>
                {rankingData.map((user) => (
                  <tr
                    key={user.rank}
                    className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50"
                  >
                    <td className="px-2 py-3">
                      <div className="flex items-center gap-4">
                        {/* Rank Number with highlighting for top 3 */}
                        <span
                          className={`w-6 text-center text-base font-bold ${
                            user.rank <= 3 ? 'text-[#FF7B0F]' : 'text-slate-600'
                          }`}
                        >
                          {user.rank.toString().padStart(2, '0')}
                        </span>

                        {/* Avatar */}
                        <img
                          src={user.img || '/staticImages/user.png'}
                          alt={user.name}
                          className="size-10 rounded-full border border-slate-200 object-cover"
                        />

                        {/* Name & Title */}
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-slate-800">{user.name}</span>
                          {user.title && (
                            <span className="text-xs text-slate-500">{user.title}</span>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* XP Value */}
                    <td className="px-2 text-end">
                      <span className="text-sm font-bold text-[#FF7B0F]">{user.xp} XP</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* PAGINATION */}
      <div className="mt-6 flex items-center sm:justify-start">
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 lg:space-x-8">
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium text-slate-600">Linhas por página</p>
            <Select value={`${limit}`} onValueChange={(val) => setLimit(Number(val))}>
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue placeholder={limit} />
              </SelectTrigger>
              <SelectContent side="top">
                {[10, 25, 30, 50, 100].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex w-[100px] items-center justify-center text-sm font-medium text-slate-600">
            Página {page}
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="hidden min-w-12 p-0 lg:flex"
              onClick={() => setPage(1)}
              disabled={page === 1}
            >
              <span className="sr-only">Ir para inicio</span>
              <DoubleArrowLeftIcon className="size-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="min-w-12 p-0"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              <span className="sr-only">Ir para anterior</span>
              <ChevronLeftIcon className="size-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="min-w-12 p-0"
              onClick={() => setPage((p) => p + 1)}
            >
              <span className="sr-only">Ir para próximo</span>
              <ChevronRightIcon className="size-4" />
            </Button>
            <Button variant="outline" size="sm" className="hidden min-w-12 p-0 lg:flex">
              <span className="sr-only">Ir para final</span>
              <DoubleArrowRightIcon className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </ApplicationLayout>
  );
}
