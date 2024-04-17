import * as Yup from "yup";

import { validatePhoneNumber } from "./phoneNumber";

const validateFullName = (fullName: string, { createError, path }: Yup.AnyObject): boolean => {
  const splitFullName = fullName.trim().split(/\s+/);

  const regex = /^[a-zA-Z0-9À-ÿ ]*$/;

  if (splitFullName.length < 2) {
    return createError({
      path,
      message: "Nome completo obrigatório",
    });
  }

  const isValidParts = splitFullName.every((part) => regex.test(part));

  if (!isValidParts) {
    return createError({
      path,
      message: "Nome inválido",
    });
  }

  return true;
};

export const RegisterSchema = Yup.object().shape({
  full_name: Yup.string().min(3, "Nome inválido").required("Nome obrigatório").test(validateFullName),
  email: Yup.string().trim().email("Email inválido").required("Campo obrigatório"),
  phone_number: Yup.string().required("Campo obrigatório").test({ test: validatePhoneNumber }),
  password: Yup.string().min(6, "Senha muito curta").max(20, "Senha muito longa").required("Senha obrigatória"),
  confirm_password: Yup.string()
    .min(6, "Senha muito curta")
    .max(20, "Senha muito longa")
    .required("Senha obrigatória")
    .oneOf([Yup.ref("password")], "As senhas não conferem"),
  verification_code: Yup.string().max(4),
  terms: Yup.bool().oneOf([true], "Consentimento dos termos obrigatório"),
});
