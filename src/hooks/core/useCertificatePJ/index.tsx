import { createContext, useContext, useState } from 'react';

import { useSearchParams } from 'react-router-dom';

import { useCertificatePJStore } from '@/stores/legalPerson/certificates';
import { useProfileStore } from '@/stores/naturalPerson/profile';

import { CanvasService } from '@/services/entities/app/canvas';
import { CertificateService } from '@/services/entities/app/legalPerson/certificates';
import { ICertificate } from '@/services/entities/app/legalPerson/certificates/model';

import useAuthentication from '../useAuthentication';
import useRequestProcessor from '../useRequest';
import { CertificateContextTypePJ, CertificateProviderPropsPJ } from './interfaces';

export const CertificateContext = createContext<CertificateContextTypePJ | undefined>(undefined);

export const CertificateProviderPJ = ({ children }: CertificateProviderPropsPJ) => {
  const { updateLastCertificates, certificates, setPageCertificates, getPageCertificates } =
    useCertificatePJStore();
  const [isCanvasCertificates, setIsCanvasCertificates] = useState<boolean>(false);

  const profile = useProfileStore();
  const { user } = useAuthentication();

  const [searchParameters] = useSearchParams();

  const page = searchParameters.get('page') ?? '1';
  const limit = searchParameters.get('limit') ?? '500';

  const lastCertificatesState = useRequestProcessor().query<ICertificate[]>(
    ['last-certificatesPJ', `PJ: ${profile.selectedPJ?.pjId}`],
    async () =>
      await CertificateService.GetCertificates(profile?.selectedPJ?.pjId ?? '', { page, limit }),
    {
      enabled: !!user && !!profile.selectedPJ,
      onSuccess: (certificates: ICertificate[]) => {
        updateLastCertificates(certificates);
      },
      onError: () => {},
    },
  );

  const lastCertificatesStateCanvas = useRequestProcessor().query<ICertificate[]>(
    ['canvas-certificates'],
    async () => await CanvasService.GetCertificates(),
    {
      enabled: isCanvasCertificates,
      onSuccess: (certificates: ICertificate[]) => {
        updateLastCertificates(certificates);
      },
    },
  );

  const contextValue = {
    isLoading: lastCertificatesState.isLoading,
    isError: lastCertificatesState.isError,
    lastCertificatesState,
    updateLastCertificates,
    lastCertificatesStateCanvas,
    certificates,
    setPageCertificates,
    getPageCertificates,
    setIsCanvasCertificates,
    refetch: () => {
      lastCertificatesState.refetch();
    },
  };

  return <CertificateContext.Provider value={contextValue}>{children}</CertificateContext.Provider>;
};

const useProfile = () => {
  const context = useContext(CertificateContext);
  if (!context) {
    throw new Error('useCertificateContextPJ must be used within a CertificateProvider');
  }

  return context;
};

export default useProfile;
