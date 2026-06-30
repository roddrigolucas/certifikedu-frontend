import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { ProfileState } from './interfaces';

const initialState = {
  selectedPJ: null,
  isCanvas: null,
  selectedCorporate: null,
  profileInfo: null,
  profilePJ: null,
  profileData: null,
  profileCredits: null,
  profileCards: null,
};

export const useProfileStore = create<ProfileState>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,
        setProfileResponse: (response) =>
          set({
            profileInfo: response.userInfo,
            profileData: response.userData,
            profileCredits: response.userCredits,
            profileCards: response.userCards,
          }),
        updateSpecificProfileInfo: (response) =>
          set((state) => ({
            profileInfo: { ...state.profileInfo, ...response },
          })),
        updateProfilePJ: (info) => set({ profilePJ: info }),
        updateIsCanvas: (isCanvas) => set({ isCanvas: isCanvas }),
        updateSelectedPJ: (pjId) => set({ selectedPJ: pjId }),
        updateSelectedCorporate: (pjIdCorp) => set({ selectedCorporate: pjIdCorp }),
        updateProfileInfo: (info) => set({ profileInfo: info }),
        updateProfileData: (data) => set({ profileData: data }),
        updateProfileCredits: (credits) => set({ profileCredits: credits }),
        updateProfileCards: (cards) => set({ profileCards: cards }),
        reset: () => set(initialState),
      }),
      { name: 'profileStore' },
    ),
  ),
);
