import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { CertificateState } from './interfaces';

const initialState = {
  lastCertificates: null,
  certificates: {},
};

export const useCertificatePJStore = create<CertificateState>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,
        updateLastCertificates: (certificates) => set({ lastCertificates: certificates }),
        setPageCertificates: (page, limit, data) =>
          set((state) => ({
            certificates: {
              ...state.certificates,
              [limit]: { ...state.certificates[limit], [page]: data },
            },
          })),
        getPageCertificates: (page, limit) => {
          const state = get();

          return state.certificates[limit]?.[page];
        },
        reset: () => set(initialState),
      }),
      { name: 'certificatePJStore' },
    ),
  ),
);
