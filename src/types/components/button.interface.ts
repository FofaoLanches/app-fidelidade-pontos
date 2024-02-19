import { ComponentProps, ReactNode } from "react";

type ButtonHtmlElementType = ComponentProps<"button">;
type CutButtonProps = Pick<ButtonHtmlElementType, "className" | "onClick" | "disabled">;

export interface GenericButtonInterface extends CutButtonProps {
  isLoading?: boolean;
  hasType?: boolean;
  children: ReactNode;
}

export interface LinkVariantInterface extends GenericButtonInterface {
  href?: string;
  blank?: boolean;
}

export interface ButtonInterface extends LinkVariantInterface {
  variant: "button" | "link";
}
