import { CategoriesType, IAbility } from '@/services/entities/app/core/abilities/model';

export interface AbilitieContextType {
  isLoading: boolean;
  abilities: IAbility | null;
  categories: CategoriesType | null;
  updateAbilities: (abilities: IAbility) => void;
  allCategories: (categories: CategoriesType) => void;
  setIsCanvas: (value: boolean) => void;
}

export interface AbilitieProviderProps {
  children: React.ReactNode;
}
