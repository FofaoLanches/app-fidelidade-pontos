"use client";
import { useRouter } from "next/navigation";
import { memo } from "react";
import { VscDebugStepBack } from "react-icons/vsc";

export const GoBack: React.FC = memo(function Component() {
  const navigate = useRouter();

  const avoidGoBack = () => {
    if (typeof window !== "undefined") {
      const currentPage = document?.location.pathname;
      return document?.referrer.includes("login") || document?.referrer.includes(currentPage);
    }
  };

  const handleBack = () => {
    if (avoidGoBack()) return;

    navigate.back();
  };

  if (avoidGoBack()) return <></>;

  return (
    <div className="flex justify-start items-center w-full">
      <button
        onClick={handleBack}
        className="flex justify-center items-center gap-4 font-semibold border-[1px] border-l-8 border-ternary-500 rounded-md px-2"
      >
        Voltar <VscDebugStepBack className='"w-8 h-8 text-fontsColor-900"' />
      </button>
    </div>
  );
});
