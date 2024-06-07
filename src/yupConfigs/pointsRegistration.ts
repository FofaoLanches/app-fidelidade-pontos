import { parseCurrency } from "@brazilian-utils/brazilian-utils";
import * as Yup from "yup";

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
  value_spent: Yup.string().test({ test: validateValueSpent }).required("Campo obrigatório"),
});
