import React from "react";
import { twMerge } from "tailwind-merge";

import { WithoutInterface } from "@/types";

export const Without: React.FC<WithoutInterface> = (props) => {
  const { className } = props;

  return <div className={twMerge("fixed top-0 left-0 w-screen h-[40px] shadow-2xl z-[1]", className)} />;
};
