import { ComponentProps, ReactNode } from "react";

import { SomeChildInterface } from "@/types";

type ComponentPropDiv = ComponentProps<"div">;

type ClassNameInterface = Pick<ComponentPropDiv, "className">;

export type DrawerItemListType = {
  id?: string;
  className?: string;
  icon: ReactNode;
  content: string;
  forceHardNavigation?: boolean;
};

export interface ItemDrawerInterface extends DrawerItemListType {
  href: string;
  forceHardNavigation?: boolean;
  handleCloseDrawer: () => void;
}

export interface DrawerMenuInterface {
  isOpen: boolean;
  adminCity?: string;
  handleTrigger: () => void;
}

export interface ClonedIconInterface extends SomeChildInterface, Pick<ItemDrawerInterface, "className"> {}

export interface WithInterface extends ClassNameInterface {}
export type WithoutInterface = ClassNameInterface;

export interface HeaderInterface extends WithoutInterface {
  variant: "with" | "without";
}
