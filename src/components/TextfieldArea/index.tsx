"use client";
import React from "react";
import { twMerge } from "tailwind-merge";

import { TextFieldAreaInterface } from "@/types";

export const TextfieldArea: React.FC<TextFieldAreaInterface> = (props) => {
  const { id, isLoading, label, placeholder, message, isInvalid, onBlur = () => null, onChange = () => null, value = "" } = props;

  return (
    <div>
      <label htmlFor={id} className="text-md block font-normal mb-1">
        {label}
      </label>
      <textarea
        disabled={isLoading}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        name={id}
        className={twMerge(
          "w-full h-[40px] bg-white rounded text-fontsColor-900 px-4 py-2 focus:outline-none focus:ring focus:ring-ternary-100",
          isInvalid && "style-focus-error",
        )}
        placeholder={placeholder}
      />

      <p className="style-text-error">{isInvalid && message}</p>
    </div>
  );
};
