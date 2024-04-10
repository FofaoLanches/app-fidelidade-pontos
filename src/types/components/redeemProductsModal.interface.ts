import { FormikHandlers, FormikHelpers } from "formik";

import { InitialValuesListProductsInterface } from "../initialValues";

type cutHandlers = Pick<FormikHandlers, "handleChange" | "handleBlur" | "handleSubmit">;
type cutHelpers = Pick<FormikHelpers<InitialValuesListProductsInterface>, "setFieldValue">;

type InputValuesType = cutHandlers &
  cutHelpers & {
    errorMessageMode?: string;
    errorMessageTime?: string;
    valueMode: "TAKEAWAY" | "DINE_IN";
    valueTime: string;
    isInvalidMode?: boolean;
    isInvalidTime?: boolean;
    isSubmitting: boolean;
  };

export interface RedeemProductsModalInterface {
  isOpen: boolean;
  inputsValues: InputValuesType;
  onClose: () => void;
}
