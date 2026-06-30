import { useState } from 'react';

import { Button } from '@/components/shared/ui/button';

import {
  ICertificateResponse,
  IResumeEducationResponse,
} from '@/services/entities/app/core/resume/model';

import { getImageUrl } from '@/utils/image';

import { EducationType } from '../../CreateOrUpdate/validation/schema';

const isICertificateArray = (
  certificates: string[] | ICertificateResponse[],
): certificates is ICertificateResponse[] => {
  return (certificates as ICertificateResponse[])[0]?.certificateId !== undefined;
};

export function EducationItem({
  education,
}: {
  education: IResumeEducationResponse | EducationType;
}) {
  const [showImage, setShowImage] = useState<string | null>(null);

  const {
    title,
    description,
    startYear,
    startMonth,
    endYear,
    endMonth,
    institutionName,
    institutionCnpj,
    institutionLocation,
    institutionEmail,
    institutionPhone,
    certificates,
  } = education;

  const startDate = `${startMonth}/${startYear}`;
  const endDate = endYear && endMonth ? `${endMonth}/${endYear}` : 'Presente';

  return (
    <div className="border-b pb-4">
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-sm text-gray-600">
        {institutionName} • {startDate} - {endDate}
      </p>
      {institutionLocation && <p className="mt-2">{institutionLocation}</p>}
      {institutionEmail && <p className="mt-2">{institutionEmail}</p>}
      {institutionPhone && <p className="mt-2">{institutionPhone}</p>}
      {institutionCnpj && <p className="mt-2">{institutionCnpj}</p>}
      {description && <p className="mt-2 whitespace-pre-line">{description}</p>}
      {certificates.length > 0 && (
        <div className="mt-2">
          <p className="font-semibold">Certificados atrelados à formação:</p>
          <div className="mt-2 flex flex-wrap gap-4">
            {isICertificateArray(certificates) &&
              certificates.map((cert) => (
                <div key={cert.certificateId}>
                  {cert.picture && (
                    <div>
                      <img
                        src={getImageUrl(cert.picture)}
                        alt={cert.name}
                        className="size-16 cursor-pointer object-cover"
                        onClick={() => setShowImage(cert.picture || '')}
                      />
                      {showImage === cert.picture && (
                        <div className="bg-opacity/75 fixed inset-0 z-50 flex items-center justify-center bg-black">
                          <div className="relative">
                            <Button
                              variant={'destructive'}
                              className="absolute right-2 top-2 text-white"
                              onClick={() => setShowImage(null)}
                            >
                              Fechar
                            </Button>
                            <img
                              src={getImageUrl(cert.picture)}
                              alt={cert.name}
                              className="max-w-screen max-h-screen"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
