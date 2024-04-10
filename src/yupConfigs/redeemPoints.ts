import * as Yup from "yup";

export const RedeemPointsSchema = Yup.object().shape({
  redeem_mode: Yup.string().required("Campo obrigatório"),
  redeem_time: Yup.string().required("Campo obrigatório"),
  product_ids: Yup.array().of(Yup.string()).required("Obrigatório!"),
});
