import { Fragment } from "react";

import { SomeChildInterface } from "@/types";

export default async function RootLayout({ children }: SomeChildInterface) {
  return <Fragment>{children}</Fragment>;
}
