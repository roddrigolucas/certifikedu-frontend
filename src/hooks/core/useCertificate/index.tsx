import { createContext, useContext } from 'react';

import { useSearchParams } from 'react-router-dom';

import { useCertificateStore } from '@/stores/naturalPerson/certificates';

import { CertificateService } from '@/services/entities/app/naturalPerson/certificates';
import { ICertificate } from '@/services/entities/app/naturalPerson/certificates/model';

import { getImageUrl } from '@/utils/image';

import useAuthentication from '../useAuthentication';
import useRequestProcessor from '../useRequest';
import { CertificateContextType, CertificateProviderProps } from './interfaces';

export const CertificateContext = createContext<CertificateContextType | undefined>(undefined);

export const CertificateProvider = ({ children }: CertificateProviderProps) => {
  const { updateLastCertificates, certificates, setPageCertificates, getPageCertificates } =
    useCertificateStore();
  const { user } = useAuthentication();

  const [searchParameters] = useSearchParams();

  const page = searchParameters.get('page') ?? '1';
  const limit = searchParameters.get('limit') ?? '500';

  const checkImageExistence = (url: string): Promise<boolean> => {
    return new Promise((resolve) => {
      const img = new Image();
      // Se carregar com sucesso, resolve para true
      img.onload = () => resolve(true);
      // Se der erro (404, etc.), resolve para false
      img.onerror = () => resolve(false);

      // Define a URL para iniciar o carregamento
      img.src = url;

      // Timeout de segurança caso a requisição demore demais ou fique pendurada
      setTimeout(() => {
        resolve(false);
      }, 5000); // 5 segundos de timeout
    });
  };

  const lastCertificatesState = useRequestProcessor().query<ICertificate[]>(
    ['last-certificates'],
    async () => {
      const certificates = await CertificateService.GetCertificates({ page, limit });
      const checks = certificates.map(async (cert) => {
        const imageUrl = getImageUrl(cert.certificatePicture);

        const exists = await checkImageExistence(imageUrl);

        return { certificate: cert, exists };
      });

      const results = await Promise.all(checks);

      const validCertificates = results
        .filter((item) => item.exists)
        .map((item) => item.certificate);

      return validCertificates;
    },
    {
      enabled: !!user,
      onSuccess: (validCertificates: ICertificate[]) => {
        // Agora, validCertificates já está limpo
        // O onSuccess volta a ser síncrono e instantâneo
        updateLastCertificates(validCertificates);
      },
      onError: () => {},

      staleTime: 0,
      retry: 2,
      refetchOnWindowFocus: false,
    },
  );

  const contextValue = {
    lastCertificatesState,
    lastCertificatesData: lastCertificatesState.data,
    isLoading: lastCertificatesState.isLoading,
    isError: lastCertificatesState.isError,
    updateLastCertificates,
    certificates,
    setPageCertificates,
    getPageCertificates,
    refetch: () => {
      lastCertificatesState.refetch();
    },
  };

  return <CertificateContext.Provider value={contextValue}>{children}</CertificateContext.Provider>;
};

const useProfile = () => {
  const context = useContext(CertificateContext);
  if (!context) {
    throw new Error('useCertificateContext must be used within a CertificateProvider');
  }

  return context;
};

export default useProfile;
