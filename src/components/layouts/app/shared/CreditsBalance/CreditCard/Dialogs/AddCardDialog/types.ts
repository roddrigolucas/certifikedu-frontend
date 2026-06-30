import { IProfileCard } from '@/services/entities/app/naturalPerson/profile/model';

type DefaultProps = {
  trigger: React.ReactNode;
};

type ConditionalProps =
  | {
      mode?: 'add';
      card?: never;
    }
  | {
      mode?: 'edit';
      card: IProfileCard;
    };

export type AddCardDialogProps = DefaultProps & ConditionalProps;
