"use client";
import { Fragment } from "react";

import { Footer } from "@/components";
import { SomeChildInterface } from "@/types";

export default function AdminLayout({ children }: SomeChildInterface) {
  return (
    <Fragment>
      {children}
      <Footer className="bg-ternary-900" />
    </Fragment>
  );
}
