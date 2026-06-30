import { useState } from 'react';

import {
  Accessibility,
  BookOpen,
  Briefcase,
  GraduationCap,
  Laptop,
  MapPin,
  NotebookPen,
  Trash2Icon,
} from 'lucide-react';
import { toast } from 'sonner';

import { ApplicationLayout } from '@/components/layouts/app';
import { PageSkeletonFull } from '@/components/layouts/app/shared/PageSkeleton';
import { Badge } from '@/components/shared/ui/badge';
import { Button } from '@/components/shared/ui/button';

import useProfile from '@/hooks/core/useProfile';
import useRequestProcessor from '@/hooks/core/useRequest';
import { useProfileStore } from '@/stores/naturalPerson/profile';

import { ProfessionalProfileService } from '@/services/entities/app/core/professionalProfile';
import { IProfessionalProfileResponse } from '@/services/entities/app/core/professionalProfile/model';

interface IAbilitiesSectionProps {
  title: string;
  items: string[];
}

const AbilitiesSection: React.FC<IAbilitiesSectionProps> = ({ title, items }) => {
  const [showAll, setShowAll] = useState(false);

  const handleToggleShowAll = () => {
    setShowAll(!showAll);
  };

  const maxDisplayedItems = 4;

  const itemsToShow = showAll ? items : items.slice(0, maxDisplayedItems);

  return (
    <>
      <h4 className="mt-8 text-xl font-semibold">{title}</h4>
      <div className="mt-4 flex flex-wrap gap-2">
        {itemsToShow.length === 0 && (
          <Badge className="rounded- rounded-lg bg-slate-100 p-2" variant="outline">
            Sem habilidades
          </Badge>
        )}
        {itemsToShow.map((item, index) => (
          <Badge className="rounded- rounded-lg bg-slate-100 p-2" key={index} variant="outline">
            {item}
          </Badge>
        ))}
        {items.length > maxDisplayedItems && !showAll && (
          <Button variant="ghost" className="p-2 underline" size="sm" onClick={handleToggleShowAll}>
            Ver mais
          </Button>
        )}
        {showAll && items.length > maxDisplayedItems && (
          <Button variant="ghost" size="sm" className="p-2 underline" onClick={handleToggleShowAll}>
            Ver menos
          </Button>
        )}
      </div>
    </>
  );
};

interface IProfessionalProfileResponsePackage {
  data: IProfessionalProfileResponse;
  name: string;
  userPF?: boolean;
}

export function ProfessionalProfile({
  data,
  name,
  userPF = false,
}: IProfessionalProfileResponsePackage): JSX.Element {
  const { updateSpecificProfileInfo } = useProfileStore();

  function DeleteProfessionalProfile() {
    const response = ProfessionalProfileService.DeleteProfessionalProfile();

    toast.promise(response, {
      loading: 'Em processamento...',
      success: () => {
        updateSpecificProfileInfo({ hasProfessionalProfile: false });

        return `Perfil Professional Deletado com sucesso!`;
      },
      error: () => {
        return 'Falha ao deletar Perfil Prefisional ...';
      },
    });
  }

  return (
    <>
      <div className="flex flex-row justify-between">
        <h1 className="mt-2 text-3xl font-bold">{name}</h1>
        {userPF && (
          <div className="flex items-end">
            <Button
              onClick={() => DeleteProfessionalProfile()}
              variant="outline"
              size="sm"
              className="gap-2 p-2 hover:bg-red-400"
            >
              <Trash2Icon />
              Apagar
            </Button>
          </div>
        )}
      </div>
      <h2 className="text-slate-600">Código do Perfil: 1</h2>

      <div className="mt-4 inline-flex flex-wrap gap-2 text-xs">
        <Badge className="gap-1 p-2  " variant="info">
          <MapPin size={16} />
          {data?.city}/{data?.state}
        </Badge>
        {data?.workModel.map((item, index) => (
          <Badge className="gap-1 p-2 " key={index} variant="info">
            <Laptop size={16} />
            {item}
          </Badge>
        ))}
        {data?.opportunityType.map((item, index) => (
          <Badge className="gap-1 p-2 " key={index} variant="info">
            <NotebookPen size={16} />
            {item}
          </Badge>
        ))}
        {data && (
          <Badge className="gap-1 p-2" variant="info">
            <Accessibility size={16} />
            Aceita PCD
          </Badge>
        )}
        {data.seniorityLevel.map((seniority, index) => (
          <Badge className="gap-1 p-2" key={index} variant="info">
            <BookOpen size={16} />
            {seniority}
          </Badge>
        ))}
        {data.educationLevel.map((education, index) => (
          <Badge className="gap-1 p-2" key={index} variant="info">
            <GraduationCap size={16} />
            {education}
          </Badge>
        ))}
      </div>
      <div className="flex flex-col gap-3">
        <h4 className="mt-8 text-xl font-semibold">Descrição</h4>
        <p>{data?.description}</p>
      </div>
      <div className="flex flex-col gap-5 lg:flex-row">
        <div className="mr-10 flex flex-col">
          <AbilitiesSection title="Áreas de Atuação" items={data?.workFields ?? []} />
          <AbilitiesSection
            title="Habilidades"
            items={data?.abilities?.map((ability) => ability.ability) ?? []}
          />
        </div>
      </div>
    </>
  );
}

export default function ProfessionalProfilePage() {
  const { profileData, profileInfo } = useProfile();

  const professionalProfile = useRequestProcessor().query(
    ['professionalProfile', `${profileInfo?.hasProfessionalProfile}`],
    async () => await ProfessionalProfileService.GetProfessionalProfile(),
    {
      enabled: profileInfo?.hasProfessionalProfile,
      onError: (error: any) => {
        toast.error(`${error}`);
      },
    },
  );

  return (
    <ApplicationLayout icon={Briefcase} title="Perfil Profissional" hideCredits>
      <div className="flex flex-col gap-3">
        {professionalProfile.isFetching ? (
          <PageSkeletonFull />
        ) : (
          <div className="">
            <ProfessionalProfile
              data={professionalProfile.data ?? ({} as IProfessionalProfileResponse)}
              name={profileData?.naturalPerson.name ?? ''}
              userPF={true}
            />
          </div>
        )}
      </div>
    </ApplicationLayout>
  );
}
