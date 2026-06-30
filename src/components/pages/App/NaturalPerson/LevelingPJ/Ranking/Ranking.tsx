import { useEffect, useState } from 'react';

import { DoubleArrowLeftIcon } from '@radix-ui/react-icons';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@radix-ui/react-select';
import { ChevronLeftIcon, ChevronRightIcon, ListFilter, Search } from 'lucide-react';

import { Button } from '@/components/shared/ui/button';

import { authApi } from '@/services/api/api';

interface RankingUser {
  rank: number;
  userId: string;
  name: string;
  xp: number;
  img: string;
  title: string;
}

export default function RankingPJ() {
  const [rankingData, setRankingData] = useState<RankingUser[]>([]);
  const [loading, setLoading] = useState(true);

  const [activeTab, setActiveTab] = useState('Semanal');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(50);

  useEffect(() => {
    async function fetchRanking() {
      try {
        setLoading(true);

        const response = await authApi.get('/leveling/pj/ranking');
        setRankingData(response.data);
      } catch (error) {
        console.error('Failed to fetch ranking', error);
      } finally {
        setLoading(false);
      }
    }

    fetchRanking();
  }, []);

  return (
    <>
      {/* SEARCH BAR & FILTERS */}
      <div className="mb-6 flex justify-between">
        <div className="flex h-10 w-full max-w-[30%] items-center rounded-lg border border-[#94A3B8] bg-background text-sm">
          <Search className="ml-3 text-slate-400" />
          <input
            placeholder="Pesquisar aluno"
            className="relative size-full rounded-lg border-none bg-transparent py-2 pl-2 focus:outline-none"
          />
        </div>

        <Button variant="outline" className="text-bold gap-3 border-[#94A3B8] text-base font-bold">
          Filtre por trilha
          <ListFilter size={18} />
        </Button>
      </div>

      {/* TABLE CONTAINER */}
      <div className="w-full lg:max-w-[60%] 2xl:max-w-[40%]">
        {/* TABS */}
        <div className="mb-4 flex w-fit gap-0">
          <button
            onClick={() => setActiveTab('Semanal')}
            className={`
                w-32 rounded-l-lg border border-r-0 px-4 py-2 text-center text-sm font-medium transition-colors
                ${activeTab === 'Semanal' ? 'border-[#EA580C] bg-[#EA580C] text-white' : 'border-[#E2E8F0] bg-white text-[#64748B] hover:bg-slate-50'}
              `}
          >
            Semanal
          </button>
          <button
            onClick={() => setActiveTab('Mensal')}
            className={`
                w-32 rounded-r-lg border border-l-0 px-4 py-2 text-center text-sm font-medium transition-colors
                ${activeTab === 'Mensal' ? 'border-[#EA580C] bg-[#EA580C] text-white' : 'border-[#E2E8F0] bg-white text-[#64748B] hover:bg-slate-50'}
              `}
          >
            Mensal
          </button>
        </div>

        {/* RANKING TABLE */}
        <div className="rounded-xl border bg-white p-4 shadow-sm">
          {loading ? (
            <div className="py-10 text-center text-slate-500">Carregando Ranking...</div>
          ) : rankingData.length === 0 ? (
            <div className="py-10 text-center text-slate-500">Nenhum aluno pontuou ainda.</div>
          ) : (
            <table className="w-full">
              <tbody>
                {rankingData.map((user) => (
                  <tr
                    key={user.rank}
                    className="border-b border-slate-100 transition-colors last:border-b-0 hover:bg-slate-50"
                  >
                    <td className="px-2 py-3">
                      <div className="flex items-center gap-4">
                        {/* Rank Number */}
                        <span
                          className={`w-6 text-center text-base font-bold ${
                            user.rank <= 3 ? 'text-[#EA580C]' : 'text-slate-600'
                          }`}
                        >
                          {user.rank.toString().padStart(2, '0')}
                        </span>

                        {/* Avatar */}
                        <img
                          src={user.img}
                          alt={user.name}
                          className="size-10 rounded-full border border-slate-200 object-cover"
                        />

                        {/* Name & Title */}
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold text-slate-800">{user.name}</span>
                          <span className="text-xs text-slate-500">{user.title}</span>
                        </div>
                      </div>
                    </td>

                    {/* XP Score */}
                    <td className="px-2 text-end">
                      <span className="text-sm font-bold text-[#EA580C]">{user.xp} XP</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* PAGINATION CONTROLS */}
      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium text-slate-600">Linhas por página</p>
          <Select value={`${limit}`} onValueChange={(val) => setLimit(Number(val))}>
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={limit} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 25, 50, 100].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-slate-600">Página {page}</span>

          <div className="flex items-center space-x-1">
            <Button
              variant="outline"
              size="sm"
              className="size-8 p-0"
              onClick={() => setPage(1)}
              disabled={page === 1}
            >
              <DoubleArrowLeftIcon className="size-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="size-8 p-0"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              <ChevronLeftIcon className="size-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="size-8 p-0"
              onClick={() => setPage((p) => p + 1)}
            >
              <ChevronRightIcon className="size-4" />
            </Button>
            {/* Logic for last page would require knowing total count from backend */}
          </div>
        </div>
      </div>
    </>
  );
}
