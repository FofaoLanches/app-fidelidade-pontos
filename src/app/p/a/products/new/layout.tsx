import { redirect } from "next/navigation";
import { Fragment } from "react";

import { Header } from "@/components";
import { useServerSession } from "@/hooks";
import { SomeChildInterface } from "@/types";

export default async function RootLayout({ children }: SomeChildInterface) {
  const session = await useServerSession();

  if (session.user?.role === "CUSTOMER") {
    return redirect("/p/gotched-points");
  }

  return (
    <Fragment>
      <Header variant="without" className="bg-ternary-900" />
      {children}
    </Fragment>
  );
}
