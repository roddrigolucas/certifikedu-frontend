import { UseQueryResult } from '@tanstack/react-query';

import { LimitData } from '@/stores/legalPerson/certificates/interfaces';

import { ICertificate } from '@/services/entities/app/legalPerson/certificates/model';

export interface CertificateContextTypePJ {
  isLoading: boolean;
  setIsCanvasCertificates: (value: boolean) => void;
  isError: boolean;
  lastCertificatesState: UseQueryResult<ICertificate[], unknown>;
  lastCertificatesStateCanvas: UseQueryResult<ICertificate[], unknown>;
  updateLastCertificates: (certificates: ICertificate[]) => void;
  certificates: LimitData;
  setPageCertificates: (page: number, limit: number, data: ICertificate[]) => void;
  getPageCertificates: (page: number, limit: number) => ICertificate[] | undefined;
  refetch: () => void;
}

export interface CertificateProviderPropsPJ {
  children: React.ReactNode;
}
