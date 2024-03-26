import * as Yup from "yup";

export const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Email inválido").required("Campo obrigatório!"),
  password: Yup.string().min(6, "Senha muito curta").max(20, "Senha muito longa").required("Senha obrigatória"),
});
