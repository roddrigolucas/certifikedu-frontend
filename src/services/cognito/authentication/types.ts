// Local user type (replaces CognitoUser)
export interface LocalUser {
  username: string;
  email: string;
  name: string;
  family_name: string;
  attributes: {
    email: string;
    name: string;
    family_name: string;
  };
  challengeName?: string;
  getUsername: () => string;
}

export type CustomCognitoUser = LocalUser;

export interface StartEmailUpdateParameters {
  emailAddress: string;
  password: string;
  newEmailAddress: string;
}

export interface SyncEmailParameters {
  newEmail: string;
  oldEmail: string;
}

export interface VerifyNewEmailParameters {
  emailAddress: string;
  verificationCode: string;
}

export interface AuthenticationCredentials {
  emailAddress: string;
  password: string;
}

export interface SignUpParameters extends AuthenticationCredentials {
  firstName: string;
  lastName: string;
}

export interface VerifyEmailAddressParameters {
  emailAddress: string;
  verificationCode: string;
}

export type SignInParameters = AuthenticationCredentials;

export interface SendPasswordResetEmailParameters {
  emailAddress: string;
}

export interface SendCodeResetEmailParameters {
  emailAddress: string;
  isButtonDisabled?: boolean;
}

export interface ResendVerificationCodeEmailParameters {
  emailAddress: string;
}

export interface ChangePasswordParameters {
  emailAddress: string;
  verificationCode: string;
  newPassword: string;
}

export interface UpdatePasswordParameters {
  user: CustomCognitoUser;
  currentPassword: string;
  newPassword: string;
}
