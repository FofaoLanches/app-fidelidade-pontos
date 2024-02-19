import { ReactNode } from "react";

export interface InteractiveCardInterface {
  href: string;
  target: boolean;
  title: string;
  children: ReactNode;
  description: string;
}
