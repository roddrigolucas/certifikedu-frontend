export interface IProfilePJInfo {
  emmitedCertificatesQty: number;
  createdCertificatesQty: number;
  studentsQty: number;
  coursesQty: number;
  schools: {
    schoolId: string;
    schoolName: string;
    emmitedCertificatesQty: number;
    createdCertificatesQty: number;
    studentsQty: number;
    coursesQty: number;
  }[];
}
