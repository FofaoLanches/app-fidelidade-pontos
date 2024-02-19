import { SomeChildInterface } from "@/types";

export const ListIconButtonRoot: React.FC<SomeChildInterface> = (props) => {
  const { children } = props;
  return <div className="flex flex-col w-[80px] justify-between">{children}</div>;
};
