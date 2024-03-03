import Link from "next/link";
import React, { Fragment } from "react";
import { twMerge } from "tailwind-merge";

import { LinkVariantInterface } from "@/types";

export const LinkComponent: React.FC<LinkVariantInterface> = (props) => {
  const { className, href = "", disabled = false, blank = false, forceServerNavigation = false, children } = props;

  const mergedClassName = twMerge("flex items-center justify-center w-full h-[40px] rounded bg-ternary-900 shadow-lg", className);

  if (disabled) {
    return <span className={twMerge(`opacity-70`, mergedClassName)}>{children}</span>;
  }

  const properties = {
    href,
    target: blank ? "_blank" : "_self",
    type: "submit",
    className: mergedClassName,
  };

  return <Fragment>{forceServerNavigation ? <a {...properties}>{children}</a> : <Link {...properties}>{children}</Link>}</Fragment>;
};
