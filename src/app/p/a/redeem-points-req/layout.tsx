import { Fragment } from "react";

import { Footer, Header } from "@/components";
import { SomeChildInterface } from "@/types";

export default function RootLayout({ children }: SomeChildInterface) {
  return (
    <Fragment>
      <Header variant="with" className="bg-ternary-900" />
      {children}
      <Footer className="bg-ternary-900" />
    </Fragment>
  );
}
