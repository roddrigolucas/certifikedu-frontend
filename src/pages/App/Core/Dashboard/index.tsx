import { AirplayIcon, ArrowUpDownIcon, ClipboardCheckIcon, Eye, FileBadgeIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { ApplicationLayout } from '@/components/layouts/app';
import { CardInformation } from '@/components/pages/Authentication/CardInformation';
import { AlertAdmin } from '@/components/shared/Alerts/AlertAdmin';
import { AlertCertificates } from '@/components/shared/Alerts/AlertCertificates';
import { AlertDocumentPicture } from '@/components/shared/Alerts/AlertDocumentPicture';
import { Button } from '@/components/shared/ui/button';

import useCertificate from '@/hooks/core/useCertificate';
import useProfile from '@/hooks/core/useProfile';
import { useCertificateStore } from '@/stores/naturalPerson/certificates';

import { getImageUrl } from '@/utils/image';
import { buildCertificatesPageUrl } from '@/utils/url';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default function DashboardPage() {
  const { isLoading, isUserEnabled, profileCredits, profileInfo } = useProfile();
  const { lastCertificates } = useCertificateStore();
  const {
    isLoading: isCertificatesLoading,
    isError,
    lastCertificatesData: certificates,
  } = useCertificate();

  const totalCertificates = profileCredits
    ? profileCredits.certificateCredits + profileCredits.additionalCertificateCredits
    : 0;

  return (
    <ApplicationLayout icon={AirplayIcon} title="Meu Painel" isPageLoading={isLoading}>
      <div className="flex flex-col gap-4">
        {!isUserEnabled && <AlertDocumentPicture />}
        <AlertAdmin />

        {totalCertificates > 0 && <AlertCertificates totalCertificates={totalCertificates} />}
      </div>

      <div className=" grid w-full gap-4 lg:flex lg:gap-8">
        <CardInformation
          title="Certificados Recebidos"
          value={profileInfo?.receivedCertificateQty?.toString()}
          icon={ArrowUpDownIcon}
          isLoading={isLoading}
          isError={isError}
        />
        <CardInformation
          title="Certificados Autoemitidos"
          value={profileInfo?.emmitedCertificateQty?.toString()}
          icon={FileBadgeIcon}
          isLoading={isLoading}
          isError={isError}
        />
        <CardInformation
          title="Plano Atual"
          value={profileCredits?.plan}
          icon={ClipboardCheckIcon}
          isLoading={isLoading}
          isError={isError}
        />
      </div>
      <div className="mt-8 flex flex-col gap-4">
        <div className="flex w-full flex-col gap-6 rounded-xl border-2 p-6">
          <div className="flex gap-8">
            <h2 className="text-xl font-bold">Certificados Recentes</h2>
            <Link to={buildCertificatesPageUrl()}>
              <Button variant="outline" className="p-4 text-base" size="sm">
                Ver Todos
              </Button>
            </Link>
          </div>
          {isCertificatesLoading ? (
            <div className="h-64 animate-pulse rounded-lg bg-gray-100" />
          ) : (
            <div>
              <Swiper
                modules={[Autoplay, Navigation]}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                spaceBetween={24}
                loop={(certificates?.length ?? 0) > 3}
                grabCursor={true}
                breakpoints={{
                  320: {
                    slidesPerView: 1.2,
                    spaceBetween: 10,
                  },
                  640: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                  },
                  1024: {
                    slidesPerView: Math.min(3, certificates?.length ?? 1),
                    spaceBetween: 24,
                  },
                }}
              >
                {certificates?.map((certificate: any, index: number) => (
                  <SwiperSlide
                    key={index}
                    style={{
                      width: '33%',
                    }}
                  >
                    <div
                      key={index}
                      className="group relative cursor-pointer overflow-hidden rounded-lg 
                    border-[2px] p-1 min-[1500px]:h-56 min-[1800px]:h-72"
                    >
                      <img
                        alt="Certificate"
                        src={getImageUrl(certificate.certificatePicture)}
                        className="h-auto w-full transition-all duration-300 group-hover:blur-sm"
                      />
                      <div
                        className="
                        absolute inset-0 
                        flex                        
                        items-center                 
                        justify-center bg-black/40 opacity-0 
                        backdrop-blur-sm transition-opacity  
                        duration-300 group-hover:opacity-100
                    "
                      >
                        <div className="flex flex-col items-center justify-center p-4 text-white">
                          <h3 className="text-center text-lg font-semibold">
                            {certificate.certificateName || 'CertifikEdu - Eu Faço Parte'}
                          </h3>

                          <div className="mt-4 flex gap-8 text-sm text-gray-200">
                            <div>
                              <p className="font-light opacity-80">DATA DE EMISSÃO</p>
                              <p className="font-medium">{certificate.certificateCreatedAt}</p>
                            </div>
                            <div>
                              <p className="font-light opacity-80">EMITIDO POR</p>
                              <p className="font-medium">
                                {certificate.statedIssuer || 'Autoemitido'}
                              </p>
                            </div>
                          </div>

                          <div className="mt-6 rounded-full bg-white p-3 text-gray-800 shadow-lg">
                            <Link to={`/certificates/view/${certificate.certificateId}`}>
                              <Eye size={20} className="size-5" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
                {lastCertificates && lastCertificates.length <= 0 && (
                  <div className="flex w-full items-center justify-center">
                    <h2 className="fontbold text-xl"> Não há certificados</h2>
                  </div>
                )}
              </Swiper>
            </div>
          )}
        </div>
      </div>
    </ApplicationLayout>
  );
}
