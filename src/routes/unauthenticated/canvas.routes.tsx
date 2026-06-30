import { Navigate, Route, Routes } from 'react-router-dom';

import { pagePaths } from '@/constants/navigation/pagePaths';

import DashboardCanvasPage from '@/pages/App/Canvas/Dashboard';
import StudentsCanvasPage from '@/pages/App/Canvas/Students';
import { TemplateSharePage } from '@/pages/App/NaturalPerson/Certificates';
import CertificateIssuerPageNaturalPerson from '@/pages/App/NaturalPerson/Certificates/Issuer';
import CertificatesPageNaturalPerson from '@/pages/App/NaturalPerson/Certificates/List';
import CarouselInternalImages from '@/pages/App/NaturalPerson/Certificates/Template/Interal';
import CertificateViewPageNaturalPerson from '@/pages/App/NaturalPerson/Certificates/View';

export const CanvasRoutes = () => {
  const { authenticated } = pagePaths;

  return (
    <Routes>
      <Route index path={authenticated.canvas.dashboard} element={<DashboardCanvasPage />} />
      <Route path="*" element={<Navigate to={authenticated.canvas.dashboard} />} />
      <Route index path={authenticated.canvas.students} element={<StudentsCanvasPage />} />

      <Route
        index
        path={authenticated.canvas.certificates.list}
        element={<CertificatesPageNaturalPerson />}
      />
      <Route
        path={authenticated.canvas.certificates.view}
        element={<CertificateViewPageNaturalPerson />}
      />
      <Route
        path={authenticated.canvas.certificates.create}
        element={<CertificateIssuerPageNaturalPerson />}
      />
      <Route path={authenticated.canvas.template.view} element={<TemplateSharePage />} />
      <Route
        path={authenticated.canvas.template.backgroundImage}
        element={<CarouselInternalImages />}
      />
    </Routes>
  );
};
