import { UserInterface } from "@/types";

export interface QrCodeInterface {
  isLoading: boolean;
  qrCode: string;
}

export interface QrCodeModalInterface {
  isOpen: boolean;
  session: UserInterface;
  currentDateTimer: Date;
  finalDateTimer: Date;
  onClose: () => void;
}
