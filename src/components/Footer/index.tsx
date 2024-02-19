import React from "react";
import { twMerge } from "tailwind-merge";

import { VoidFooterInterface } from "@/types";

export const Footer: React.FC<VoidFooterInterface> = (props) => {
  const { className } = props;

  return <div className={twMerge("fixed bottom-0 left-0 w-screen h-[40px] shadow-3xl", className)} />;
};
