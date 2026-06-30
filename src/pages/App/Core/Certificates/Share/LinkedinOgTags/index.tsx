/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

export default function RedirectLinkedin() {
  const navigate = useNavigate();
  const { hash } = useParams();

  useEffect(() => {
    navigate(`/certificates/share/${hash}`, { replace: true });
  }, []);

  return null;
}
