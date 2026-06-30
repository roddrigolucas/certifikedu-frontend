/* eslint-disable tailwindcss/classnames-order */
import { Download, Facebook, Linkedin } from 'lucide-react';

import { Logo } from '@/components/core/atoms/Logo';
import { Avatar, AvatarFallback } from '@/components/shared/ui/avatar';

import { getInitials } from '@/utils/getInitials';
import { getImageUrl } from '@/utils/image';

function Header({
  name,
  issuedAt,
  autoIssuer = false,
}: Readonly<{
  name: string;
  issuedAt: string;
  autoIssuer?: boolean;
}>) {
  function formatDate(dateString: string): string {
    const dateParts = dateString.split('/');
    const day = parseInt(dateParts[0]);
    const month = parseInt(dateParts[1]);
    const year = parseInt(dateParts[2]);

    const date = new Date(year, month - 1, day); // Month is zero-based

    const options = {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    } as Intl.DateTimeFormatOptions;
    const formattedDate = date.toLocaleDateString('pt-BR', options);

    return formattedDate;
  }

  return (
    <header className="flex w-full flex-col border border-slate-100 bg-white">
      <div className=" inline-flex h-20 w-full items-center border-b border-ecstasy-100 bg-ecstasy-50 md:h-24">
        <div className="container inline-flex items-center">
          <Logo path="images/logo_text_color.svg" className="h-8 md:h-10" />
        </div>
      </div>
      <div className="container inline-flex w-full items-center justify-center py-4 md:justify-between">
        <div className="flex flex-col items-center gap-2 md:flex-row md:gap-4">
          <Avatar className="rounded-lg">
            <AvatarFallback className="rounded-lg bg-slate-50">{getInitials(name)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <h1 className="text-center text-sm font-normal md:text-left md:text-base">
              Emitido para <strong>{name}</strong> em <strong>{formatDate(issuedAt)}</strong>.
            </h1>
          </div>
        </div>
        {!autoIssuer && (
          <div className="inline-flex items-center gap-2">
            <img src={getImageUrl('images/medal.svg')} alt="Badge" className="size-6" />
            <p className="text-ecstasy-950">Autenticidade garantida</p>
          </div>
        )}
      </div>
    </header>
  );
}

export default function MissionShare() {
  return (
    <div className="min-h-screen bg-white">
      <Header name={'Luciano Sathler'} autoIssuer={false} issuedAt={'30/09/2025'} />
      <div className="container flex flex-col gap-8 py-8 md:gap-6">
        <h2 className="text-center text-lg font-bold md:text-left md:text-3xl">
          Conclusão de Missão
        </h2>
      </div>
      <div className="container flex flex-col gap-8 py-8 md:gap-6">
        <img src="/staticImages/missionBadge.svg" width={250} alt="" />
      </div>
      <div className="container flex flex-col gap-8 py-8 md:gap-6">
        <div className="cardbody flex-col flex w-full gap-8 justify-between p-8">
          <div>
            <span className="font-bold text-4xl">Missão Explorador de Trilhas</span>
          </div>
          <div>
            <div className="gap-3 flex flex-col">
              <span className="text-[12px] font-bold text-[#475569]">
                COMPARTILHE ESSE CERTIFICADO
              </span>
              <span className="text-sm flex gap-2">
                <div className="border p-2 rounded-lg">
                  <Download />
                </div>
                <div className="border p-2 rounded-lg">
                  <Linkedin />
                </div>
                <div className="border p-2 rounded-lg">
                  <Facebook />
                </div>
              </span>
            </div>
          </div>
          <div className="flex justify-start gap-[33%] w-full">
            <div className="gap-3 flex flex-col">
              <span className="text-[12px] font-bold text-[#475569]">RECOMPENSA</span>
              <span className="text-sm">550 XP</span>
            </div>

            <div className="gap-3 flex flex-col">
              <span className="text-[12px] font-bold text-[#475569]">DATA DE CONCLUSÃO</span>
              <span className="text-sm">27/08/2025</span>
            </div>
          </div>

          <div>
            <div className="gap-3 flex flex-col">
              <span className="text-[12px] font-bold text-[#475569]">DESCRIÇÃO</span>
              <span className=" ">
                Você concluiu 3 Trilhas de Aprendizado diferentes e mostrou que sua sede de
                conhecimento não tem limites. Agora você é um verdadeiro Explorador de Trilhas,
                desbravando múltiplos caminhos do saber.
              </span>
            </div>
          </div>

          <div>
            <div className="gap-3 flex flex-col">
              <span className="text-[12px] font-bold text-[#475569]">CRITÉRIO DA MISSÃO</span>
              <span className=" ">Concluir 3 trilhas diferentes</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
