import { twMerge } from "tailwind-merge";

import { ContainerInterface } from "@/types";

export const Container: React.FC<ContainerInterface> = (props) => {
  const { children, className } = props;

  return <section className={twMerge("flex flex-col w-full mt-[80px] gap-6", className)}>{children}</section>;
};
