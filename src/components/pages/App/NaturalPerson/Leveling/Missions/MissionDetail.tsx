/* eslint-disable tailwindcss/classnames-order */
import { useEffect, useState } from 'react';

import { ChevronLeft, Linkedin, Share2, Trophy } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

import { ApplicationLayout } from '@/components/layouts/app';

import useProfile from '@/hooks/core/useProfile';

import { authApi } from '@/services/api/api';

interface MissionDetail {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  status: 'IN_PROGRESS' | 'COMPLETED';
  currentCount: number;
  requiredCount: number;
  badgeUrl?: string;
  completedAt?: string;
  progress: number;
  type: string; // The trigger type (e.g. COURSE_COMPLETION)
}

export default function MissionsDetail() {
  const { id } = useParams<{ id: string }>();
  const { isLoadingPJ } = useProfile();

  const [mission, setMission] = useState<MissionDetail | null>(null);
  const [loading, setLoading] = useState(true);

  const getStatusInfo = (status: string) => {
    if (status === 'COMPLETED' || status === 'CLAIMED') {
      return { label: 'Concluída', bg: '#2B9A66' };
    }
    if (status === 'IN_PROGRESS') {
      return { label: 'Ativa', bg: '#EA580C' };
    }

    return { label: 'Disponível', bg: '#1E2C51' };
  };

  // Helper: Trigger Label
  const getTriggerLabel = (type: string, count: number) => {
    switch (type) {
      case 'CERTIFICATE_EMISSION':
        return `Emitir ${count} certificado(s)`;
      case 'COURSE_COMPLETION':
        return `Concluir ${count} curso(s)`;
      case 'PATH_COMPLETION':
        return `Concluir ${count} trilha(s)`;
      case 'SOCIAL_SHARE':
        return `Compartilhar nas redes sociais`;
      case 'FILE_DOWNLOAD':
        return `Realizar download de material`;
      default:
        return 'Critério especial';
    }
  };

  // 1. Fetch Mission Detail
  useEffect(() => {
    async function fetchDetail() {
      try {
        setLoading(true);

        const response = await authApi.get(`/leveling/pf/mission/${id}`);

        const data = response.data as MissionDetail;
        const progress = Math.min((data.currentCount / data.requiredCount) * 100, 100);

        setMission({
          id: data.id,
          title: data.title,
          description: data.description,
          xpReward: data.xpReward,
          status: data.status,
          currentCount: data.currentCount,
          requiredCount: data.requiredCount,
          badgeUrl: data.badgeUrl,
          completedAt: '', // Using updatedAt as completion date if status is completed
          progress: progress,
          type: data.type,
        });
      } catch (error) {
        console.error('Failed to fetch mission details', error);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchDetail();
  }, [id]);

  // 2. Handle Social Share (Triggers Backend Event)
  // const handleSocialShare = async (platform: string) => {
  //   try {
  //     // await GamificationService.reportEvent(
  //     //   GamificationEventType.SOCIAL_SHARE,
  //     //   'social_share_linkedin',
  //     //   `Compartilhou missão ${mission?.title} no ${platform}`
  //     // );
  //     toast.success(`Compartilhamento registrado! (+XP)`);
  //   } catch (error) {
  //     console.error(error);
  //     toast.error('Erro ao registrar compartilhamento.');
  //   }
  // };

  if (loading) {
    return (
      <ApplicationLayout icon={Trophy} title="Detalhes" isPageLoading={true} hideCredits={true}>
        <div className="flex h-96 items-center justify-center">Carregando...</div>
      </ApplicationLayout>
    );
  }

  if (!mission) {
    return (
      <ApplicationLayout icon={Trophy} title="Detalhes" isPageLoading={false} hideCredits={true}>
        <div className="p-8 text-center">Missão não encontrada.</div>
      </ApplicationLayout>
    );
  }

  const statusInfo = getStatusInfo(mission.status);
  const isCompleted = mission.status === 'COMPLETED';

  return (
    <ApplicationLayout icon={Trophy} title="Missões" isPageLoading={isLoadingPJ} hideCredits={true}>
      <Link to={'/leveling/missions'}>
        <div className="flex items-center gap-4 text-sm font-bold hover:text-gray-700 transition-colors">
          <ChevronLeft className="size-4" />
          Voltar para Missões
        </div>
      </Link>

      <div className="card mt-6">
        {/* HEADER */}
        <div className="header flex w-full items-center justify-between rounded-t-xl border border-solid border-[#94A3B8] bg-[#F8FAFC] px-6 py-10">
          <div className="flex items-center gap-6">
            <img
              src={'/staticImages/missionBadge.svg'}
              className="size-16 object-contain"
              alt="Badge"
            />
            <span className="text-[34px] font-bold text-slate-800">{mission.title}</span>
          </div>

          {/* ACTIONS (Only if completed) */}
          {isCompleted && (
            <div className="flex flex-col gap-3">
              <Link to={`/leveling/missions/${id}/share`}>
                <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#10B981] p-2 font-semibold text-white hover:bg-[#059669] transition-colors">
                  <Share2 className="size-4" />
                  Compartilhar missão
                </button>
              </Link>

              <button
                onClick={() => {}}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#1E40AF] p-2 font-semibold text-white hover:bg-[#1e3a8a] transition-colors"
              >
                <Linkedin className="size-4" />
                Adicionar ao linkedin
              </button>
            </div>
          )}
        </div>

        {/* BODY */}
        <div className="cardbody flex-col flex w-full gap-8 justify-between rounded-b-xl border border-t-0 border-solid border-[#94A3B8] bg-white p-8">
          {/* METADATA ROW */}
          <div className="flex justify-start gap-[33%] w-full">
            <div className="gap-2 flex flex-col">
              <span className="text-[12px] font-bold text-[#475569] uppercase tracking-wide">
                STATUS
              </span>
              <span
                className="w-fit rounded-xl px-4 py-1 text-[12px] font-semibold text-white"
                style={{ backgroundColor: statusInfo.bg }}
              >
                {statusInfo.label}
              </span>
            </div>

            <div className="gap-2 flex flex-col">
              <span className="text-[12px] font-bold text-[#475569] uppercase tracking-wide">
                RECOMPENSA
              </span>
              <span className="text-sm font-bold text-slate-700">{mission.xpReward} XP</span>
            </div>

            {isCompleted && mission.completedAt && (
              <div className="gap-2 flex flex-col">
                <span className="text-[12px] font-bold text-[#475569] uppercase tracking-wide">
                  DATA DE CONCLUSÃO
                </span>
                <span className="text-sm font-bold text-slate-700">
                  {new Date(mission.completedAt).toLocaleDateString('pt-BR')}
                </span>
              </div>
            )}
          </div>

          {/* DESCRIPTION */}
          <div>
            <div className="gap-2 flex flex-col">
              <span className="text-[12px] font-bold text-[#475569] uppercase tracking-wide">
                DESCRIÇÃO
              </span>
              <span className="text-slate-600 leading-relaxed max-w-4xl">
                {mission.description}
              </span>
            </div>
          </div>

          {/* CRITERIA */}
          <div>
            <div className="gap-2 flex flex-col">
              <span className="text-[12px] font-bold text-[#475569] uppercase tracking-wide">
                CRITÉRIO DA MISSÃO
              </span>
              <span className="text-slate-700 font-medium bg-slate-50 p-3 rounded-lg border border-slate-100 w-fit">
                {getTriggerLabel(mission.type, mission.requiredCount)}
              </span>
            </div>
          </div>

          {/* PROGRESS BAR (Only if Active) */}
          {mission.status === 'IN_PROGRESS' && (
            <div className="w-1/3 min-w-[300px]">
              <div className="gap-2 flex flex-col">
                <span className="text-[12px] font-bold text-[#475569] uppercase tracking-wide">
                  PROGRESSO
                </span>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-slate-700">
                    {Math.floor(mission.progress)}%
                  </span>
                  <div className="h-2 w-full overflow-hidden rounded-xl border border-slate-200 bg-[#D9D9D9]">
                    <div
                      className="h-full rounded-xl bg-[#10B981] transition-all duration-500"
                      style={{ width: `${mission.progress}%` }}
                      role="progressbar"
                      aria-valuenow={mission.progress}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    />
                  </div>
                </div>
                <span className="text-xs text-slate-500">
                  {mission.currentCount} / {mission.requiredCount} completado(s)
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </ApplicationLayout>
  );
}
