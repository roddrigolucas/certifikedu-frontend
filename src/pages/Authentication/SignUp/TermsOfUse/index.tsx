import { DialogPDF } from '@/components/pages/Authentication/SignUp/Dialog';
import { Checkbox } from '@/components/shared/ui/checkbox';
import { Dialog, DialogTrigger } from '@/components/shared/ui/dialog';

interface TermsOfUseProps {
  checkedTerms: boolean;
  setCheckedTerms: (value: boolean) => void;
}

export default function TermsOfUse({ checkedTerms, setCheckedTerms }: TermsOfUseProps) {
  return (
    <div className="mt-4 flex flex-row items-center gap-2">
      <Dialog>
        <DialogTrigger asChild data-testId="terms-dialog">
          <p className="ml-auto w-fit cursor-pointer items-end justify-end text-end text-secondary underline hover:text-orange-600 hover:opacity-80">
            Clique AQUI para aceitar nossos termos de uso
          </p>
        </DialogTrigger>
        <DialogPDF onUserInteraction={() => setCheckedTerms(true)} />
      </Dialog>
      <Checkbox
        name={'useTerms'}
        id={'useTerms'}
        onClick={() => {
          if (checkedTerms) {
            setCheckedTerms(false);
          }
        }}
        checked={checkedTerms}
        required
      />
    </div>
  );
}
