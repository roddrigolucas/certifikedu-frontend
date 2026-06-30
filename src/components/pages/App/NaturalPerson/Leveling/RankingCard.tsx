// src/components/pages/App/NaturalPerson/Leveling/RankingCard.js

import { useState } from 'react';

import { Link } from 'react-router-dom';

import { Button } from '@/components/shared/ui/button';

export interface RankingUser {
  rank: number;
  userId: string;
  name: string;
  xp: number;
  img?: string;
  title?: string;
}

export interface MyRankData {
  rank: number;
  xp: number;
  title: string;
}

interface RankingCardProps {
  rankingData: RankingUser[]; // The Global List (Top 10, etc.)
  myRank?: MyRankData;
  onTabChange: (period: 'Semanal' | 'Mensal') => void;
}

// --- Helpers ---
const getInitials = (name: string): string => {
  if (!name) return '?';
  const parts = name.trim().split(/\s+/);
  const firstInitial = parts[0] ? parts[0][0] : '';
  const lastInitial = parts.length > 1 ? parts[parts.length - 1][0] : '';

  return (firstInitial + lastInitial).toUpperCase();
};

const placeholderRankItem = (rank: number): RankingUser => ({
  name: '---',
  rank: rank,
  userId: `placeholder-${rank}`,
  xp: 0,
  img: '',
});

// --- Avatar Component ---
const InitialAvatar = ({
  name,
  rank,
  size = '14',
}: {
  name: string;
  rank: number;
  size?: '14' | '16' | '8';
}) => {
  const initials = getInitials(name);
  let bgColor = 'bg-gray-400';
  if (rank === 1) bgColor = 'bg-yellow-500';
  else if (rank === 2) bgColor = 'bg-green-500';
  else if (rank === 3) bgColor = 'bg-blue-500';

  const sizeClass =
    size === '16' ? 'size-16 text-xl' : size === '8' ? 'size-8 text-xs' : 'size-14 text-lg';

  return (
    <div
      className={`rounded-full ${sizeClass} ${bgColor} flex items-center justify-center border-2 border-white font-bold text-white shadow-md`}
      style={{ zIndex: 10 }}
    >
      {initials}
    </div>
  );
};

