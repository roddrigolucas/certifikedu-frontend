import { useCallback, useEffect, useState } from 'react';

import { Trophy } from 'lucide-react';

import { ApplicationLayout } from '@/components/layouts/app';
import MissionConquistCards from '@/components/pages/App/NaturalPerson/Leveling/MissionConquistCards';
import PointsTable from '@/components/pages/App/NaturalPerson/Leveling/PointsTable';
import RankingCard, {
  MyRankData,
  RankingUser,
} from '@/components/pages/App/NaturalPerson/Leveling/RankingCard';
import XPCard from '@/components/pages/App/NaturalPerson/Leveling/XPCard';

import useProfile from '@/hooks/core/useProfile';

import { authApi } from '@/services/api/api';

interface DashboardResponse {
  xpAtual: number;
  xpMeta: number;
  level: number;
  title: string;
  missions: any[]; // You can type this stricter if you have the Mission Interface
}

interface PageData {
  dashboard: DashboardResponse;
  myRank: MyRankData;
}

interface Rankings {
  Semanal: RankingUser[];
  Mensal: RankingUser[];
}

export default function LevelingPFPage() {
  const { isLoadingPJ } = useProfile();
  const [loading, setLoading] = useState(true);
  const [pageData, setPageData] = useState<PageData | null>(null);
  const [rankings, setRankings] = useState<Rankings>({ Semanal: [], Mensal: [] });
  const [activeTab, setActiveTab] = useState<'Semanal' | 'Mensal'>('Semanal');

  const fetchTemporalRanking = useCallback(async (period: 'weekly' | 'monthly') => {
    try {
      const limit = 7;
      const response = await authApi.get(
        `/leveling/pf/temporal-ranking?period=${period.toLowerCase()}&limit=${limit}`,
      );

      return response.data as RankingUser[];
    } catch (error) {
      console.error(`Failed to fetch ${period} ranking`, error);

      return [];
    }
  }, []);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        // Fetch dados do Dashboard e Meu Rank em paralelo
        const [dashboardRes, myRankRes] = await Promise.all([
          authApi.get('/leveling/pf/dashboard'),
          authApi.get('/leveling/pf/my-rank'),
        ]);

        // Fetch Rankings Semanal e Mensal (o global-ranking pode ser o 'Mensal' ou o seu 'getGlobalRanking' original)
        // Optamos por buscar o ranking temporal, que é o que o card exibe nas tabs.
        const [rankingSemanal, rankingMensal] = await Promise.all([
          fetchTemporalRanking('weekly'),
          fetchTemporalRanking('monthly'),
        ]);

        setPageData({
          dashboard: dashboardRes.data,
          myRank: myRankRes.data,
        });

        setRankings({
          Semanal: rankingSemanal,
          Mensal: rankingMensal,
        });
      } catch (error) {
        console.error('Failed to fetch gamification data', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [fetchTemporalRanking]);

  const handleRankingTabChange = useCallback((period: 'Semanal' | 'Mensal') => {
    setActiveTab(period);
  }, []);

  if (loading || !pageData) {
    return (
      <ApplicationLayout
        icon={Trophy}
        title="Missões & Conquistas"
        isPageLoading={true}
        hideCredits={true}
      >
        <div className="flex h-96 items-center justify-center text-slate-500">
          Carregando seu progresso...
        </div>
      </ApplicationLayout>
    );
  }

  const activeRankingData = rankings[activeTab];

  return (
    <ApplicationLayout
      icon={Trophy}
      title="Missões & Conquistas"
      isPageLoading={isLoadingPJ}
      hideCredits={true}
    >
      <div className="flex flex-row gap-8">
        <div className="flex w-full flex-col gap-8">
          <div className="flex gap-8">
            <XPCard
              expLevel={pageData.dashboard.xpAtual}
              xpMeta={pageData.dashboard.xpMeta}
              userTitle={pageData.dashboard.title}
            />
            <MissionConquistCards missionsData={pageData.dashboard.missions} />
          </div>

          <div className="">
            <PointsTable missionsData={pageData.dashboard.missions} />
          </div>
        </div>

        <div className="w-[40%] min-w-[350px]">
          <RankingCard
            rankingData={activeRankingData}
            myRank={pageData.myRank}
            onTabChange={handleRankingTabChange}
          />
        </div>
      </div>
    </ApplicationLayout>
  );
}
