import "@/styles/globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";

import { /*BasicAuth,*/ Screen } from "@/components";
import SessionAuthenticateProvider from "@/context/sessionProvider";
// import { getEndpointBaseUrlClient } from "@/helpers";
import { NextLayoutComponentInterface } from "@/types";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "App de pontos Fofão Lanches",
  icons: "/mascote_sem_fundo.png",
};

export default function RootLayout({ children, session }: NextLayoutComponentInterface) {
  // const clientBaseUrl = getEndpointBaseUrlClient();

  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className={inter.className}>
        {/* <BasicAuth clientBaseUrl={clientBaseUrl}> */}
        <Toaster position="top-right" reverseOrder={false} />
        <SessionAuthenticateProvider session={session}>
          <Screen>{children}</Screen>
        </SessionAuthenticateProvider>
        {/* </BasicAuth> */}
      </body>
    </html>
  );
}
