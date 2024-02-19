"use client";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

import { Button, Container, Filefield, Textfield, TextfieldArea } from "@/components";
import { useProducts } from "@/hooks";
import { NewProductsInitialValuesInterface } from "@/types";
import { ProductSchema } from "@/yupConfigs";

export default function Page() {
  const { onRegisterProduct } = useProducts();
  const { data } = useSession();
  const navigate = useRouter();

  const initialValues: NewProductsInitialValuesInterface = {
    image: "",
    display_name: "",
    description: "",
    amount_points: "" as unknown as number,
  };

  const registerProduct = async (values: NewProductsInitialValuesInterface) => {
    const promise = onRegisterProduct({ ...values, token: data?.user.token });

    const res = await toast.promise(promise, {
      loading: "Aguarde...",
      error: "Erro ao cadastrar o produto!",
      success: "Produto cadastrado com exito!",
    });

    if (res.success === false) {
      return;
    } else {
      navigate.push("/p/a/products");
    }
  };

  const { handleChange, values, errors, isSubmitting, handleBlur, handleSubmit, touched, setFieldValue } =
    useFormik<NewProductsInitialValuesInterface>({
      initialValues,
      onSubmit: registerProduct,
      validationSchema: ProductSchema,
      validateOnBlur: true,
      validateOnChange: false,
    });

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement & {
      files: File;
    };

    setFieldValue("image", target.files[0]);
  };

  return (
    <Container className="gap-0 px-[10%] lg:px-[20%] pb-[60px]">
      <div className="flex flex-col items-center justify-center gap-2 w-full">
        <img src="/logo_vermelho.jpg" alt="Logo fofão" className="w-[50%] lg:w-[200px] rounded-[50%] shadow-3xl" />
        <h1 className="text-2xl font-extrabold text-fontsColor-800">Cadastrar Produto</h1>
      </div>

      <form className="w-full" onSubmit={handleSubmit}>
        <div className="flex flex-col mt-5">
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
            placeholder="Digite a descrição do produto"
            label="Descrição"
            value={values.description}
            onChange={handleChange}
            onBlur={handleBlur}
            isInvalid={!!errors.description && touched.description}
            isLoading={false}
          />
        </div>
        <Button disabled={isSubmitting} className="bg-ternary-800 text-fontsColor-200 mb-4" variant="button">
          Cadastrar
        </Button>
        <Button disabled={isSubmitting} className="bg-gray-500 text-fontsColor-200" variant="link" href="/p/a/products">
          Cancelar
        </Button>
      </form>
    </Container>
  );
}
