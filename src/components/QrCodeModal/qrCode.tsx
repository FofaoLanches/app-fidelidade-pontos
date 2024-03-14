"use client";
import QRCode from "react-qr-code";

import { QrCodeInterface } from "@/types";

import { LoadingPage } from "..";

export const QrCode: React.FC<QrCodeInterface> = (props) => {
  const { isLoading, qrCode: value } = props;

  if (isLoading || !value) {
    return <LoadingPage className="z-[1] w-[256px] h-[]" />;
  }

  return <QRCode value={value} />;
};
