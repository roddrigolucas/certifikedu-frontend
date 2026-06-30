import { createContext, useContext, useState } from 'react';

import { CertificateIssuerSchemaNaturalPersonType } from '@/pages/App/NaturalPerson/Certificates/Issuer/Form/validation/schema';
import { IPropsImage } from '@/pages/App/NaturalPerson/Certificates/Template/Interal';

import { IEmail } from '@/services/entities/app/admin/model';

import { ProfileProviderProps } from '../useProfile/interfaces';

// Definindo o tipo para a opção de fonte
interface IFontOption {
  label: string;
  value: string;
}

interface GalleryContextType {
  triggerDropzoneUpload: () => void;
  setTriggerDropzoneUpload: (fn: () => void) => void;
  formValues: CertificateIssuerSchemaNaturalPersonType | undefined;
  setFormValues: (values: CertificateIssuerSchemaNaturalPersonType) => void;
  imageFile: File | null;
  setImageFile: (values: File | null) => void;
  imagePath: string;
  setImagePath: (value: string) => void;
  reverseimagePath: string;
  setReverseImagePath: (value: string) => void;
  previewImageUrl: string;
  setPreviewImageUrl: (value: string) => void;
  previewInverseImageUrl: string;
  setPreviewInverseImageUrl: (value: string) => void;
  hasLogo: boolean;
  setHasLogo: (value: boolean) => void;
  renderImages: IPropsImage | null;
  setRenderImage: (value: IPropsImage | null) => void;
  emailValue: IEmail[] | null;
  setEmailValue: (value: IEmail[] | null) => void;
  QrCodeImage: string | null;
  setQrCodeImage: (value: string | null) => void;
  fontColor: string;
  setFontColor: (value: string) => void;
  // NOVOS ESTADOS NECESSÁRIOS PARA O PREVIEW:
  selectedFont: IFontOption | null;
  setSelectedFont: (value: IFontOption | null) => void;
  selectedQRCode: boolean;
  setSelectedQRCode: (value: boolean) => void;
}

const GalleryContext = createContext<GalleryContextType | undefined>(undefined);

export const useGalleryContext = () => {
  const context = useContext(GalleryContext);
  if (context === undefined) {
    throw new Error('useGalleryContext must be used within a GalleryProvider');
  }

  return context;
};

export const GalleryProvider = ({ children }: ProfileProviderProps) => {
  const [triggerDropzoneUpload, setTriggerDropzoneUpload] = useState<() => void>(() => () => {});
  const [formValues, setFormValues] = useState<
    CertificateIssuerSchemaNaturalPersonType | undefined
  >(undefined);

  // IDs para o Backend
  const [imagePath, setImagePath] = useState<string>('undefined');
  const [reverseimagePath, setReverseImagePath] = useState<string>('undefined');

  // URLs para o Preview
  const [previewImageUrl, setPreviewImageUrl] = useState<string>('');
  const [previewInverseImageUrl, setPreviewInverseImageUrl] = useState<string>('');

  // NOVOS ESTADOS DE CONTROLE
  const [selectedFont, setSelectedFont] = useState<IFontOption | null>(null);
  const [selectedQRCode, setSelectedQRCode] = useState<boolean>(false); // Padrão 'false' se não estiver em uso

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [hasLogo, setHasLogo] = useState<boolean>(true);
  const [renderImages, setRenderImage] = useState<IPropsImage | null>(null);
  const [emailValue, setEmailValue] = useState<IEmail[] | null>(null);
  const [QrCodeImage, setQrCodeImage] = useState<string | null>('TOP_RIGHT');
  const [fontColor, setFontColor] = useState<string>('#000000');

  return (
    <GalleryContext.Provider
      value={{
        triggerDropzoneUpload,
        setTriggerDropzoneUpload,
        formValues,
        setFormValues,
        imagePath,
        setImagePath,
        imageFile,
        setImageFile,
        hasLogo,
        setHasLogo,
        renderImages,
        setRenderImage,
        emailValue,
        setEmailValue,
        QrCodeImage,
        setQrCodeImage,
        fontColor,
        setFontColor,
        reverseimagePath,
        setReverseImagePath,
        previewImageUrl,
        setPreviewImageUrl,
        previewInverseImageUrl,
        setPreviewInverseImageUrl,
        // EXPOSIÇÃO DOS NOVOS ESTADOS
        selectedFont,
        setSelectedFont,
        selectedQRCode,
        setSelectedQRCode,
      }}
    >
      {children}
    </GalleryContext.Provider>
  );
};
