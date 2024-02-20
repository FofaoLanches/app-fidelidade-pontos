import { SomeChildInterface } from "@/types";

export const ListIconButtonRoot: React.FC<SomeChildInterface> = (props) => {
  const { children } = props;
  return <div className="flex flex-col w-[80px] gap-4 justify-between">{children}</div>;
};
