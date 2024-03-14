"use client";
import React, { Dispatch, SetStateAction, useState } from "react";

import { SomeChildInterface } from "@/types";

type QrCodeContext = {
  isOpenModalQrCode: boolean;
  setIsOpenModalQrCode: Dispatch<SetStateAction<boolean>>;
};

export const QrCodeContext = React.createContext<QrCodeContext>({ isOpenModalQrCode: false, setIsOpenModalQrCode: () => null });

export const QrCodeProvider: React.FC<SomeChildInterface> = ({ children }) => {
  const [isOpenModalQrCode, setIsOpenModalQrCode] = useState(false);

  return <QrCodeContext.Provider value={{ isOpenModalQrCode, setIsOpenModalQrCode }}>{children}</QrCodeContext.Provider>;
};
