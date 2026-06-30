/* eslint-disable tailwindcss/classnames-order */

import { useEffect, useState } from 'react';

import { ChevronLeft, Trophy } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

import { ApplicationLayout } from '@/components/layouts/app';

import useProfile from '@/hooks/core/useProfile';

import { authApi } from '@/services/api/api';

interface MissionDetail {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  isActive: boolean;
  type: string; // The enum from backend (e.g. COURSE_COMPLETION)
  requiredCount: number;
  badgeUrl?: string;
  _count?: {
    userProgress: number; // Optional stats from backend
  };
}

export default function MissionsDetailPJ() {
  const { id } = useParams<{ id: string }>();
  const { isLoadingPJ } = useProfile();

  const [mission, setMission] = useState<MissionDetail | null>(null);
  const [loading, setLoading] = useState(true);

  const getTriggerLabel = (type: string, count: number) => {
    switch (type) {
      case 'CERTIFICATE_EMISSION':
        return `Emitir ${count} certificado(s)`;
      case 'COURSE_COMPLETION':
        return `Concluir ${count} curso(s)`;
      case 'PATH_COMPLETION':
        return `Concluir ${count} trilha(s)`;
      case 'SOCIAL_SHARE':
        return `Compartilhar em redes sociais`;
      case 'FILE_DOWNLOAD':
        return `Realizar download de material`;
      default:
        return 'Critério manual';
    }
  };

  useEffect(() => {
    async function fetchMissionDetail() {
      try {
        const response = await authApi.get(`/leveling/pj/mission/${id}`);
        setMission(response.data);
      } catch (error) {
        console.error('Failed to fetch mission details', error);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchMissionDetail();
    }
  }, [id]);

  if (loading) {
    return (
      <ApplicationLayout
        icon={Trophy}
        title="Detalhes da Missão"
        isPageLoading={true}
        hideCredits={true}
      >
        <div className="flex h-96 items-center justify-center">Carregando...</div>
      </ApplicationLayout>
    );
  }

  if (!mission) {
    return (
      <ApplicationLayout
        icon={Trophy}
        title="Detalhes da Missão"
        isPageLoading={false}
        hideCredits={true}
      >
        <div className="p-8 text-center">Missão não encontrada.</div>
      </ApplicationLayout>
    );
  }

  return (
    <ApplicationLayout icon={Trophy} title="Missões" isPageLoading={isLoadingPJ} hideCredits={true}>
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
            {/* FIXME - Badge not appearing */}
            <img
              src={mission.badgeUrl || '/staticImages/missionBadge.svg'}
              className="size-16 object-contain"
              alt="Badge"
            />
            <span className="text-[34px] font-bold text-slate-800">{mission.title}</span>
          </div>
        </div>

        <div className="cardbody flex flex-col w-full gap-8 rounded-b-xl border border-t-0 border-solid border-[#94A3B8] bg-white p-8">
          <div className="flex justify-start gap-[33%] w-full">
            <div className="gap-2 flex flex-col">
              <span className="text-[12px] font-bold text-[#475569] uppercase tracking-wide">
                Status
              </span>
              <span
                className={`w-fit rounded-xl px-4 py-1 text-[12px] font-semibold text-white ${
                  mission.isActive ? 'bg-[#2B9A66]' : 'bg-slate-400'
                }`}
              >
                {mission.isActive ? 'Ativa' : 'Inativa'}
              </span>
            </div>

            <div className="gap-2 flex flex-col">
              <span className="text-[12px] font-bold text-[#475569] uppercase tracking-wide">
                Recompensa
              </span>
              <span className="text-sm font-bold text-slate-700">{mission.xpReward} XP</span>
            </div>

            {mission._count && (
              <div className="gap-2 flex flex-col">
                <span className="text-[12px] font-bold text-[#475569] uppercase tracking-wide">
                  Participantes
                </span>
                <span className="text-sm font-bold text-slate-700">
                  {mission._count.userProgress} alunos
                </span>
              </div>
            )}
          </div>

          <div className="gap-2 flex flex-col">
            <span className="text-[12px] font-bold text-[#475569] uppercase tracking-wide">
              Descrição
            </span>
            <p className="text-slate-600 leading-relaxed max-w-4xl">{mission.description}</p>
          </div>

          <div className="gap-2 flex flex-col">
            <span className="text-[12px] font-bold text-[#475569] uppercase tracking-wide">
              Critério da Missão
            </span>
            <span className="text-slate-700 font-medium bg-slate-50 p-3 rounded-lg border border-slate-100 w-fit">
              {getTriggerLabel(mission.type, mission.requiredCount)}
            </span>
          </div>
        </div>
      </div>
    </ApplicationLayout>
  );
}
