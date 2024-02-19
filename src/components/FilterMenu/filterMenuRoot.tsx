import { Children } from "react";
import { FaChevronDown } from "react-icons/fa";
import { twMerge } from "tailwind-merge";

import { userFiltersFields } from "@/constants";
import { FilterMenuRootInterface } from "@/types";

export const FilterMenuRoot: React.FC<FilterMenuRootInterface> = (props) => {
  const { children, isOpen = false, isLoading, onOpen = () => null, onSelect = () => null } = props;

  const childrenLenght = Children.toArray(children).length;

  return (
    <div className="relative flex w-full">
      <div
        className="flex realtive cursor-pointer justify-start items-center bg-white rounded-md border border-solid border-black px-4 gap-2 w-full"
        onClick={!isLoading ? onOpen : undefined}
      >
        {childrenLenght !== 0 ? children : <b>Filtrar</b>}
        <FaChevronDown className={twMerge("absolute top-[30%] right-[2%] text-black text-md transition-all", isOpen && "rotate-180")} />
      </div>
      {isOpen && (
        <div className="absolute flex flex-col top-[44px] right-0 bg-fundo-50 rounded-md border border-solid border-black w-full py-1 gap-1 z-[1]">
          {userFiltersFields.map(({ content, paramType, paramContent }) => (
            <button
              disabled={isLoading}
              key={paramType}
              className="text-start text-md px-4 py-1 transition-all whitespace-nowrap hover:bg-fundo-100 hover:bg-transparent hover:font-bold"
              onClick={() =>
                onSelect({
                  paramType,
                  paramContent,
                })
              }
            >
              {content}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
