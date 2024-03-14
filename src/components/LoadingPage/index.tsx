import React, { ComponentProps } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { twMerge } from "tailwind-merge";

export const LoadingPage: React.FC<ComponentProps<"div">> = (props) => {
  return (
    <div className={twMerge("flex w-full h-[80vh] lg:h-full items-center justify-center z-99999", props.className)}>
      <AiOutlineLoading3Quarters size="50" className="animate-spin" />
    </div>
  );
};
