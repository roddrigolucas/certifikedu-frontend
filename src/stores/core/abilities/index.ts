import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { AbilitieState } from './interfaces';

const initialState = {
  abilities: null,
  categories: null,
};

export const useAbilitieStore = create<AbilitieState>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,
        updateAbilities: (abilities) => set({ abilities }),
        allCategories: (categories) => set({ categories }),
        reset: () => set(initialState),
      }),
      { name: 'abilitieStore' },
    ),
  ),
);
