import { IProfilePJInfo } from '@/services/entities/app/legalPerson/naturalPerson/types';
import {
  IProfileCard,
  IProfileCredits,
  IProfileData,
  IProfileInfo,
} from '@/services/entities/app/naturalPerson/profile/model';
import { IProfileResponse } from '@/services/entities/app/naturalPerson/profile/types';

export interface ProfileState {
  profileInfo: IProfileInfo | null;
  profilePJ: IProfilePJInfo | null;

  selectedPJ: string;
  profileData: IProfileData | null;
  profileCredits: IProfileCredits | null;
  profileCards: IProfileCard[] | null;
  setProfileResponse: (response: IProfileResponse) => void;
  updateProfilePJ: (info: IProfilePJInfo) => void;
  updateSelectedPJ: (pjId: string) => void;
  updateProfileInfo: (info: IProfileInfo) => void;
  updateSpecificProfileInfo: (dataResponse: IProfileInfo) => void;
  updateProfileData: (data: IProfileData) => void;
  updateProfileCredits: (credits: IProfileCredits) => void;
  updateProfileCards: (cards: IProfileCard[]) => void;
  reset: () => void;
}
