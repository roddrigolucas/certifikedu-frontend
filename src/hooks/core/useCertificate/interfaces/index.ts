import { UseQueryResult } from '@tanstack/react-query';

import { LimitData } from '@/stores/naturalPerson/certificates/interfaces';

import { ICertificate } from '@/services/entities/app/naturalPerson/certificates/model';

export interface CertificateContextType {
  isLoading: boolean;
  isError: boolean;
  lastCertificatesState: UseQueryResult<ICertificate[], unknown>;
  lastCertificatesData: any;
  updateLastCertificates: (certificates: ICertificate[]) => void;
  certificates: LimitData;
  setPageCertificates: (page: number, limit: number, data: ICertificate[]) => void;
  getPageCertificates: (page: number, limit: number) => ICertificate[] | undefined;
  refetch: () => void;
}

export interface CertificateProviderProps {
  children: React.ReactNode;
}
