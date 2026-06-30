import { Link } from 'react-router-dom';

interface MissionConquistCardsProps {
  missionsData: Mission[]; // XP atual do usuário
}

interface Mission {
  id: number;
  title: string;
  status: string; // IN_PROGRESS or COMPLETED
  progress: number;
  category: string;
}

export default function MissionConquistCards({ missionsData }: MissionConquistCardsProps) {
  let missionsCompletedCount;
  let missionsInProgressCount;
  let achievementsCompletedCount;
  let achievementsInProgressCount;

  if (missionsData && missionsData.length > 0) {
    const missions = missionsData.filter((activity) => activity.category === 'MISSION');
    const achievements = missionsData.filter((activity) => activity.category === 'ACHIEVEMENT');
    missionsCompletedCount = missions.filter((mission) => mission.status === 'COMPLETED').length;
    missionsInProgressCount = missions.filter((mission) => mission.status === 'IN_PROGRESS').length;
    achievementsCompletedCount = achievements.filter(
      (achievement) => achievement.status === 'COMPLETED',
    ).length;
    achievementsInProgressCount = achievements.filter(
      (achievement) => achievement.status === 'IN_PROGRESS',
    ).length;
  } else {
    missionsCompletedCount = '0';
    missionsInProgressCount = '0';
    achievementsCompletedCount = '0';
    achievementsInProgressCount = '0';
  }

  return (
    <div className="flex min-h-[336px] w-full flex-col gap-4 ">
      <div className="h-full rounded-xl border-[1px] border-[#E2E8F0] bg-transparent p-6">
        <div className="flex  gap-6">
          <img src="/staticImages/swords.svg" alt="" />
          <h2 className="text-base font-semibold">Missões</h2>
        </div>
        <div className="relative left-16 mb-1 flex gap-8">
          <div className="">
            <p className="tect-base text-start font-semibold">{missionsCompletedCount}</p>
            <p className="text-sm text-gray-500">Concluídas</p>
          </div>
          <div>
            <p className="tect-base text-start font-semibold">{missionsInProgressCount}</p>
            <p className="text-sm text-gray-500">Ativas</p>
          </div>
        </div>
        <Link to={'/leveling/missions'}>
          <button className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg border border-[#94A3B8] px-4 py-2 text-lg font-medium hover:bg-gray-50">
            Ver todas
            <span>➔</span>
          </button>
        </Link>
      </div>

      {/* Card Conquistas */}
      <div className="h-full rounded-xl border-[1px] border-[#E2E8F0] bg-transparent p-6">
        <div className="flex  gap-6">
          <img src="/staticImages/star.svg" alt="" />
          <h2 className="text-base font-semibold">Conquistas</h2>
        </div>
        <div className="relative left-16 mb-1 flex gap-8">
          <div className="">
            <p className="tect-base text-start font-semibold">{achievementsCompletedCount}</p>
            <p className="text-sm text-gray-500">Desbloqueadas</p>
          </div>
          <div>
            <p className="tect-base text-start font-semibold">{achievementsInProgressCount}</p>
            <p className="text-sm text-gray-500">Ativas</p>
          </div>
        </div>
        <Link to={'/leveling/achievements'}>
          <button className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg border border-[#94A3B8] px-4 py-2 text-lg font-medium hover:bg-gray-50">
            Ver todas
            <span>➔</span>
          </button>
        </Link>
      </div>
    </div>
  );
}
