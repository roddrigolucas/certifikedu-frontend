import PDFViewer from '@/components/pages/Authentication/SignUp/PdfViewer';
import { Button } from '@/components/shared/ui/button';
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/shared/ui/dialog';

export interface DialogPDFProps {
  onUserInteraction: () => void;
}

export const DialogPDF: React.FC<DialogPDFProps> = ({ onUserInteraction }) => {
  return (
    <DialogContent className="max-h-[94%] overflow-y-scroll  ">
      <DialogHeader className="text-start">
        <DialogTitle>Termos de uso CertifikEdu</DialogTitle>
        <DialogDescription>Leia com atenção nossos termos de uso.</DialogDescription>
      </DialogHeader>
      <PDFViewer fileUrl="/files/user-terms.pdf" />
      <DialogFooter className="">
        <DialogClose asChild>
          <Button
            className="w-full md:w-fit"
            onClick={onUserInteraction}
            type="button"
            data-testId="accept-button"
            variant="secondary"
          >
            Aceitar
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
};
