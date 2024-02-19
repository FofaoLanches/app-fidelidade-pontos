import { parseCurrency } from "@brazilian-utils/brazilian-utils";
import * as Yup from "yup";

import { validatePhoneNumber } from ".";

const validateValueSpent: Yup.TestFunction = (value, { createError, path }) => {
  const auxValue = String(value);
  if (parseCurrency(auxValue)) {
    return true;
  }

  return createError({
    path,
    message: "Informe um valor válido.",
  });
};

export const PointsRegistrationSchema = Yup.object().shape({
  phone_number: Yup.string().test({ test: validatePhoneNumber }).required("Campo obrigatório!"),
  value_spent: Yup.string().test({ test: validateValueSpent }).required("Campo obrigatório"),
});
