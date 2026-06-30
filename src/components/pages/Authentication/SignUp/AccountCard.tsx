import { ArrowRight, LucideIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { buildSignUpPageUrl } from '@/utils/url';

interface Props {
  icon: LucideIcon;
  title: string;
  description: string;
  typeAccount: string;
}

export default function AccountCard({ title, description, typeAccount, icon }: Readonly<Props>) {
  const navigate = useNavigate();
  const Icon = icon;

  const HandleType = (type: string) => {
    navigate(buildSignUpPageUrl({ type }), {
      replace: true,
    });
  };

  return (
    <button
      type="button"
      onClick={() => HandleType(typeAccount)}
      className="ease group flex w-full flex-col gap-8 rounded-xl border-4 border-slate-700 bg-blue-zodiac-950 p-8 text-left transition-all duration-500 hover:bg-blue-zodiac-950/90"
    >
      <Icon className="size-12 text-white" />

      <div className="flex flex-col gap-1 text-white">
        <h4 className="text-lg font-semibold">{title}</h4>
        <p className="text-sm text-slate-300">{description}</p>
      </div>

      <div className="inline-flex w-full justify-end">
        <ArrowRight className="ease text-white transition-all duration-500 group-hover:translate-x-2" />
      </div>
    </button>
  );
}
