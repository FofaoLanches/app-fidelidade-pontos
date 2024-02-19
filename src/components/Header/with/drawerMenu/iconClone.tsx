import { Children, cloneElement } from "react";

import { ClonedIconInterface } from "@/types";

export const ClonedIcon: React.FC<ClonedIconInterface> = (props) => {
  const { children, className } = props;

  return Children.map(children, (child: any) => {
    const newChild = cloneElement(child, {
      className,
    });

    return newChild;
  });
};
