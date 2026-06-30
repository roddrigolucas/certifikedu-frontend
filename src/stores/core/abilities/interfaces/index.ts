import { CategoriesType, IAbility } from '@/services/entities/app/core/abilities/model';

export interface AbilitieState {
  abilities: IAbility | null;
  categories: CategoriesType | null;
  updateAbilities: (abilities: IAbility) => void;
  allCategories: (categories: CategoriesType) => void;
  reset: () => void;
}
