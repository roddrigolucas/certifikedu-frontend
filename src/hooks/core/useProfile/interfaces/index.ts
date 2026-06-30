import { UseQueryResult } from '@tanstack/react-query';

import { IPropsImage } from '@/pages/App/NaturalPerson/Certificates/Template/Interal';

import { IPDIResponse } from '@/services/entities/app/core/pdi/model';
import { JobOpportunity } from '@/services/entities/app/corporatePerson/jobOpportunity/types';
import { IProfilePJInfo } from '@/services/entities/app/legalPerson/naturalPerson/types';
import { ISchool } from '@/services/entities/app/legalPerson/school/model';
import { IStudent } from '@/services/entities/app/legalPerson/students/model';
import {
  ILegalInstitutionsProfile,
  IProfileCard,
  IProfileCredits,
  IProfileData,
  IProfileInfo,
} from '@/services/entities/app/naturalPerson/profile/model';
import { IProfileResponse } from '@/services/entities/app/naturalPerson/profile/types';

export interface ProfileContextType {
  isLoading: boolean;
  isLoadingPJ: boolean;
  isAdmin: boolean;
  isCanvas: string | null;
  isAdminSelected: boolean;
  setIsAdminSelected: React.Dispatch<React.SetStateAction<boolean>>;

  isLegalPerson: boolean;
  isNaturalPerson: boolean;
  isUserEnabled: boolean;
  isEnoughBalance: boolean;
  schools: UseQueryResult<ISchool[], unknown>;
  students: UseQueryResult<IStudent[], unknown>;
  jobsOpportunity: UseQueryResult<JobOpportunity, unknown>;
  existingPDIs: UseQueryResult<IPDIResponse, unknown>;
  selectedPJ: ILegalInstitutionsProfile | null;
  setSelectedPJ: (id: ILegalInstitutionsProfile | null) => void;
  selectedCorporate: ILegalInstitutionsProfile | null;
  setSelectedCorporate: (id: ILegalInstitutionsProfile | null) => void;
  isRefetchingPJ: () => Promise<UseQueryResult<IProfilePJInfo, unknown>>;
  isRawUser: boolean | undefined;
  profileInfo: IProfileInfo | null;
  profileData: IProfileData | null;
  profileCredits: IProfileCredits | null;
  backgroundImages: UseQueryResult<IPropsImage, unknown>;
  backgroundImagesVerso: UseQueryResult<IPropsImage, unknown>;
  profileCards: IProfileCard[] | null;
  profilePJ: IProfilePJInfo | null;
  UpdateSchools: () => void;
  UpdateCards: () => void;
  UpdateCredits: () => void;
  handleSignOut: () => Promise<void>;
  setProfileResponse: (response: IProfileResponse) => void;
  createdJWTCanvas: UseQueryResult<{ token: string }, unknown>;
}

export interface ProfileProviderProps {
  children: React.ReactNode;
}
