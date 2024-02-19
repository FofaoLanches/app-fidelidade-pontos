import { ComponentProps, ElementType } from "react";

import { GetRedeemPointsInterface, GetRegistrationPointsInterface, SomeChildInterface } from "@/types";

type DivHtmlElementType = ComponentProps<"div">;
type CutDivProps = Pick<DivHtmlElementType, "className">;
type ButtonHtmlElementType = ComponentProps<"button">;
type CutButtonProps = Pick<ButtonHtmlElementType, "className" | "onClick" | "disabled">;

export interface ListLeftSignInterface extends CutDivProps {}
export interface ListContentRegistrationPointsInterface extends GetRegistrationPointsInterface {}
export interface ListContentRedeemPointsRegistrationInterface extends GetRedeemPointsInterface {}
export interface ListAnimationInterface {
  show: boolean;
  icon: ElementType;
  className?: string;
}

export interface ListContentRankingInterface {
  index: number;
  iconClassName: string;
  full_name: string;
  redeemed_points: number;
  icon: ElementType;
}

export interface ListIconButtonInterface extends CutButtonProps {
  isVisible?: boolean;
  isLoading: boolean;
  icon: ElementType;
  iconClassName?: string;
}

export interface ListRootInterface extends SomeChildInterface {
  className?: string;
}
