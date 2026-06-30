import { IProfilePJInfo } from '@/services/entities/app/legalPerson/naturalPerson/types';
import {
  ILegalInstitutionsProfile,
  IProfileCard,
  IProfileCredits,
  IProfileData,
  IProfileInfo,
} from '@/services/entities/app/naturalPerson/profile/model';
import { IProfileResponse } from '@/services/entities/app/naturalPerson/profile/types';

export interface ProfileState {
  profileInfo: IProfileInfo | null;
  profilePJ: IProfilePJInfo | null;
  selectedCorporate: ILegalInstitutionsProfile | null;
  selectedPJ: ILegalInstitutionsProfile | null;
  isCanvas: string | null;
  profileData: IProfileData | null;
  profileCredits: IProfileCredits | null;
  profileCards: IProfileCard[] | null;
  setProfileResponse: (response: IProfileResponse) => void;
  updateProfilePJ: (info: IProfilePJInfo) => void;
  updateIsCanvas: (isCanvas: string | null) => void;
  updateSelectedPJ: (pjId: ILegalInstitutionsProfile | null) => void;
  updateSelectedCorporate: (pjId: ILegalInstitutionsProfile | null) => void;
  updateProfileInfo: (info: IProfileInfo) => void;
  updateSpecificProfileInfo: (dataResponse: IProfileInfo) => void;
  updateProfileData: (data: IProfileData) => void;
  updateProfileCredits: (credits: IProfileCredits) => void;
  updateProfileCards: (cards: IProfileCard[]) => void;
  reset: () => void;
}
