import { UseFormReturn } from 'react-hook-form';

import { CourseSchemaNaturalPersonType } from '@/pages/App/NaturalPerson/Courses/View/validation/schema';

import { ITemplate } from '@/services/entities/app/naturalPerson/templates/model';

export interface CardHeaderProps {
  item: Omit<ITemplate, 'abilities'>;
}

export interface ICardsSectionProps {
  form: UseFormReturn<CourseSchemaNaturalPersonType>;
}

export interface ICardsFilterProps {
  form?: UseFormReturn<CourseSchemaNaturalPersonType>;
  filterProps: any;
  filteredItemsCount: number;
}

export interface CardsSectionPropsPosts {
  form: UseFormReturn<CourseSchemaNaturalPersonType>;
}

export interface TransformedTemplate extends Omit<ITemplate, 'abilities'> {
  abilitiesText: string;
}
