"use client";
import { SessionProvider } from "next-auth/react";

import { NextLayoutComponentInterface } from "@/types";

export default function Provider({ children, session }: NextLayoutComponentInterface) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
