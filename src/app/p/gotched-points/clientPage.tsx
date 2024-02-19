"use client";
import { useFormik } from "formik";
import { isEmpty } from "lodash";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { twMerge } from "tailwind-merge";

import { Button } from "@/components";
import { useCustomer } from "@/hooks";
import { GotchedPointClientPageInterface, InitialValuesListProductsInterface } from "@/types";

export const ClientPage: React.FC<GotchedPointClientPageInterface> = (props) => {
  const { products, token } = props;
  const { onRedeemPoint } = useCustomer();
  const navigate = useRouter();

  const initialValues: InitialValuesListProductsInterface = {
    checkedProducts: [],
  };

  const handleRedeemPoints = async (values: InitialValuesListProductsInterface) => {
    const promise = onRedeemPoint({ value: values.checkedProducts, token });

    const res = await toast.promise(
      promise,
      {
        loading: "Processando...",
        error: "Ocorreu um problema ao resgatar!",
        success: "Resgate de pontos efetuado com sucesso!",
      },
      {
        success: {
          duration: 5000,
        },
      },
    );

    if (res.success === false) {
      return;
    } else {
      navigate.push("/p/dashboard");
    }
  };

  const { values, isSubmitting, handleSubmit, handleChange } = useFormik<InitialValuesListProductsInterface>({
    initialValues,
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
    <div className="relative w-full px-[5%]">
      <span className="text-fontsColor-800 font-medium">Resgate seus pontos:</span>
      <form className="mt-2">
        <ul className="overflow-y-auto lg:overflow-y-scroll h-full space-y-4 max-h-[80vh] lg:max-h-[35vh] lg:pr-2 hide-scrollbar">
          {products.map((product) => {
            let { amount_points, description, display_name, id, image_url = "" } = product;
            const isChecked = values.checkedProducts.includes(id);

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
                      <input className="cursor-pointer" type="checkbox" id={id} name="checkedProducts" value={id} onChange={handleChange} />
                      <span className="pl-2">{amount_points} pts</span>
                    </div>
                    <div className="flex gap-4">
                      <Image
                        alt={`Imagem do produto ${display_name}`}
                        src={image_url || "/empty_product.png"}
                        blurDataURL={image_url || "/empty_product.png"}
                        placeholder="blur"
                        className="border-r-[1px] border-solid border-fundo-300 w-[122px] h-[92px]"
                        width={200}
                        height={200}
                        quality={100}
                      />
                      <div className="flex flex-col justify-between py-3">
                        {display_name}

                        <div className="flex justify-between text-fontsColor-700 font-medium text-sm pt-1">
                          {!isEmpty(description) && <span>{description}</span>}
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
      {!isEmpty(values.checkedProducts) && (
        <Button
          variant="button"
          className="text-fontsColor-200 absolute bottom-[-50px] max-w-[90%]"
          onClick={() => handleSubmit()}
          isLoading={isSubmitting}
        >
          Resgatar
        </Button>
      )}
    </div>
  );
};
