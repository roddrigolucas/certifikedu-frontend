import { createContext, useContext, useState } from 'react';

import { useAbilitieStore } from '@/stores/core/abilities';
import { useProfileStore } from '@/stores/naturalPerson/profile';

import { AbilitiesService } from '@/services/entities/app/core/abilities';
import { IAbilityResponse } from '@/services/entities/app/core/abilities/model';

import { groupAbilitiesByTema } from '@/utils/formatAbilities';

import useAuthentication from '../useAuthentication';
import useRequestProcessor from '../useRequest';
import { AbilitieContextType, AbilitieProviderProps } from './interfaces';

export const AbilitieContext = createContext<AbilitieContextType | undefined>(undefined);

export const AbilitieProvider = ({ children }: AbilitieProviderProps) => {
  const { abilities, updateAbilities, allCategories, categories } = useAbilitieStore();
  const { user } = useAuthentication();
  const profile = useProfileStore();
  const [isCanvas, setIsCanvas] = useState<boolean>(false);

  const { isLoading } = useRequestProcessor().query(
    ['abilities'],
    async () =>
      isCanvas // isCanvas
        ? await AbilitiesService.GetAllCanvas(profile?.isCanvas ?? '')
        : await AbilitiesService.GetAll(),
    {
      enabled: !!user || isCanvas,
      onSuccess: (abilities: IAbilityResponse[]) => {
        const formatted_abilities = groupAbilitiesByTema(abilities);
        updateAbilities(formatted_abilities);
        allCategories(Object.keys(formatted_abilities).sort());
      },
      onError: () => {
        updateAbilities({});
        // toast.error('Erro ao buscar habilidades');
      },
    },
  );

  const contextValue = {
    isLoading,
    abilities,
    categories,
    updateAbilities,
    allCategories,
    setIsCanvas,
  };

  return <AbilitieContext.Provider value={contextValue}>{children}</AbilitieContext.Provider>;
};

const useAbilitie = () => {
  const context = useContext(AbilitieContext);
  if (!context) {
    throw new Error('useAbilitie must be used within a AbilitieProvider');
  }

  return context;
};

export default useAbilitie;
