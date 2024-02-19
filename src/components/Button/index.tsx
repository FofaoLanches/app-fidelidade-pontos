import React from "react";

import { ButtonInterface } from "@/types";

import { ButtonComponent } from "./button";
import { LinkComponent } from "./link";

export const Button: React.FC<ButtonInterface> = (props) => {
  const { variant = "button" } = props;

  if (variant === "link") return <LinkComponent {...props} />;

  return <ButtonComponent {...props} />;
};
