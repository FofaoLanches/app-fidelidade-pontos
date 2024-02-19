import { SomeChildInterface } from "@/types";

export const ListItem: React.FC<SomeChildInterface> = (props) => {
  const { children } = props;
  return (
    <li aria-labelledby="checkbox-group" className="relative flex border-[1px] border-solid border-fundo-300 rounded-lg py-4 px-6">
      {children}
    </li>
  );
};
