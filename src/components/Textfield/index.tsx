"use client";
import { isEmpty } from "lodash";
import React from "react";
import { twMerge } from "tailwind-merge";

import { TextFieldInterface } from "@/types";

export const Textfield: React.FC<TextFieldInterface> = (props) => {
  const {
    id,
    label,
    placeholder,
    message,
    isInvalid,
    prefix,
    maxLength,
    isLoading = false,
    onBlur = () => null,
    onChange = () => null,
    value = "",
  } = props;

  const valueWithPrefix = !isEmpty(prefix) ? `${prefix} ${value}` : value;

  return (
    <div>
      <label htmlFor={id} className="text-md block font-normal mb-1">
        {label}
      </label>
      <input
        disabled={isLoading}
        value={valueWithPrefix}
        onChange={onChange}
        onBlur={onBlur}
        type="text"
        name={id}
        maxLength={maxLength}
        className={twMerge(
          "w-full h-[40px] bg-white rounded text-fontsColor-900 px-4 border focus:outline-none focus:ring focus:ring-ternary-100",
          isInvalid && "style-focus-error",
        )}
        placeholder={placeholder}
      />
      <p className="style-text-error">{isInvalid && message}</p>
    </div>
  );
};