export default function RankingCard({ rankingData = [], myRank, onTabChange }: RankingCardProps) {
  const [activeTab, setActiveTab] = useState<'Semanal' | 'Mensal'>('Semanal');

  // Logic: Ensure we always have at least 3 items for the Podium to render correctly
  const top3 = [
    rankingData[0] || placeholderRankItem(1),
    rankingData[1] || placeholderRankItem(2),
    rankingData[2] || placeholderRankItem(3),
  ];

  // The rest of the list (Rank 4 to 7)
  const remainingUsers = rankingData.slice(3, 7);

  const handleTabClick = (period: 'Semanal' | 'Mensal') => {
    setActiveTab(period);
    onTabChange(period); // Notifica o pai
  };

  return (
    <div className="size-full rounded-xl border-[1px] border-[#E2E8F0] bg-white p-6">
      {/* HEADER */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-slate-800">Ranking</h2>
        <Link to="/leveling/ranking">
          <Button
            variant="outline"
            className="border-[#94A3B8] text-lg text-slate-600 hover:bg-slate-50"
          >
            Ranking completo
          </Button>
        </Link>
      </div>

      <div className="mx-auto w-full max-w-72 sm:mx-0">
        {/* TABS */}
        <div className="mb-4 flex w-full gap-6">
          <button
            onClick={() => handleTabClick('Semanal')}
            className={`
                w-1/2 rounded-t-xl border border-b-0 px-4 py-2 text-center text-base transition-colors duration-200
                ${activeTab === 'Semanal' ? 'border-[#FF7B0F] bg-[#FF7B0F] font-bold text-white shadow-sm' : 'border-[#E2E8F0] bg-[#E2E8F0] text-[#64748B] hover:bg-slate-200'}
              `}
          >
            Semanal
          </button>
          <button
            onClick={() => handleTabClick('Mensal')}
            className={`
                w-1/2 rounded-t-lg border border-b-0 px-4 py-2 text-center text-base transition-colors duration-200
                ${activeTab === 'Mensal' ? 'border-[#FF7B0F] bg-[#FF7B0F] font-bold text-white shadow-sm' : 'border-[#E2E8F0] bg-[#E2E8F0] text-[#64748B] hover:bg-slate-200'}
              `}
          >
            Mensal
          </button>
        </div>

        {/* COMPETE TOGGLE */}

        {/* --- MY RANK BOX --- */}
        <div className="mb-6 flex items-center justify-between rounded-xl bg-[#FED7AA] px-4 py-3 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-800">Sua posição</span>
            <span className="text-xl font-bold text-[#C2410C]">
              {myRank ? `${myRank.rank}°` : '-'}
            </span>
          </div>
          <Button variant="ghost" size="icon" className="text-orange-800 hover:bg-orange-200">
            <img src="/staticImages/share.svg" alt="Share" className="size-5" />
          </Button>
        </div>

        {/* --- PODIUM (TOP 3) --- */}
        <div className="relative mb-6 flex h-[280px] items-end justify-center gap-1">
          {/* 2nd Place */}
          <div className="relative flex w-1/3 flex-col items-center">
            <div className="absolute -top-10" style={{ zIndex: 10 }}>
              <InitialAvatar name={top3[1].name} rank={2} size="14" />
            </div>
            <div className="flex h-[180px] w-full flex-col items-center justify-start rounded-tl-3xl bg-[#10B981] p-2 pt-8 text-white shadow-md">
              <span className="text-2xl font-bold">2</span>
              <div className="mt-2 w-full text-center">
                <span className="block w-full truncate px-1 text-xs font-medium leading-tight">
                  {top3[1].name.split(' ')[0]}
                </span>
                <span className="mt-1 block text-[10px] opacity-80">{top3[1].xp} XP</span>
              </div>
            </div>
          </div>

          {/* 1st Place */}
          <div className="relative z-20 flex w-1/3 flex-col items-center">
            <div className="absolute -top-12" style={{ zIndex: 20 }}>
              <InitialAvatar name={top3[0].name} rank={1} size="16" />
            </div>
            <div className="flex h-[210px] w-full flex-col items-center justify-start rounded-t-xl bg-[#FF7B0F] p-2 pt-10 text-white shadow-lg">
              <span className="text-4xl font-bold">1</span>
              <div className="mt-2 w-full text-center">
                <span className="block w-full truncate px-1 text-sm font-bold leading-tight">
                  {top3[0].name.split(' ')[0]}
                </span>
                <span className="mt-1 block text-xs font-medium opacity-90">{top3[0].xp} XP</span>
              </div>
            </div>
          </div>

          {/* 3rd Place */}
          <div className="relative flex w-1/3 flex-col items-center">
            <div className="absolute -top-10" style={{ zIndex: 10 }}>
              <InitialAvatar name={top3[2].name} rank={3} size="14" />
            </div>
            <div className="flex h-[150px] w-full flex-col items-center justify-start rounded-tr-3xl bg-[#334155] p-2 pt-8 text-white shadow-md">
              <span className="text-2xl font-bold">3</span>
              <div className="mt-2 w-full text-center">
                <span className="block w-full truncate px-1 text-xs font-medium leading-tight">
                  {top3[2].name.split(' ')[0]}
                </span>
                <span className="mt-1 block text-[10px] opacity-80">{top3[2].xp} XP</span>
              </div>
            </div>
          </div>
        </div>

        {/* --- LIST (4th to 7th) --- */}
        <div className="space-y-1">
          {remainingUsers.length > 0 ? (
            remainingUsers.map((user) => (
              <div
                key={user.rank}
                className="flex cursor-default items-center justify-between rounded-lg border-b border-slate-100 p-2 transition-colors last:border-0 hover:bg-slate-50"
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <span className="w-6 shrink-0 text-center text-sm font-bold text-slate-500">
                    {user.rank.toString().padStart(2, '0')}
                  </span>
                  <InitialAvatar name={user.name} rank={user.rank} size="8" />
                  <div className="flex flex-col overflow-hidden">
                    <span className="truncate text-sm font-medium text-slate-700">{user.name}</span>
                  </div>
                </div>
                <span className="ml-2 whitespace-nowrap text-xs font-bold text-slate-500">
                  {user.xp} XP
                </span>
              </div>
            ))
          ) : (
            <div className="py-4 text-center text-xs italic text-slate-400">
              Não há mais usuários no ranking.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
