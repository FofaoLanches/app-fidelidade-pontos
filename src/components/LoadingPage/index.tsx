import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export const LoadingPage: React.FC = () => {
  return (
    <div className="flex w-full h-[80vh] lg:h-full items-center justify-center z-99999">
      <AiOutlineLoading3Quarters size="50" className="animate-spin" />
    </div>
  );
};
