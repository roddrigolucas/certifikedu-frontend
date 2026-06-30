import { IAbility, IAbilityResponse } from '@/services/entities/app/core/abilities/model';

export function groupAbilitiesByTema(abilities: IAbilityResponse[]): IAbility {
  const grouped = abilities.reduce(
    (acc, ability) => {
      if (!acc[ability.tema]) {
        acc[ability.tema] = [];
      }
      acc[ability.tema].push({
        habilidade: ability.habilidade,
        habilidadeId: ability.habilidadeId,
      });

      return acc;
    },
    {} as Record<string, Array<{ habilidade: string; habilidadeId: string }>>,
  );

  return grouped;
}
