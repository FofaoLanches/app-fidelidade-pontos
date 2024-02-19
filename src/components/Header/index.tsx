import React from "react";

import { HeaderInterface } from "@/types";

import { With } from "./with";
import { Without } from "./without";

export const Header: React.FC<HeaderInterface> = (props) => {
  const { variant = "without" } = props;

  if (variant === "with") return <With {...props} />;

  return <Without {...props} />;
};
