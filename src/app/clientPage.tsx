"use client";
import { Form, Formik } from "formik";
import { Fragment } from "react";
import toast from "react-hot-toast";

import { Button, Container, Header, Passfield, Textfield } from "@/components";
import { useLogin, useRedirectLoginSession } from "@/hooks";
import { LoginInitialValuesInterface } from "@/types";
import { LoginSchema } from "@/yupConfigs";

export const ClientPage = () => {
  const { onLogin } = useLogin();
  useRedirectLoginSession();

  const initialValues: LoginInitialValuesInterface = {
    email: "",
    password: "",
  };

  const handleLogin = async (values: LoginInitialValuesInterface) => {
    const response = await onLogin(values);

    if (response) {
      const { ok } = response;
      if (!ok) {
        toast.error("Usuário não cadastrado!");
      } else {
        toast.success("Login efetuado com sucesso!");
      }
    }
  };

  return (
    <Fragment>
      <Header variant="without" className="bg-ternary-900" />
      <Container className="px-[10%] lg:px-[20%]">
        <div className="flex flex-col items-center justify-center gap-6 w-full">
          <img src="/logo_vermelho.jpg" alt="Logo fofão" className="mt-6 w-[50%] lg:w-[200px] rounded-[50%] shadow-3xl" />
          <h1 className="text-2xl text-center font-extrabold text-fontsColor-800">Faça seu Login para continuar</h1>
        </div>

        <Formik
          initialValues={initialValues}
          onSubmit={handleLogin}
          validationSchema={LoginSchema}
          validateOnBlur={true}
          validateOnChange={false}
        >
          {({ errors, touched, values, handleBlur, handleChange, isSubmitting }) => {
            return (
              <Form className="w-full">
                <Textfield
                  id="email"
                  message={errors.email}
                  placeholder="Digite seu e-mail"
                  label="Email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur("email")}
                  isInvalid={!!errors.email && touched.email}
                  isLoading={isSubmitting}
                />
                <Passfield
                  id="password"
                  message={errors.password}
                  placeholder="Digite sua senha"
                  label="Senha"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur("password")}
                  isInvalid={!!errors.password && touched.password}
                  isLoading={isSubmitting}
                />

                <div className="flex flex-col gap-4 divide-y-2 divide-ternary-400">
                  <div className="flex flex-col gap-4">
                    <Button variant="button" className="bg-ternary-800 text-fontsColor-200" isLoading={isSubmitting}>
                      Entrar
                    </Button>

                    <Button className="bg-gray-500 text-fontsColor-200" variant="link" href="/register" disabled={isSubmitting}>
                      Criar conta
                    </Button>
                  </div>
                  <Button
                    forceServerNavigation
                    variant="link"
                    href="/"
                    className="bg-transparent justify-center rounded-none shadow-none text-fontsColor-600"
                  >
                    Quero cadastrar meus pontos
                  </Button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </Container>
    </Fragment>
  );
};
