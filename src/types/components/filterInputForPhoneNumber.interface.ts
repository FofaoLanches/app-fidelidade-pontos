import { ComponentProps } from "react";

type InputProps = ComponentProps<"input">;
type CutInputProps = Pick<InputProps, "value" | "onChange">;

export interface FilterInputForPhoneNumberInterface extends CutInputProps {}
