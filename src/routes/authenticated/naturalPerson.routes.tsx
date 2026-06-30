import { AnimatePresence } from 'framer-motion';
import { Route, useLocation } from 'react-router-dom';

import { pagePaths } from '@/constants/navigation/pagePaths';

import {
  CertificateReceivePage,
  CertificateSharePage,
  CertificateShareViewPage,
} from '@/pages/App/Core/Certificates';
import RedirectLinkedin from '@/pages/App/Core/Certificates/Share/LinkedinOgTags';
import DocumentationCard from '@/pages/App/Core/Docs';
import ProfilePageRaw from '@/pages/Authentication/UserRaw/Profile';
import { ScrollUp } from '@/components/core/atoms/ScrollUp';

import useProfile from '@/hooks/core/useProfile';

import { SentryRoutes } from '@/lib/sentry';

import { AdminRoutes } from './admin.routes';
import { CorporateRoutes } from './naturalPerson/corporatePerson/corporate.routes';
import { LegalPersonRoutes } from './naturalPerson/legalPerson/legalPersonRoutes';
import { NaturalPersonRoutes } from './naturalPerson/naturalPersonRoutes';

export const NaturalPersonApplication = () => {
  const { authenticated, unauthenticated } = pagePaths;
  const { isAdmin, isNaturalPerson, selectedPJ, isRawUser, isAdminSelected, selectedCorporate } =
    useProfile();
  const location = useLocation();

  return (
    <>
      <ScrollUp />
      <AnimatePresence mode="wait">
        <SentryRoutes location={location} key={location.pathname}>
          <Route path={unauthenticated.docs} element={<DocumentationCard />} />
          <Route path={authenticated.certificates.receive} element={<CertificateReceivePage />} />
          <Route
            path={'/users/:userId/certificates/:certificateId/:hash'}
            element={<RedirectLinkedin />}
          />

          <Route path={authenticated.certificates.share} element={<CertificateSharePage />} />
          <Route
            path={authenticated.certificates.shareView}
            element={<CertificateShareViewPage />}
          />
          {!isRawUser && (
            <>
              {isNaturalPerson && !!selectedPJ ? (
                <Route path="/*" element={<LegalPersonRoutes />} />
              ) : (
                <>
                  {/* Admin */}
                  {isAdmin && isAdminSelected && <Route path="/*" element={<AdminRoutes />} />}
                  {!!selectedCorporate && !isAdminSelected && (
                    <Route path="/*" element={<CorporateRoutes />} />
                  )}
                  {/* Natural Person */}
                  <Route path="/*" element={<NaturalPersonRoutes />} />
                </>
              )}
            </>
          )}
          {isRawUser && (
            <>
              <Route path="*" element={<ProfilePageRaw />} />
            </>
          )}
        </SentryRoutes>
      </AnimatePresence>
    </>
  );
};
