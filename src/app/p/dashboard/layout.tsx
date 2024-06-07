import { Fragment } from "react";

import { Footer, Header } from "@/components";
import { useServerRedirect } from "@/hooks/useServerRedirect";
import { SomeChildInterface } from "@/types";

export default async function RootLayout({ children }: SomeChildInterface) {
  await useServerRedirect();
  return (
    <Fragment>
      <Header variant="with" className="bg-ternary-900" />
      {children}
      <Footer className="bg-ternary-900" />
    </Fragment>
  );
}
