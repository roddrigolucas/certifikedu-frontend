import { useEffect, useMemo } from 'react';

import { QrCode } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

import { useGalleryContext } from '@/hooks/core/useGallery';

import { cn } from '@/utils';

import { CertificateIssuerSchemaNaturalPersonType } from '../validation/schema';

export default function CertificatePreview() {
  const form = useFormContext<CertificateIssuerSchemaNaturalPersonType>();
  const { watch } = form;

  const name = watch('name');
  const descriptionImage = watch('descriptionImage');

  const { fontColor, previewImageUrl, QrCodeImage, hasLogo, imageFile, selectedFont } =
    useGalleryContext();

  const backgroundImageUrl = previewImageUrl || '';

  const isTitleLong = name && name.length > 82;

  const titleSizeClass = isTitleLong ? 'text-xs' : 'text-xl';

  const logoPreviewUrl = imageFile ? URL.createObjectURL(imageFile) : null;

  const selectedFontFamily = selectedFont?.label?.split(' - ')?.[0] || 'serif';

  const fontStyle = {
    color: fontColor || '#000000',
  };

  const fontWithFamilyStyle = {
    ...fontStyle,
    fontFamily: selectedFontFamily,
  };

  const fontWithFamilyStyleTitle = {
    ...fontStyle,
    fontFamily: 'Arial',
  };

  const previewHtml = useMemo(() => {
    if (!descriptionImage) return 'Descrição Interna';

    const boldStyle = 'font-weight: bold; font-style: italic; font-family: Arial;';

    let html = descriptionImage.replace(/<strong>/g, `<strong style="${boldStyle}">`);
    html = html.replace(/<b>/g, `<b style="${boldStyle}">`);

    return html;
  }, [descriptionImage]);

  const qrCodePositionClass = QrCodeImage
    ? {
        TOP_RIGHT: 'top-1 right-24',
        TOP_LEFT: 'top-1 left-24',
        BOTTOM_RIGHT: 'bottom-1 right-24',
        BOTTOM_LEFT: 'bottom-1 left-24',
      }[QrCodeImage]
    : 'top-4 right-4';

  useEffect(() => {
    //console.log(titleSizeClass)
  });

  const LAMBDA_CANVAS_WIDTH = 550;

  return (
    <div className="flex flex-col items-center border-gray-200 p-6">
      <h3 className="mb-4 text-2xl font-bold text-gray-700">Pré-visualização do Certificado</h3>

      <div className="relative aspect-video  max-w-[800px] overflow-hidden rounded-xl border-gray-300">
        {backgroundImageUrl && (
          <img
            src={backgroundImageUrl}
            alt="Fundo do Certificado"
            crossOrigin="anonymous"
            className=" size-full bg-white object-contain"
          />
        )}

        {!backgroundImageUrl && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <p className="font-semibold text-gray-500">
              Selecione um template de imagem de fundo para visualizar.
            </p>
          </div>
        )}

        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-8 text-center">
          <div className="flex w-full max-w-4xl flex-col items-center pt-16 md:pt-10">
            <p
              className={cn(
                'absolute top-[135px] max-w-[40%] italic font-bold transition-colors duration-300 uppercase',
                titleSizeClass,
              )}
              style={fontWithFamilyStyleTitle}
            >
              {name || 'Título'}
            </p>

            <div
              className="relative top-16 mb-4 text-xs leading-relaxed transition-colors duration-300"
              style={{
                ...fontWithFamilyStyle,

                maxWidth: `${LAMBDA_CANVAS_WIDTH * (1 - 0.09)}px`,
                width: '100%',
              }}
              dangerouslySetInnerHTML={{
                __html: previewHtml || `Descrição Interna`,
              }}
            />
          </div>
        </div>

        <div className={cn('absolute transition-all duration-300 z-20', qrCodePositionClass)}>
          <div className="size-full bg-white ">
            <QrCode size={65} className="size-full" />
          </div>
        </div>

        {hasLogo && logoPreviewUrl && (
          <div className="absolute bottom-0 left-1/2 z-20 -translate-x-1/2 rounded-lg p-1">
            <img
              src={logoPreviewUrl}
              alt="Logo do Certificado"
              className="h-16 w-auto object-contain"
            />
          </div>
        )}
      </div>

      <p className="mt-4 text-sm text-gray-600">
        * O texto é sobreposto à imagem de fundo selecionada. Ajuste a **cor da fonte** no
        formulário para melhor contraste.
      </p>
    </div>
  );
}
