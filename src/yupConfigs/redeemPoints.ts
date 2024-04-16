import * as Yup from "yup";

const validTime = (time: string, { createError, path }: Yup.AnyObject): boolean => {
  const regex = /[^\d\s:]/g;

  if (regex.test(time)) {
    return createError({
      path,
      message: "Esse símbolo não é válido!",
    });
  }

  return true;
};

export const RedeemPointsSchema = Yup.object().shape({
  redeem_mode: Yup.string().required("Campo obrigatório"),
  redeem_time: Yup.string().required("Campo obrigatório").test(validTime),
  product_ids: Yup.array().of(Yup.string()).required("Obrigatório!"),
});
