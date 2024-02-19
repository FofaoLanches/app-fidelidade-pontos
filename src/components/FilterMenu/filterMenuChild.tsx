import { FilterMenuChildInterface } from "@/types";

export const FilterMenuChild: React.FC<FilterMenuChildInterface> = (props) => {
  const { children } = props;

  return (
    <div className="flex justify-center items-center bg-fundo-200 px-2 rounded-lg gap-1">
      <span>{children}</span>
    </div>
  );
};
