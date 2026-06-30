import { createContext, useContext, useState } from 'react';

import { useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';

import { CANVAS_TOKEN_KEY } from '@/constants/storage/cookieKeys';

import { IPropsImage } from '@/pages/App/NaturalPerson/Certificates/Template/Interal';

import { useCertificatePJStore } from '@/stores/legalPerson/certificates';
import { useProfilePJStore } from '@/stores/legalPerson/profile';
import { useCertificateStore } from '@/stores/naturalPerson/certificates';
import { useProfileStore } from '@/stores/naturalPerson/profile';

import { authenticationService } from '@/services/cognito/authentication';
import { CanvasService } from '@/services/entities/app/canvas';
import { CreditsService, GetUserCreditCards } from '@/services/entities/app/core/credits';
import { PDIService } from '@/services/entities/app/core/pdi';
import { IPDIResponse } from '@/services/entities/app/core/pdi/model';
import { CorporativeService } from '@/services/entities/app/corporatePerson/jobOpportunity';
import { JobOpportunity } from '@/services/entities/app/corporatePerson/jobOpportunity/types';
import { CertificateService } from '@/services/entities/app/legalPerson/certificates';
import { NaturalPersonService } from '@/services/entities/app/legalPerson/naturalPerson';
import { IProfilePJInfo } from '@/services/entities/app/legalPerson/naturalPerson/types';
import { SchoolService } from '@/services/entities/app/legalPerson/school';
import { StudentService } from '@/services/entities/app/legalPerson/students';
import { IStudent } from '@/services/entities/app/legalPerson/students/model';
import { GetProfilePF } from '@/services/entities/app/naturalPerson/profile';
import { EUserStatus } from '@/services/entities/app/naturalPerson/profile/enums';
import {
  ILegalInstitutionsProfile,
  IProfileCard,
} from '@/services/entities/app/naturalPerson/profile/model';
import { IProfileResponse } from '@/services/entities/app/naturalPerson/profile/types';

import useAuthentication from '../useAuthentication';
import { manageAccessToken } from '../useAuthentication/token';
import useRequestProcessor from '../useRequest';
import { ProfileContextType, ProfileProviderProps } from './interfaces';

export const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider = ({ children }: ProfileProviderProps) => {
  const {
    reset,
    profileInfo,
    profilePJ,
    profileData,
    profileCredits,
    profileCards,
    setProfileResponse,
    updateProfilePJ,
    updateProfileCards,
  } = useProfileStore();
  const { user, setUser } = useAuthentication();
  const profile = useProfileStore();

  const certificates = useCertificateStore();
  const profileLegalPerson = useProfilePJStore();
  const certificatesLegalPerson = useCertificatePJStore();
  const requestProcessor = useRequestProcessor();
  const [isAdminSelected, setIsAdminSelected] = useState(false);

  const [searchParameters] = useSearchParams();

  const token = searchParameters.get('Canvas-Token');

  const createdJWT = useRequestProcessor().query(
    ['canvas-token', token],
    async () => await CanvasService.CreateTokenTemp(token ?? ''),
    {
      enabled: !!token,
      onSuccess: (data: { token: string }) => {
        manageAccessToken.setValue(
          CANVAS_TOKEN_KEY,
          data?.token ?? '',
          'https://exp.instructure.com',
        );
        profile.updateIsCanvas(data?.token);
      },
      onError: () => {
        profile.updateIsCanvas(null);

        toast.error('Erro ao realizar o login na plataforma CertifikEDU - Canvas');
      },
    },
  );

  const { isFetching: isLoading } = requestProcessor.query<IProfileResponse>(
    ['profile'],
    async () => await GetProfilePF(),
    {
      enabled: !!user,
      onSuccess: (profile: IProfileResponse) => {
        setProfileResponse(profile);
      },
      onError: () => {
        reset();
      },
    },
  );

  const page = '1';
  const limit = '1000';
  const students = requestProcessor.query<IStudent[]>(
    ['students', `PJ: ${profile.selectedPJ?.pjId}`],
    async () => await StudentService.GetStudents(profile.selectedPJ?.pjId ?? '', { page, limit }),
    {
      enabled: !!user && !!profile.selectedPJ,
      onError: (error: any) => {
        toast.error(`${error}`);
      },
    },
  );

  const jobsOpportunity = requestProcessor.query<JobOpportunity>(
    ['jobs', `PJ: ${profile.selectedCorporate?.pjId}`],
    async () => await CorporativeService.GetProfileInfo(profile.selectedCorporate?.pjId ?? ''),
    {
      enabled: !!user && !!profile.selectedCorporate,
      onError: (error: any) => {
        toast.error(`${error}`);
      },
    },
  );

  const existingPDIs = requestProcessor.query<IPDIResponse>(
    ['PDI'],
    async () => await PDIService.GetPDIs(),
    {
      enabled: !!user,
      onError: (error: any) => {
        toast.error(`${error}`);
      },
    },
  );

  const backgroundImages = useRequestProcessor().query<IPropsImage>(
    !!profile.isCanvas ? ['Canvas_BG'] : [`Images`, `PJ: ${profile.selectedPJ?.pjId}`],
    async () =>
      !!createdJWT.data
        ? await CanvasService.GetPrivateBGImage(createdJWT.data?.token ?? '')
        : await CertificateService.GetPrivateBGImage(profile.selectedPJ?.pjId ?? ''),
    {
      enabled: (!!user && !!profile.selectedPJ) || !!createdJWT.data,
      onError: (error: any) => {
        toast.error(`${error}`);
      },
    },
  );

  const backgroundImagesVerso = useRequestProcessor().query<IPropsImage>(
    [`ImagesVerso`, `PJ: ${profile.selectedPJ?.pjId}`],
    async () => await CertificateService.GetBgVersoImage(profile.selectedPJ?.pjId ?? ''),
    {
      enabled: !!user && !!profile.selectedPJ,
      onError: (error: any) => {
        toast.error(`${error}`);
      },
    },
  );

  const { isFetching: isLoadingPJ, refetch: isRefetchingPJ } =
    requestProcessor.query<IProfilePJInfo>(
      ['profilePJ', profile.selectedPJ?.pjId],
      async () => await NaturalPersonService.GetProfileInfo(profile.selectedPJ?.pjId ?? ''),
      {
        enabled: !!user && !!profile.selectedPJ,
        onSuccess: (profilePJ: IProfilePJInfo) => {
          updateProfilePJ(profilePJ);
        },
        onError: () => {
          reset();
        },
      },
    );

  const schools = requestProcessor.query(
    ['schools', `PJ: ${profile.selectedPJ?.pjId}`],
    async () => await SchoolService.GetSchools(profile.selectedPJ?.pjId ?? ''),
    {
      enabled: !!user && !!profile.selectedPJ,
      onError: (error: any) => {
        toast.error(`${error}`);
      },
    },
  );

  const { mutate: updateCards } = requestProcessor.mutate<IProfileCard[]>(
    ['profile'],
    async () => await GetUserCreditCards(),
  );

  const { mutate: updateCreditsM } = requestProcessor.mutate<IProfileResponse>(
    ['profileNew'],
    async () => await GetProfilePF(),
  );

  const { mutate: updateSchools } = requestProcessor.mutate(
    ['schools', `PJ: ${profile.selectedPJ?.pjId}`],
    async () => await SchoolService.GetSchools(profile.selectedPJ?.pjId ?? ''),
  );

  const UpdateSchools = () => {
    updateSchools(undefined, {});
  };

  const UpdateCards = () => {
    updateCards(undefined, {
      onSuccess: async (cards: IProfileCard[]) => {
        if (cards.length === 1) {
          await CreditsService.SetDefaultCreditCard(cards[0]?.cardId);
          const updatedCard: IProfileCard = {
            ...cards[0],
            isDefault: true,
          };
          updateProfileCards([updatedCard]);
        } else {
          updateProfileCards(cards);
        }
      },
    });
  };

  const UpdateCredits = () => {
    updateCreditsM(undefined, {
      onSuccess: (data: IProfileResponse) => {
        setProfileResponse(data);
      },
    });
  };

  const handleSignOut = async () => {
    setUser(undefined);
    setIsAdminSelected(false);

    profile.reset();
    certificates.reset();
    profileLegalPerson.reset();
    certificatesLegalPerson.reset();
    await authenticationService.signOut();
  };

  const isUserEnabled =
    profileInfo?.status === EUserStatus.ENABLED || profileInfo?.status === EUserStatus.ADMIN;

  const isNaturalPerson = profileInfo?.type === 'PF' && (profileInfo?.pjs?.length ?? 0) > 0;

  const balance = profileCredits?.monthSpentCredits ?? 0;
  const total =
    (profileCredits?.certificateCredits ?? 0) + (profileCredits?.additionalCertificateCredits ?? 0);

  const isEnoughBalance = balance < total;
  const isAdmin = profileInfo?.status === EUserStatus.ADMIN;
  const isLegalPerson = profileInfo?.type === 'PJ';

  const isRawUser = profileInfo?.isRaw;

  const contextValue = {
    isLoading,
    isLoadingPJ,
    isEnoughBalance,
    isAdmin,
    isAdminSelected,
    students,
    setIsAdminSelected,
    isLegalPerson,
    isUserEnabled,
    profileInfo,
    profilePJ,
    profileData,
    profileCredits,
    profileCards,
    isNaturalPerson,
    schools,
    isRawUser,
    isRefetchingPJ,
    jobsOpportunity,
    selectedCorporate: profile.selectedCorporate,
    setSelectedCorporate: (id: ILegalInstitutionsProfile | null) =>
      profile.updateSelectedCorporate(id),
    selectedPJ: profile.selectedPJ,
    setSelectedPJ: (id: ILegalInstitutionsProfile | null) => profile.updateSelectedPJ(id),
    setProfileResponse,
    UpdateSchools,
    UpdateCards,
    UpdateCredits,
    handleSignOut,
    backgroundImages,
    isCanvas: profile.isCanvas,
    createdJWTCanvas: createdJWT,
    existingPDIs,
    backgroundImagesVerso,
  };

  return <ProfileContext.Provider value={contextValue}>{children}</ProfileContext.Provider>;
};

const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfileContext must be used within a ProfileProvider');
  }

  return context;
};

export default useProfile;
