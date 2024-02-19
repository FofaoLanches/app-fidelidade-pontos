import { twMerge } from "tailwind-merge";

import { ListRootInterface } from "@/types";

export const ListRoot: React.FC<ListRootInterface> = (props) => {
  const { children, className } = props;
  return <ul className={twMerge("space-y-6 w-full h-full max-h-[66vh]", className)}>{children}</ul>;
};
