import "@/styles/globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Session } from "next-auth";
import { Toaster } from "react-hot-toast";

import { Screen } from "@/components";
import SessionAuthenticateProvider from "@/context/sessionProvider";
import { useServerSession } from "@/hooks";
import { SomeChildInterface } from "@/types";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "App de pontos Fofão Lanches",
  icons: "/mascote_sem_fundo.png",
};

export default async function RootLayout({ children }: SomeChildInterface) {
  const session = (await useServerSession()) as Session;

  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className={inter.className}>
        <Toaster position="top-right" reverseOrder={false} />
        <SessionAuthenticateProvider session={session}>
          <Screen>{children}</Screen>
        </SessionAuthenticateProvider>
      </body>
    </html>
  );
}
