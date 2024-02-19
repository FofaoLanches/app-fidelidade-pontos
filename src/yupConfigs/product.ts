import { isEmpty } from "lodash";
import * as Yup from "yup";

import { extractImageExtensionFromUrl } from "@/helpers";

const fileFormatTest: Yup.TestFunction<any, Yup.AnyObject> = (value) => {
  if (!isEmpty(value)) {
    const supportedFormats = ["jpg", "png"];
    const fileExtension = extractImageExtensionFromUrl(value);

    return supportedFormats.includes(fileExtension);
  }

  return true;
};

const fileSizeTest: Yup.TestFunction<any, Yup.AnyObject> = (value) => {
  if (!isEmpty(value)) {
    return value.size <= 3145728;
  }

  return true;
};

const interceptLethers: Yup.TestFunction<any, Yup.AnyObject> = (value, { createError, path }) => {
  const regex: RegExp = /^\d+$/;

  if (regex.test(value)) {
    return true;
  }

  return createError({
    message: "Passe apenas números",
    path,
  });
};

export const ProductSchema = Yup.object().shape({
  display_name: Yup.string()
    .required("Nome obrigatório")
    .matches(/^[a-zA-Z0-9À-ÿ ]*$/, "Nome inválido"),
  description: Yup.string().required("Descrição obrigatório!"),
  amount_points: Yup.string().test({ test: interceptLethers }).min(1).max(10000).required("Valor obrigatório"),
  image: Yup.mixed()
    .test({ name: "fileFormat", message: "Formato inválido (Apenas JPG e PNG)", test: fileFormatTest })
    .test({ name: "fileSize", message: "O tamanho deve ser menor que 3MB", test: fileSizeTest }),
});
