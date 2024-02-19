import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { twMerge } from "tailwind-merge";

import { GenericButtonInterface } from "@/types";

export const ButtonComponent: React.FC<GenericButtonInterface> = (props) => {
  const { className, onClick, children, isLoading = false, hasType = true, disabled = false } = props;

  return (
    <button
      onClick={onClick}
      type={hasType ? "submit" : "button"}
      className={twMerge(
        "flex items-center justify-center gap-4 w-full h-[40px] rounded bg-ternary-900 shadow-lg disabled:opacity-70",
        className,
      )}
      disabled={disabled || isLoading}
    >
      {isLoading ? <AiOutlineLoading3Quarters className="text-white animate-spin text-[25px]" /> : children}
    </button>
  );
};
