import { CheckCircle, ImageIcon } from 'lucide-react';

import DocumentDropzone from '@/pages/App/Core/Account/UploadDocument/UploadImage';
import { ApplicationLayout } from '@/components/layouts/app';
import { BackButton } from '@/components/shared/BackButton';

import useProfile from '@/hooks/core/useProfile';

import { getImageUrl } from '@/utils/image';

const UploadDocumentPage = () => {
  const { profileInfo } = useProfile();

  const isReview = profileInfo?.pictureStatus === null;

  return (
    <ApplicationLayout
      icon={ImageIcon}
      title="Envio de Documento"
      description="Envie um documento de comprovação da sua identidade. Esse passo é importante
    para trazer mais segurança aos seus dados."
    >
      <div className="space-y-3">
        <BackButton />
        {isReview && <DocumentDropzone />}
        {!isReview && (
          <>
            <div className="flex cursor-pointer flex-col items-center gap-2 text-center">
              <img
                src={getImageUrl('images/empty/searchColor.svg')}
                alt="gallery"
                className="size-48"
              />
              <div className="inline-flex gap-2">
                <h5 className="text-lg font-bold">Seu documento foi recebido</h5>
                <CheckCircle color="emerald" />
              </div>
              <h5 className="text-md font-bold"></h5>
            </div>
            <p className="mx-auto text-base text-slate-600 ">
              {' '}
              Em até 2 dias úteis, nosso time irá te responder.
            </p>
          </>
        )}
      </div>
    </ApplicationLayout>
  );
};
export default UploadDocumentPage;
