import React from 'react';

import { FaLinkedin } from 'react-icons/fa';

import { Button } from '@/components/shared/ui/button';

interface LinkedInButtonProps {
  certificationName: string;
  organizationId: number;
  issueYear: number;
  issueMonth: number;
  expirationYear: number;
  expirationMonth: number;
  certUrl: string;
  certId: string;
}

const LinkedInButton: React.FC<LinkedInButtonProps> = ({
  certificationName,
  organizationId,
  issueYear,
  issueMonth,
  expirationYear,
  expirationMonth,
  certUrl,
  certId,
}) => {
  const encodedCertUrl = encodeURIComponent(certUrl);

  const linkedInUrl = `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${encodeURIComponent(certificationName)}&organizationId=${encodeURIComponent(organizationId)}&issueYear=${issueYear}&issueMonth=${issueMonth}&expirationYear=${expirationYear}&expirationMonth=${expirationMonth}&certUrl=${encodedCertUrl}&certId=${certId}`;

  const openLinkedIn = () => {
    window.open(linkedInUrl, '_blank');
  };

  return (
    <Button
      size={'sm'}
      className="gap-2 bg-blue-600 text-white hover:bg-blue-800 hover:text-white"
      variant="outline"
      onClick={openLinkedIn}
    >
      <FaLinkedin className="-ml-3 size-7" />
      Adicionar ao LinkedIn
    </Button>
  );
};

export default LinkedInButton;
