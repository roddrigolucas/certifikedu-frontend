import { PuffLoader } from 'react-spinners';

import { Logo } from '@/components/core/atoms/Logo';

export default function FullscreenLoadingOverlay() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-8 text-white">
      <Logo path={'images/logo_text.svg'} className="mr-6 h-8 md:h-12" />
      <div className="flex flex-col items-center gap-4">
        <PuffLoader size="4rem" color="#FFF" />
        <p className="font-bold text-slate-400">Carregando...</p>
      </div>
    </div>
  );
}
