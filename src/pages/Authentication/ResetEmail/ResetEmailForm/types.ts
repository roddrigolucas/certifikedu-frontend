export interface StartEmailUpdateParameters {
  emailAddress: string;
  password: string;
  newEmailAddress: string;
}

export interface SendEmailResetFormProps {
  emailAddress: string;
  onEmailAddressChange: (newEmailAddress: string) => void;
  onSubmit: (params: StartEmailUpdateParameters) => void;
  isSubmitting: boolean;
  errorMessage?: string;
}
