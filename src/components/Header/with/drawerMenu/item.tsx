import Link from "next/link";
import React from "react";
import { twMerge } from "tailwind-merge";

import { ItemDrawerInterface } from "@/types";

import { ClonedIcon } from "./iconClone";

export const ItemDrawer: React.FC<ItemDrawerInterface> = (props) => {
  const { className, icon, content, href, handleCloseDrawer, forceHardNavigation = false } = props;

  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    const defaultClassName = "flex items-center gap-4 py-4 px-8 active:bg-fundo-200";

    const props = {
      className: defaultClassName,
      onClick: handleCloseDrawer,
      href,
    };

    return forceHardNavigation ? <a {...props}>{children}</a> : <Link {...props}>{children}</Link>;
  };

  return (
    <Wrapper>
      <ClonedIcon className={twMerge("w-8 h-8", className)}>{icon}</ClonedIcon>
      <span className="text-lg font-semibold text-fontsColor-800">{content}</span>
    </Wrapper>
  );
};
