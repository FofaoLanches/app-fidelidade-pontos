import { InputHTMLAttributes, ReactNode } from "react";

import { SomeChildInterface } from "..";

type PicHTMLInputElement = Pick<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange" | "onBlur" | "maxLength">;
type PicHTMLCheckboxElement = Pick<InputHTMLAttributes<HTMLInputElement>, "checked" | "onChange">;
type PicHTMLFileInputElement = Pick<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange" | "onBlur">;
type PicHTMLTextAreaElement = Pick<InputHTMLAttributes<HTMLTextAreaElement>, "value" | "onChange" | "onBlur">;

interface PreProps {
  id: string;
  message: ReactNode;
  label?: string;
  isInvalid?: boolean;
}
export interface DefaultCustomFieldInterface extends PreProps {
  isLoading?: boolean;
  placeholder: string;
}

export interface TextFieldInterface extends DefaultCustomFieldInterface, PicHTMLInputElement {
  prefix?: ReactNode;
}
export interface PasswordFieldInterface extends DefaultCustomFieldInterface, PicHTMLInputElement {}
export interface FileFieldInterface extends DefaultCustomFieldInterface, PicHTMLFileInputElement {}
export interface TextFieldAreaInterface extends DefaultCustomFieldInterface, PicHTMLTextAreaElement {}
export interface CheckboxInterface extends PreProps, PicHTMLCheckboxElement, SomeChildInterface {}
