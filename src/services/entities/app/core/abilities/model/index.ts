export interface IAbilityDetail {
  habilidade: string;
  habilidadeId: string;
}

export interface IAbility {
  [tema: string]: IAbilityDetail[];
}

export type CategoriesType = Array<string>;

export interface IAbilityResponse {
  tema: string;
  habilidade: string;
  habilidadeId: string;
}
