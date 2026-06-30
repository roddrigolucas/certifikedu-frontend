import { useState } from 'react';

import Multiselect from '@cloudscape-design/components/multiselect';
import { BookA, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

import { pagePaths } from '@/constants/navigation/pagePaths';

import { ApplicationLayout } from '@/components/layouts/app';
import { columns } from '@/components/pages/App/Admin/Abilities/columns';
import { BackButton } from '@/components/shared/BackButton';
import { DataTable } from '@/components/shared/DataTable';
import { Button } from '@/components/shared/ui/button';

import useAbilitie from '@/hooks/core/useAbilitie';
import useProfile from '@/hooks/core/useProfile';

export interface IThemeOption {
  label: string;
  value: string;
}

export interface IAbilityTransformed {
  tema: string;
  habilidade: string;
  habilidadeId: string;
}
export default function AdmimAbilitiesPage() {
  const { authenticated } = pagePaths;
  const { setIsAdminSelected } = useProfile();
  const { abilities: allEnabledAbilities, categories: allThemeOptions } = useAbilitie();

  const [data, setData] = useState<IAbilityTransformed[]>([]);
  const [selectedThemes, setSelectedThemes] = useState([]);

  const filterKeyValuesByThemes = (themes: IThemeOption[]): IAbilityTransformed[] => {
    const result: IAbilityTransformed[] = [];
    themes.forEach((theme) => {
      if (allEnabledAbilities?.[theme.value]) {
        allEnabledAbilities[theme.value].forEach((value) => {
          result.push({
            tema: theme.value,
            habilidade: value.habilidade,
            habilidadeId: value.habilidadeId,
          });
        });
      }
    });

    return result;
  };

  const handleThemeChange = ({ detail }: any) => {
    const selectedOptions = detail.selectedOptions as IThemeOption[];

    setSelectedThemes(detail.selectedOptions as any);
    setData(filterKeyValuesByThemes(selectedOptions));
  };

  return (
    <ApplicationLayout icon={BookA} title="Habilidades Cadastradas">
      <BackButton
        onClick={() => setIsAdminSelected(false)}
        href={authenticated.naturalPerson.dashboard}
      >
        Voltar para Ambiente Normal
      </BackButton>
      <div>
        <Multiselect
          selectedOptions={selectedThemes}
          onChange={handleThemeChange}
          options={allThemeOptions?.map((theme) => ({ label: theme, value: theme })) ?? ([] as any)}
          filteringType="auto"
          placeholder="Filtre por categorias"
          virtualScroll={true}
        />
      </div>
      <div className="flex flex-col gap-2">
        <DataTable
          filterColumn="ability"
          columns={columns}
          data={data ?? []}
          headerOptions={{
            filter: true,
            toolbar: true,
            children: (
              <div className="inline-flex items-center gap-2">
                <Link to={pagePaths.authenticated.admin.abilities.create}>
                  <Button variant="success" className="group" size="sm">
                    <Plus className="ease mr-1 size-4 transition-transform duration-500 group-hover:rotate-180" />
                    Criar Categoria/Habilidade
                  </Button>
                </Link>
                {/* <Link to={pagePaths.authenticated.admin.abilities.create.bulk}> */}
                <Button variant="success" className="group" size="sm" disabled={true}>
                  <Plus className="ease mr-1 size-4 transition-transform duration-500 group-hover:rotate-180" />
                  Cadastrar em Lote
                </Button>
                {/* </Link> */}
              </div>
            ),
          }}
        />
      </div>
    </ApplicationLayout>
  );
}
