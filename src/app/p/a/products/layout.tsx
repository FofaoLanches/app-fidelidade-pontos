import { redirect } from "next/navigation";
import { Fragment } from "react";

import { useServerSession } from "@/hooks";
import { SomeChildInterface } from "@/types";

export default async function RootLayout({ children }: SomeChildInterface) {
  const session = await useServerSession();

  if (session.user?.role === "CUSTOMER") {
    return redirect("/p/gotched-points");
  }

  return <Fragment>{children}</Fragment>;
}
