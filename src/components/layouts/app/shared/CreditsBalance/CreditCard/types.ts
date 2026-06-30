import { EBrand } from '@/services/entities/app/core/credits/enums';
import { IProfileCard } from '@/services/entities/app/naturalPerson/profile/model';

export interface CreditCardProps {
  brand: EBrand;
  month: number;
  year: number;
  digits: string;
  card: IProfileCard;
  isDefault?: boolean;
}
