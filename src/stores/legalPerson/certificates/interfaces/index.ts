import { ICertificate } from '@/services/entities/app/legalPerson/certificates/model';

export interface CertificateState {
  lastCertificates: ICertificate[] | null;
  updateLastCertificates: (certificates: ICertificate[]) => void;
  certificates: LimitData;
  setPageCertificates: (page: number, limit: number, data: ICertificate[]) => void;
  getPageCertificates: (page: number, limit: number) => ICertificate[] | undefined;
  reset: () => void;
}

export interface LimitData {
  [limit: number]: PaginationData;
}
interface PaginationData {
  [page: number]: ICertificate[];
}
