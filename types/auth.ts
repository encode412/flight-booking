export interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface VerifyEmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface PersonalInfoModalProps extends ModalProps {
  email: string;
}

export type EnterEmailModalProps = ModalProps;

export interface VerificationCodeModalProps extends ModalProps {
  email: string;
}

export type NewPasswordModalProps = ModalProps;
