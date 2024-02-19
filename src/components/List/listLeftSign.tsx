import { twMerge } from "tailwind-merge";

import { ListLeftSignInterface } from "@/types";

export const ListLeftSign: React.FC<ListLeftSignInterface> = (props) => {
  const { className } = props;
  return <div className={twMerge("absolute left-0 top-0 h-full border-l-8 border-ternary-600 rounded-s-md", className)} />;
};
