"use client";
import { useFormik } from "formik";
import { isEmpty } from "lodash";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import { Button, Container, Filefield, Textfield, TextfieldArea } from "@/components";
import { createImageFileFromUrl } from "@/helpers";
import { useProducts } from "@/hooks";
import { EditProductIdClientPageInterface, EditProductsInitialValuesInterface } from "@/types";
import { ProductSchema } from "@/yupConfigs";

export const ClientPage: React.FC<EditProductIdClientPageInterface> = (props) => {
  const { product, token } = props;
  const { onEditProduct } = useProducts();
  const navigate = useRouter();

  const [isLoadingPage, setIsLoadingPage] = useState<boolean>(true);

  const initialValues: EditProductsInitialValuesInterface = {
    id: "",
    image: "",
    display_name: "",
    description: "",
    amount_points: "" as unknown as number,
  };

  const editProduct = async (values: EditProductsInitialValuesInterface) => {
    const promise = onEditProduct({ ...values, token: token });

    const res = await toast.promise(promise, {
      loading: "Aguarde...",
      error: "Erro ao alterar o produto!",
      success: "Produto alterado com exito!",
    });

    if (res.success === false) {
      return;
    } else {
      navigate.push("/p/a/products");
    }
  };

  const { handleChange, values, errors, isSubmitting, handleBlur, handleSubmit, touched, setFieldValue } =
    useFormik<EditProductsInitialValuesInterface>({
      initialValues: initialValues,
      onSubmit: editProduct,
      validationSchema: ProductSchema,
      validateOnBlur: true,
      validateOnChange: false,
    });

  const getCurrentProduct = useCallback(async () => {
    if (product) {
      const productObjectMetadata = Object.entries(product);

      await Promise.all(
        productObjectMetadata.map(async (item) => {
          const currentValue = values[item[0] as keyof EditProductsInitialValuesInterface];
          const fieldName = item[0];
          const fieldValue = item[1];

          if (fieldName !== "image_url") {
            if (isEmpty(currentValue)) {
              setFieldValue(fieldName, fieldValue);
            }
          } else {
            const imageFile = await createImageFileFromUrl(fieldValue);

            setFieldValue("image", imageFile);
          }
        }),
      );
    }

    setIsLoadingPage(false);
  }, [product, setFieldValue, values]);

  useEffect(() => {
    getCurrentProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  const handleChangeImage = (e: any) => {
    const target = e.target as HTMLInputElement & {
      files: File;
    };

    setFieldValue("image", target.files[0]);
  };

  if (isLoadingPage || product === undefined) {
    return (
      <div className="flex w-full items-center justify-center h-screen">
        <AiOutlineLoading3Quarters size="50" className="animate-spin" />
      </div>
    );
  }

  return (
    <Container className="gap-0 px-[10%] lg:px-[20%] pb-[60px]">
      <div className="flex flex-col items-center justify-center gap-2 w-full">
        <img src="/logo_vermelho.jpg" alt="Logo fofão" className="w-[50%] lg:w-[200px] rounded-[50%] shadow-3xl" />
        <h1 className="text-2xl font-extrabold text-fontsColor-800">Editar Produto</h1>
      </div>

      <form className="w-full mt-4" onSubmit={handleSubmit}>
        <div className="flex flex-col ">
          <Filefield
            id="image"
            message={errors.image}
            placeholder="Clique ou arraste"
            label="Imagem"
            value={values.image}
            onChange={handleChangeImage}
            onBlur={handleBlur}
            isInvalid={!!errors.image && touched.image}
            isLoading={false}
          />
          <Textfield
            id="display_name"
            message={errors.display_name}
            placeholder="Digite o nome do produto"
            label="Nome do produto"
            value={values.display_name}
            onChange={handleChange}
            onBlur={handleBlur}
            isInvalid={!!errors.display_name && touched.display_name}
            isLoading={false}
          />
          <Textfield
            id="amount_points"
            message={errors.amount_points}
            placeholder="Digite a quantia dos pontos"
            label="Valor de pontos do produto"
            value={values.amount_points}
            onChange={handleChange}
            onBlur={handleBlur}
            isInvalid={!!errors.amount_points && touched.amount_points}
            isLoading={false}
          />
          <TextfieldArea
            id="description"
            message={errors.description}
            placeholder="tomate, queijo, carne..."
            label="Descrição"
            value={values.description}
            onChange={handleChange}
            onBlur={handleBlur}
            isInvalid={!!errors.description && touched.description}
            isLoading={false}
          />
        </div>
        <Button disabled={isSubmitting} className="bg-ternary-800 text-fontsColor-200 mb-4" variant="button">
          Editar
        </Button>
        <Button disabled={isSubmitting} className="bg-gray-500 text-fontsColor-200" variant="link" href="/p/a/products">
          Cancelar
        </Button>
      </form>
    </Container>
  );
};
