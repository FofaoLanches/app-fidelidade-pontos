interface GenericInputOTPInterface {
  hasError: boolean;
  isLoading: boolean;
}

export interface OTPInputInterface extends GenericInputOTPInterface {
  state: string[];
  seState: React.Dispatch<React.SetStateAction<string[]>>;
  handleDinamicSubmit?: () => void;
}

export interface VerificationModalInterface extends GenericInputOTPInterface {
  phoneNumber: string;
  isOpen: boolean;
  // eslint-disable-next-line no-unused-vars
  handleSubmit: (value: string) => void;
}
