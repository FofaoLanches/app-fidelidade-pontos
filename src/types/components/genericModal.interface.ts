import { ReactNode } from "react";

export interface GenericModalInterface {
  isOpen: boolean;
  title: string;
  messageButtonLeft: string;
  messageButtonRight: string;
  hasButtonLeft?: boolean;
  hasButtonRight?: boolean;
  icon?: ReactNode;
  description?: string;
  handleClose: () => void;
  handleClickButtonLeft: () => void;
  handleClickButtonRight: () => void;
}
