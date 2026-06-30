import { useEffect } from 'react';

import { useLocation } from 'react-router-dom';

export const ScrollUp = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    }, 125);
  }, [pathname]);

  return null;
};
