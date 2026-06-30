import { lazy, Suspense, useEffect, useState } from 'react';

import { applyTheme } from '@cloudscape-design/components/theming';

import useAuthentication from '@/hooks/core/useAuthentication';

import FullscreenLoadingOverlay from './components/core/atoms/FullscreenLoadingOverlay';
import useProfile from './hooks/core/useProfile';

const LegalPersonApplication = lazy(() =>
  import('@/routes/authenticated/legalPerson.routes').then(({ LegalPersonApplication }) => ({
    default: LegalPersonApplication,
  })),
);

const NaturalPersonApplication = lazy(() =>
  import('@/routes/authenticated/naturalPerson.routes').then(({ NaturalPersonApplication }) => ({
    default: NaturalPersonApplication,
  })),
);

const UnauthenticatedApplication = lazy(() =>
  import('@/routes/unauthenticated/unauthenticated.routes').then(
    ({ UnauthenticatedApplication }) => ({
      default: UnauthenticatedApplication,
    }),
  ),
);

export const Application = () => {
  const { isAuthenticating, user } = useAuthentication();
  const { isLegalPerson, isLoading: isProfileLoading } = useProfile();
  const [isVisible, setIsVisible] = useState(false);
  const auth = user && user?.challengeName !== `NEW_PASSWORD_REQUIRED`;

  useEffect(() => {
    setIsVisible(isLegalPerson);
  }, [isLegalPerson]);

  useEffect(() => {
    const customWhiteTheme = {
      tokens: {
        colorBorderDividerDefault: { light: '#DCDCDC' }, // Light gray
        colorBorderInputDefault: { light: '#DCDCDC' }, // Light gray
      },
    };
    const { reset } = applyTheme({ theme: customWhiteTheme });

    // Cleanup theme on unmount
    return () => reset();
  }, []);

  if (isAuthenticating || isProfileLoading) {
    return <FullscreenLoadingOverlay />;
  }

  const AuthenticatedApplication = isVisible ? LegalPersonApplication : NaturalPersonApplication;

  return (
    <Suspense fallback={<FullscreenLoadingOverlay />}>
      {auth ? <AuthenticatedApplication /> : <UnauthenticatedApplication />}
    </Suspense>
  );
};
