"use client";
import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { twMerge } from "tailwind-merge";

import { PasswordFieldInterface } from "@/types";

export const Passfield: React.FC<PasswordFieldInterface> = (props) => {
  const { id, label, placeholder, message, isInvalid, isLoading = false, onBlur = () => null, onChange = () => null, value = "" } = props;
  const [eyeOpen, setEyeOpen] = useState<boolean>(false);

  const typeInputPassword = eyeOpen ? "text" : "password";

  return (
    <div className="relative">
      <label htmlFor={id} className="text-md block font-normal mb-1">
        {label}
      </label>
      <input
        disabled={isLoading}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        type={typeInputPassword}
        name={id}
        className={twMerge(
          "w-full h-[40px] bg-white rounded text-fontsColor-900 px-4 focus:outline-none focus:ring focus:ring-ternary-100",
          isInvalid && "style-focus-error",
        )}
        placeholder={placeholder}
      />
      <div className="absolute top-10 right-4 text-fontsColor-700">
        <button type="button" onClick={() => setEyeOpen((s) => !s)}>
          {eyeOpen ? <AiFillEye className="" /> : <AiFillEyeInvisible className="" />}
        </button>
      </div>
      <p className="style-text-error">{isInvalid && message}</p>
    </div>
  );
};
