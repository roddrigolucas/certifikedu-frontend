interface XPCardProps {
  expLevel: number; // XP atual do usuário
  userTitle: string; // Título atual (ex: "Iniciante")
  xpMeta: number; // XP necessário para o próximo nível
}

export default function XPCard({ expLevel, userTitle, xpMeta }: XPCardProps) {
  const progresso = (expLevel / xpMeta) * 100;

  const raio = 65;
  const circunferencia = 2 * Math.PI * raio;
  const offset = circunferencia - (progresso / 100) * circunferencia;

  return (
    <div className="flex min-h-[336px] w-full flex-col items-center rounded-xl border-[1px] border-[#E2E8F0] bg-[#F8FAFC] p-6">
      <h2 className="text-2xl font-bold">{userTitle}</h2>
      <p className="mb-4 pt-2 text-center text-base text-gray-600">
        <p>Faltam {xpMeta - expLevel} XP para</p>
        você virar{' '}
        {userTitle == 'Iniciante' ? 'Aprendiz' : userTitle == 'Aprendiz' ? 'Explorador' : 'Mestre'}
      </p>

      <div className="relative flex size-40 items-center justify-center">
        <svg className="size-full ">
          <circle cx="80" cy="80" r={raio} stroke="#94A3B8" strokeWidth="22" fill="none" />
          <circle
            cx="80"
            cy="80"
            r={raio}
            stroke="#FF7B0F" // laranja
            strokeWidth="22"
            fill="none"
            strokeDasharray={circunferencia}
            strokeDashoffset={offset}
            strokeLinecap="round"
          />
        </svg>

        <div className="absolute text-center">
          <span className="text-2xl font-bold">{expLevel}</span>
          <p className="text-xl text-[#020617]">XP</p>
        </div>
      </div>
    </div>
  );
}
