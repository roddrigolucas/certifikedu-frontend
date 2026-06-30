import { AnimatePresence } from 'framer-motion';
import { Navigate, Route, useLocation } from 'react-router-dom';

import { pagePaths } from '@/constants/navigation/pagePaths';

import {
  CertificateReceivePage,
  CertificateSharePage,
  CertificateShareViewPage,
} from '@/pages/App/Core/Certificates';
import DocumentationCard from '@/pages/App/Core/Docs';
import CanvasPage from '@/pages/App/LegalPerson/Canvas';
import ProfilePage from '@/pages/App/LegalPerson/Profile';
import ReportsPage from '@/pages/App/LegalPerson/Reports';
import LegalPersonRegisterPage from '@/pages/App/LegalPerson/Users/Register';
import LegalPersonTablePage from '@/pages/App/LegalPerson/Users/View';
import { ScrollUp } from '@/components/core/atoms/ScrollUp';

import { SentryRoutes } from '@/lib/sentry';

export const LegalPersonApplication = () => {
  const { authenticated, unauthenticated } = pagePaths;

  const location = useLocation();

  return (
    <>
      <ScrollUp />
      <AnimatePresence mode="wait">
        <SentryRoutes location={location} key={location.pathname}>
          <Route path={unauthenticated.docs} element={<DocumentationCard />} />
          <Route path={authenticated.certificates.receive} element={<CertificateReceivePage />} />
          <Route path={authenticated.certificates.share} element={<CertificateSharePage />} />
          <Route
            path={authenticated.certificates.shareView}
            element={<CertificateShareViewPage />}
          />
          <Route
            index
            path={authenticated.legalPerson.dashboard}
            element={<LegalPersonTablePage />}
          />
          <Route path={authenticated.legalPerson.users.root} element={<LegalPersonTablePage />} />
          <Route
            path={authenticated.legalPerson.users.create}
            element={<LegalPersonRegisterPage />}
          />
          <Route path={authenticated.legalPerson.reports} element={<ReportsPage />} />
          <Route path={authenticated.legalPerson.profile} element={<ProfilePage />} />
          <Route path={authenticated.legalPerson.canvas} element={<CanvasPage />} />
          <Route
            index
            path={authenticated.dashboard}
            element={<Navigate to={authenticated.legalPerson.dashboard} replace />}
          />
          <Route path="*" element={<Navigate to={authenticated.legalPerson.dashboard} />} />
        </SentryRoutes>
      </AnimatePresence>
    </>
  );
};
