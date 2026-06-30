/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import { pagePaths } from '@/constants/navigation/pagePaths';

import FullscreenLoadingOverlay from '@/components/core/atoms/FullscreenLoadingOverlay';

import useAbilitie from '@/hooks/core/useAbilitie';
import useCertificatePJ from '@/hooks/core/useCertificatePJ';
import useProfile from '@/hooks/core/useProfile';

export const AuthCanvas = () => {
  const navigate = useNavigate();
  const { unauthenticated, authenticated } = pagePaths;
  const { createdJWTCanvas } = useProfile();
  const { setIsCanvasCertificates } = useCertificatePJ();
  const { setIsCanvas } = useAbilitie();

  useEffect(() => {
    if (createdJWTCanvas.isFetched) {
      if (createdJWTCanvas.isSuccess) {
        navigate(authenticated.canvas.dashboard, { replace: true });
        setIsCanvas(true);
        setIsCanvasCertificates(true);
      } else {
        navigate(unauthenticated.signIn, { replace: true });
      }
    }
  }, [createdJWTCanvas]);

  return <FullscreenLoadingOverlay />;
};
