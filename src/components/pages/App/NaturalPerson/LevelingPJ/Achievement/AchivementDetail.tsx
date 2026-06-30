/* eslint-disable tailwindcss/classnames-order */

import { useEffect, useState } from 'react';

import { ChevronLeft, Trophy } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

import { ApplicationLayout } from '@/components/layouts/app';

import useProfile from '@/hooks/core/useProfile';

import { authApi } from '@/services/api/api';

interface AchievementDetail {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  isActive: boolean;
  type: string; // ENUM: COURSE_COMPLETION, MANUAL_CLAIM, etc.
  requiredCount: number;
  badgeUrl?: string;
  category: string; // 'ACHIEVEMENT'
}

export default function AchievementDetailPJ() {
  const { id } = useParams<{ id: string }>();
  const { isLoadingPJ } = useProfile();

  const [achievement, setAchievement] = useState<AchievementDetail | null>(null);
  const [loading, setLoading] = useState(true);

  // Helper to format the Trigger Type for display
  const getTriggerLabel = (type: string, count: number) => {
    switch (type) {
      case 'MANUAL_CLAIM':
        return 'Atribuída manualmente pelo Administrador';
      case 'CERTIFICATE_EMISSION':
        return `Ao emitir ${count} certificado(s)`;
      case 'COURSE_COMPLETION':
        return `Ao concluir ${count} curso(s)`;
      case 'PATH_COMPLETION':
        return `Ao concluir ${count} trilha(s)`;
      case 'SOCIAL_SHARE':
        return `Ao compartilhar nas redes sociais`;
      default:
        return 'Critério personalizado';
    }
  };

  useEffect(() => {
    async function fetchDetail() {
      try {
        setLoading(true);
        // Reuse the same endpoint since Missions and Achievements are in the same table
        const response = await authApi.get(`/leveling/pj/mission/${id}`);
        setAchievement(response.data);
      } catch (error) {
        console.error('Failed to fetch achievement details', error);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchDetail();
    }
  }, [id]);

  if (loading) {
    return (
      <ApplicationLayout
        icon={Trophy}
        title="Detalhes da Conquista"
        isPageLoading={true}
        hideCredits={true}
      >
        <div className="flex h-96 items-center justify-center text-slate-500">Carregando...</div>
      </ApplicationLayout>
    );
  }

  if (!achievement) {
    return (
      <ApplicationLayout
        icon={Trophy}
        title="Detalhes da Conquista"
        isPageLoading={false}
        hideCredits={true}
      >
        <div className="p-8 text-center text-slate-500">Conquista não encontrada.</div>
      </ApplicationLayout>
    );
  }

  return (
    <ApplicationLayout
      icon={Trophy}
      title="Conquista"
      isPageLoading={isLoadingPJ}
      hideCredits={true}
    >
      <Link to={'/levelingPJ'}>
        <div className="flex items-center gap-4 text-sm font-bold text-gray-600 hover:text-gray-900 transition-colors">
          <ChevronLeft className="size-4" />
          Voltar para Missões & Conquistas
        </div>
      </Link>

      <div className="card mt-6">
        {/* HEADER */}
        <div className="header flex w-full items-center justify-between rounded-t-xl border border-solid border-[#94A3B8] bg-[#F8FAFC] px-6 py-10">
          <div className="flex items-center gap-6">
            <img
              src={'/staticImages/achievementBagde.svg'}
              className="size-20 object-contain drop-shadow-sm"
              alt="Badge"
            />
            <span className="text-[34px] font-bold text-slate-800">{achievement.title}</span>
          </div>
        </div>

        {/* BODY */}
        <div className="cardbody flex-col flex w-full gap-8 justify-between rounded-b-xl border border-t-0 border-solid border-[#94A3B8] bg-white p-8">
          {/* Metadata Row */}
          <div className="flex justify-start gap-[33%] w-full">
            <div className="gap-2 flex flex-col">
              <span className="text-[12px] font-bold text-[#475569] uppercase tracking-wide">
                STATUS
              </span>
              <span
                className={`w-fit rounded-xl px-4 py-1 text-[12px] font-semibold text-white ${
                  achievement.isActive ? 'bg-[#2B9A66]' : 'bg-slate-400'
                }`}
              >
                {achievement.isActive ? 'Disponível' : 'Indisponível'}
              </span>
            </div>

            <div className="gap-2 flex flex-col">
              <span className="text-[12px] font-bold text-[#475569] uppercase tracking-wide">
                RECOMPENSA
              </span>
              <span className="text-sm font-bold text-slate-700">{achievement.xpReward} XP</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <div className="gap-2 flex flex-col">
              <span className="text-[12px] font-bold text-[#475569] uppercase tracking-wide">
                DESCRIÇÃO
              </span>
              <span className="text-slate-600 leading-relaxed max-w-4xl">
                {achievement.description}
              </span>
            </div>
          </div>

          {/* Criteria (Added this section so Admin knows how it is earned) */}
          <div>
            <div className="gap-2 flex flex-col">
              <span className="text-[12px] font-bold text-[#475569] uppercase tracking-wide">
                COMO DESBLOQUEAR
              </span>
              <span className="text-slate-700 font-medium bg-slate-50 p-3 rounded-lg border border-slate-100 w-fit">
                {getTriggerLabel(achievement.type, achievement.requiredCount)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </ApplicationLayout>
  );
}
