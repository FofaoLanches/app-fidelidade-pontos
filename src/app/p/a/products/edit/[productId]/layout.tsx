import { Fragment } from "react";

import { Header } from "@/components";
import { SomeChildInterface } from "@/types";

export default async function RootLayout({ children }: SomeChildInterface) {
  return (
    <Fragment>
      <Header variant="without" className="bg-ternary-900" />
      {children}
    </Fragment>
  );
}
