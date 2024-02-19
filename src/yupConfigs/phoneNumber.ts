import { isValidMobilePhone } from "@brazilian-utils/brazilian-utils";
import * as Yup from "yup";

export const validatePhoneNumber: Yup.TestFunction = (value, { createError, path }) => {
  const parsedValue = String(value);
  if (isValidMobilePhone(parsedValue)) {
    return true;
  }

  return createError({
    path,
    message: "Informe um celular válido.",
  });
};
