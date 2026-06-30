import { useState } from 'react';

import { Button } from '@/components/shared/ui/button';

import {
  employmentTypeOptions,
  getResumeLabel,
  ICertificateResponse,
  IResumeExperienceResponse,
  workModelOptions,
} from '@/services/entities/app/core/resume/model';

import { getImageUrl } from '@/utils/image';

import { ExperienceType } from '../../CreateOrUpdate/validation/schema';

const isICertificateArray = (
  certificates: string[] | ICertificateResponse[],
): certificates is ICertificateResponse[] => {
  return (certificates as ICertificateResponse[])[0]?.certificateId !== undefined;
};

export function ExperienceItem({
  experience,
}: {
  experience: IResumeExperienceResponse | ExperienceType;
}) {
  const [showImage, setShowImage] = useState<string | null>(null);

  const {
    title,
    description,
    startYear,
    startMonth,
    endYear,
    endMonth,
    companyName,
    companyCnpj,
    companyLocation,
    companyEmail,
    companyPhone,
    employmentType,
    workModel,
    certificates,
  } = experience;

  const startDate = `${startMonth}/${startYear}`;
  const endDate = endYear && endMonth ? `${endMonth}/${endYear}` : 'Presente';

  return (
    <div className="border-b pb-4">
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-sm text-gray-600">
        {companyName} • {startDate} - {endDate}
      </p>
      {companyLocation && <p className="mt-2">{companyLocation}</p>}
      {companyEmail && <p className="mt-2">{companyEmail}</p>}
      {companyPhone && <p className="mt-2">{companyPhone}</p>}
      {companyCnpj && <p className="mt-2">{companyCnpj}</p>}
      <p className="text-sm text-gray-600">
        {getResumeLabel(employmentType, employmentTypeOptions)} •{' '}
        {getResumeLabel(workModel, workModelOptions)}
      </p>
      {description && <p className="mt-2 whitespace-pre-line">{description}</p>}
      {certificates.length > 0 && (
        <div className="mt-2">
          <p className="font-semibold">Certificados atrelados à experiência:</p>
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
                              variant="destructive"
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
