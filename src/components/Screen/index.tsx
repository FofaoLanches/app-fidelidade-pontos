"use client";
import React from "react";

import { SomeChildInterface } from "@/types";

export const Screen: React.FC<SomeChildInterface> = (props) => {
  const { children } = props;

  return <main className="flex flex-col justify-center">{children}</main>;
};
