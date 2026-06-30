import { ArrowRight, LucideIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { pagePaths } from '@/constants/navigation/pagePaths';

interface Props {
  icon: LucideIcon;
  title: string;
  description: string;
  typeAccount: string;
  testId: string;
}

export default function AccountCard({
  title,
  description,
  typeAccount,
  icon,
  testId,
}: Readonly<Props>) {
  const navigate = useNavigate();
  const Icon = icon;

  const HandleType = (type: string) => {
    if (type === 'bulk') {
      navigate(pagePaths.authenticated.naturalPerson.student.bulkCreate);
    } else if (type === 'unitary') {
      navigate(pagePaths.authenticated.naturalPerson.student.unitaryCreate);
    }
  };

  return (
    <button
      type="button"
      data-testId={testId}
      onClick={() => HandleType(typeAccount)}
      className="ease group flex w-full flex-col gap-8 rounded-xl border-2 border-blue-800 bg-blue-zodiac-600 p-8 text-left transition-all duration-500 hover:bg-blue-zodiac-600/90"
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
