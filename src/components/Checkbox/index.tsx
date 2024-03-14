import React from "react";

import { CheckboxInterface } from "@/types";

export const Checkbox: React.FC<CheckboxInterface> = (props) => {
  const { id, label, children, message, isInvalid, checked, onChange = () => null } = props;

  return (
    <fieldset>
      <div className="flex gap-2">
        <input id={id} name={id} checked={checked} onChange={onChange} type="checkbox" className="rounded cursor-pointer" />
        <label htmlFor={id} className="text-md block font-normal cursor-pointer">
          {label}
          {children}
        </label>
      </div>
      <p className="style-text-error">{isInvalid && message}</p>
    </fieldset>
  );
};
