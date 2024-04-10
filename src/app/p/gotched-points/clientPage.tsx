"use client";
import { useFormik } from "formik";
import { isEmpty, truncate } from "lodash";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { twMerge } from "tailwind-merge";

import { Button, RedeemProductsModal } from "@/components";
import { useCustomer } from "@/hooks";
import { GotchedPointClientPageInterface, InitialValuesListProductsInterface } from "@/types";
import { RedeemPointsSchema } from "@/yupConfigs";

export const ClientPage: React.FC<GotchedPointClientPageInterface> = (props) => {
  const { products, token } = props;
  const { onRedeemPoint } = useCustomer();
  const navigate = useRouter();

  const [isOpenRedeemModal, setIsOpenRedeemModal] = useState<boolean>(false);

  const initialValues: InitialValuesListProductsInterface = {
    redeem_mode: "TAKEAWAY",
    redeem_time: "",
    product_ids: [],
  };

  const handleModal = () => setIsOpenRedeemModal((s) => !s);

  const handleRedeemPoints = async (dataValues: InitialValuesListProductsInterface) => {
    const { product_ids, redeem_mode, redeem_time } = dataValues;
    const res = await onRedeemPoint({ product_ids, redeem_mode, redeem_time, token });

    if (res.success === false) {
      return toast.error(`${res.message}`);
    }

    handleModal();
    toast.success("Resgate de pontos efetuado com sucesso!", {
      duration: 5000,
    });
    return navigate.push("/p/dashboard");
  };

  const { values, errors, touched, isSubmitting, handleSubmit, handleChange, handleBlur, setFieldValue } =
    useFormik<InitialValuesListProductsInterface>({
      initialValues,
      validationSchema: RedeemPointsSchema,
      onSubmit: (values) => handleRedeemPoints(values),
    });

  if (isEmpty(products)) {
    return (
      <div className="relative w-full px-[5%]">
        <div className="flex items-center justify-center w-full">
          <span className="text-center mt-6">Não há produtos disponiveis para resgate no momento</span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full pb-[20%] px-[5%]">
      <span className="text-fontsColor-800 font-medium">Resgate seus pontos:</span>
      <form className="mt-2">
        <RedeemProductsModal
          isOpen={isOpenRedeemModal}
          onClose={handleModal}
          inputsValues={{
            errorMessageMode: errors.redeem_mode,
            errorMessageTime: errors.redeem_time,
            isInvalidMode: !!errors.redeem_mode && touched.redeem_mode,
            isInvalidTime: !!errors.redeem_time && touched.redeem_time,
            setFieldValue,
            isSubmitting,
            handleBlur,
            handleChange,
            handleSubmit,
            valueMode: values.redeem_mode,
            valueTime: values.redeem_time,
          }}
        />

        <ul className="overflow-y-auto lg:overflow-y-scroll h-full space-y-4 max-h-[80vh] lg:max-h-[35vh] lg:pr-2 hide-scrollbar">
          {products.map((product) => {
            let { amount_points, description = "...", display_name, id, image_url = "" } = product;
            const isChecked = values.product_ids.includes(id);

            return (
              <li
                key={`${id}-${display_name}`}
                aria-labelledby="checkbox-group"
                className="relative flex justify-center border-[1px] border-solid border-fundo-300 rounded-lg"
              >
                <label htmlFor={id} className="w-full">
                  <div
                    className={twMerge(
                      "cursor-pointer transition-all bg-gray-100 text-black border-l-8 border-ternary-500 rounded-md",
                      isChecked && "border-l-[20px] border-green-800",
                    )}
                  >
                    <div className="absolute top-1 right-2">
                      <input className="cursor-pointer" type="checkbox" id={id} name="product_ids" value={id} onChange={handleChange} />
                      <span className="pl-2">{amount_points} pts</span>
                    </div>
                    <div className="flex gap-4">
                      <img
                        alt={`Imagem do produto ${display_name}`}
                        src={image_url || "/empty_product.png"}
                        className="border-r-[1px] border-solid border-fundo-300 w-[122px] min-h-[104px] object-cover"
                      />
                      <div className="flex flex-col justify-between pb-3 pt-6">
                        {display_name}

                        <div className="flex justify-between text-fontsColor-700 font-medium text-sm pt-1">
                          <span>{truncate(description, { length: 46 })}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </label>
              </li>
            );
          })}
        </ul>
      </form>
      {!isEmpty(values.product_ids) && (
        <Button
          variant="button"
          className="absolute text-fontsColor-200 bottom-0 max-w-[90%] md:bottom-24"
          onClick={handleModal}
          isLoading={isSubmitting}
        >
          Resgatar
        </Button>
      )}
    </div>
  );
};
