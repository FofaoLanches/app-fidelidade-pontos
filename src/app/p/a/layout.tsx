"use client";
import { useSession } from "next-auth/react";
import { Fragment, useRef } from "react";

import { Footer } from "@/components";
import { SomeChildInterface } from "@/types";

import { ClientAdminLayout } from "./layout-component";

export default function AdminLayout({ children }: SomeChildInterface) {
  const session = useSession();
  const sessionRef = useRef<HTMLButtonElement>(null);

  return (
    <Fragment>
      <ClientAdminLayout session={session.data?.user!} sessionRef={sessionRef} />
      {children}
      <Footer className="bg-ternary-900" />
    </Fragment>
  );
}
