import { Navigate, Route } from 'react-router-dom';

import { pagePaths } from '@/constants/navigation/pagePaths';

import { AuthCanvas } from '@/pages/App/Canvas/Auth';
import { CertificateShareViewPage } from '@/pages/App/Core/Certificates';
import CertificateReceivePage from '@/pages/App/Core/Certificates/Receive';
import CertificateSharePage from '@/pages/App/Core/Certificates/Share';
import DocumentationCard from '@/pages/App/Core/Docs';
import { ResetEmailPage } from '@/pages/Authentication/ResetEmail';
import { VerifyNewEmailPage } from '@/pages/Authentication/ResetEmail/ResetEmailVerification';
import { ResetPasswordPage } from '@/pages/Authentication/ResetPassword';
import { SignInPage } from '@/pages/Authentication/SignIn';
import SignUpPage from '@/pages/Authentication/SignUp';
import { UpdatePassword } from '@/pages/Authentication/UpdatePassword';

import useProfile from '@/hooks/core/useProfile';

import { SentryRoutes } from '@/lib/sentry';

import { CanvasRoutes } from './canvas.routes';

export const UnauthenticatedApplication = () => {
  const { unauthenticated, authenticated } = pagePaths;
  const { isCanvas } = useProfile();

  return (
    <SentryRoutes>
      <Route path={unauthenticated.authentication}>
        <Route index element={<Navigate to={unauthenticated.signIn} replace />} />
        <Route path={unauthenticated.signUp} element={<SignUpPage />} />
        <Route index path={unauthenticated.signIn} element={<SignInPage />} />
        <Route path={unauthenticated.updatePassword} element={<UpdatePassword />} />
        <Route path={unauthenticated.resetPassword} element={<ResetPasswordPage />} />
        <Route path={unauthenticated.resetEmail} element={<ResetEmailPage />} />
        <Route path={unauthenticated.verifyEmail} element={<VerifyNewEmailPage />} />
      </Route>
      <Route path={unauthenticated.docs} element={<DocumentationCard />} />
      {/* Certificates */}
      <Route path={unauthenticated.certificates.root}>
        <Route element={<Navigate to={unauthenticated.certificates.share} replace />} />
        <Route path={unauthenticated.certificates.share} element={<CertificateSharePage />} />
        <Route
          path={unauthenticated.certificates.shareView}
          element={<CertificateShareViewPage />}
        />
        <Route path={unauthenticated.certificates.receive} element={<CertificateReceivePage />} />
      </Route>
      <Route path={authenticated.canvas.auth} element={<AuthCanvas />} />
      {!!isCanvas && <Route path="/*" element={<CanvasRoutes />} />}
      <Route path="*" element={<Navigate to={unauthenticated.signIn} />} />
    </SentryRoutes>
  );
};
