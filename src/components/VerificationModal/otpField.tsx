import React, { Fragment, useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

import { OTPInputInterface } from "@/types";

let currentTPIIndex = 0;
export const OTPField: React.FC<OTPInputInterface> = (props) => {
  const { seState, state, hasError = false, isLoading = false, handleDinamicSubmit = () => null } = props;

  const [activeOTPIndex, setActiveOTPIndex] = useState<number>(0);
  const [sign, setSign] = useState(true);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = target;
    const newOTP: string[] = [...state];
    newOTP[currentTPIIndex] = value.substring(value.length - 1);

    if (!value) {
      setActiveOTPIndex(currentTPIIndex - 1);
    } else {
      setActiveOTPIndex(currentTPIIndex + 1);
    }

    seState(newOTP);
  };

  const handleOnKeyDown = ({ key }: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    currentTPIIndex = index;
    if (key === "Backspace") {
      setSign(false);
      return setActiveOTPIndex(currentTPIIndex - 1);
    }

    return setSign(true);
  };

  useEffect(() => inputRef.current?.focus(), [activeOTPIndex]);

  useEffect(() => {
    if (currentTPIIndex === 3 && sign) {
      handleDinamicSubmit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeOTPIndex]);

  return (
    <div className="h-20 flex justify-center items-center space-x-2">
      {state.map((_, index) => {
        return (
          <Fragment key={index}>
            <input
              ref={index === activeOTPIndex ? inputRef : null}
              type="number"
              className={twMerge(
                "w-12 h-12 border-2 rounded bg-transparent outline-none text-center font-semibold text-xl border-gray-400 focus:border-gray-700 focus:text-gray-700 text-gray-400 transition spin-button-none disabled:opacity-70",
                hasError && "border-red-500 focus:border-red-500",
              )}
              value={state[index]}
              onChange={handleChange}
              disabled={isLoading}
              onKeyDown={(e) => handleOnKeyDown(e, index)}
            />
            {index === state.length - 1 ? null : <span className="w-2 py-0.5 bg-gray-400" />}
          </Fragment>
        );
      })}
    </div>
  );
};
