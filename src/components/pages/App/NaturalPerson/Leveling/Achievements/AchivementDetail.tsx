/* eslint-disable tailwindcss/classnames-order */
import { useEffect, useState } from 'react';

import { ChevronLeft, Linkedin, Share2, Trophy } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

import { ApplicationLayout } from '@/components/layouts/app';

import useProfile from '@/hooks/core/useProfile';

const data = [{ status: 'ativa' }, { status: 'concluido' }, { status: '' }];

export default function AchievementDetail() {
  const { id } = useParams<{ id: string }>();
  const { isLoadingPJ } = useProfile();

  const [missionType, setMissionType] = useState<string>('');

  useEffect(() => {
    if (id !== undefined) {
      const index = parseInt(id);
      if (data && data[index]) {
        setMissionType(data[index].status);
      }
    }
  }, [id]);

  return (
    <ApplicationLayout
      icon={Trophy}
      title="Conquista"
      isPageLoading={isLoadingPJ}
      hideCredits={true}
    >
      <Link to={'/leveling/achievements'}>
        <div className="flex items-center gap-4 text-sm font-bold">
          <ChevronLeft />
          Voltar para Conquistas
        </div>
      </Link>
      <div className="card">
        <div className="header flex w-full items-center justify-between rounded-t-xl border border-solid border-[#94A3B8] bg-[#F8FAFC] px-6 py-10">
          <div className="flex items-center gap-4">
            <img src="/staticImages/achievementBagde.svg" width={65} alt="" />
            <span className="text-[34px] font-bold">Concluiu uma trilha</span>
          </div>
          {missionType == 'concluido' && (
            <div className="flex flex-col gap-4">
              <Link to={'/leveling/achievements/2/share'}>
                <button className="flex items-center justify-center gap-2 rounded-lg bg-[#10B981] p-2 font-semibold text-white">
                  <Share2 />
                  Compartilhar missão
                </button>
              </Link>
              <button className="flex items-center justify-center gap-2 rounded-lg bg-[#1E40AF] p-2 font-semibold text-white">
                <Linkedin />
                Adicionar ao linkedin
              </button>
            </div>
          )}
        </div>
        <div className="cardbody flex-col flex w-full gap-8 justify-between rounded-b-xl border border-t-0 border-solid border-[#94A3B8] p-8">
          <div className="flex justify-start gap-[33%] w-full">
            <div className="gap-3 flex flex-col">
              <span className="text-[12px] font-bold text-[#475569]">RECOMPENSA</span>
              <span className="text-sm">550 XP</span>
            </div>
            {missionType == 'concluido' && (
              <div className="gap-3 flex flex-col">
                <span className="text-[12px] font-bold text-[#475569]">DATA DE CONCLUSÃO</span>
                <span className="text-sm">27/08/2025</span>
              </div>
            )}
          </div>

          <div>
            <div className="gap-3 flex flex-col">
              <span className="text-[12px] font-bold text-[#475569]">DESCRIÇÃO</span>
              {missionType == 'ativa' ? (
                <span className=" ">
                  Ainda faltam alguns passos para finalizar sua jornada. Complete os cursos de uma
                  trilha para desbloquear essa conquista.
                </span>
              ) : (
                <span className=" ">
                  Parabéns! 🎉 Você concluiu a <span className="font-bold">Trilha de Robótica</span>{' '}
                  e provou sua habilidade em explorar os caminhos da tecnologia. Agora você faz
                  parte do seleto grupo de especialistas que dominam o universo dos robôs.
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </ApplicationLayout>
  );
}
