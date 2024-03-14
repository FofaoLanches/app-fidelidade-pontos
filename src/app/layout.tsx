import "@/styles/globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";

import { Screen } from "@/components";
import { QrCodeProvider } from "@/context/qrcode-context";
import SessionAuthenticateProvider from "@/context/sessionProvider";
import { NextLayoutComponentInterface } from "@/types";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "App de pontos Fofão Lanches",
  icons: "/mascote_sem_fundo.png",
};

export default function RootLayout({ children, session }: NextLayoutComponentInterface) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className={inter.className}>
        <Toaster position="top-right" reverseOrder={false} />
        <SessionAuthenticateProvider session={session}>
          <QrCodeProvider>
            <Screen>{children}</Screen>
          </QrCodeProvider>
        </SessionAuthenticateProvider>
      </body>
    </html>
  );
}
