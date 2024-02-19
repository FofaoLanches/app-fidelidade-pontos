"use client";

import { useFormik } from "formik";
import { isEmpty } from "lodash";
import { useRouter } from "next/navigation";
import { Fragment, useState } from "react";
import toast from "react-hot-toast";

import { Button, Checkbox, Container, Header, Passfield, Textfield, VerificationModal } from "@/components";
import { formatPhone } from "@/helpers";
import { useCustomer } from "@/hooks";
import { ErrorResponseEndpointInterface, RegisterUserInitialValuesInterface } from "@/types";
import { RegisterSchema } from "@/yupConfigs";

export const ClientPage = () => {
  const navigate = useRouter();
  const { onRegister, sendPhoneVerificationCode } = useCustomer();

  const [isVerificationModalOpen, setVerificationModalOpen] = useState<boolean>(false);
  const [isVerificationLoading, setVerificationLoading] = useState<boolean>(false);

  const initialValues: RegisterUserInitialValuesInterface = {
    full_name: "",
    email: "",
    password: "",
    confirm_password: "",
    phone_number: "",
    verification_code: "",
    terms: [false],
  };

  const handleSendPhoneVerificationCode = async (values: RegisterUserInitialValuesInterface) => {
    if (isEmpty(values.verification_code)) {
      const promise = sendPhoneVerificationCode({ phone_number: values.phone_number });

      const res: ErrorResponseEndpointInterface = await toast.promise(promise, {
        loading: "Processando...",
        error: "Falho no envio do código de verificação! Verifique sua caixa de mensagem ou espere 3 minutos, obrigado!",
        success: `Código enviado para o número! ${values.phone_number}`,
      });

      if (res.success === false) {
        return;
      }

      return setVerificationModalOpen(true);
    }
  };

  const { errors, touched, values, handleBlur, handleChange, isSubmitting, setFieldValue, handleSubmit, setFieldError } =
    useFormik<RegisterUserInitialValuesInterface>({
      initialValues,
      validationSchema: RegisterSchema,
      validateOnBlur: true,
      validateOnChange: false,
      onSubmit: (values) => handleSendPhoneVerificationCode(values),
    });

  const handleRegister = async (code: string) => {
    setVerificationLoading(true);
    if (code) {
      setFieldValue("verification_code", code);
      const res: ErrorResponseEndpointInterface = await onRegister({ ...values, verification_code: code });

      if (res.success === false) {
        toast.error("Erro ao criar conta!");
        setFieldError("verification_code", "Código de verificação incorreto");
        return setVerificationLoading(false);
      } else {
        toast.success("Conta criada com sucesso, faça login para confirmar!");
        setVerificationModalOpen(false);
        navigate.push("/login");
      }
    }
  };

  return (
    <Fragment>
      <Header variant="without" className="bg-ternary-900" />

      <Container className="pb-[60px] px-[10%] lg:px-[20%]">
        <div className="flex flex-col items-center justify-center gap-6 w-full">
          <img src="/logo_vermelho.jpg" alt="Logo fofão" className="w-[50%] lg:w-[200px] rounded-[50%] shadow-3xl" />
          <h1 className="text-2xl font-extrabold text-fontsColor-800 text-center">Crie sua Conta para continuar</h1>
        </div>

        <form className="w-full" onSubmit={handleSubmit}>
          <VerificationModal
            phoneNumber={values.phone_number}
            isOpen={isVerificationModalOpen}
            hasError={!!errors.verification_code}
            handleSubmit={handleRegister}
            isLoading={isVerificationLoading}
          />

          <Textfield
            id="full_name"
            message={errors.full_name}
            placeholder="Digite seu nome completo"
            label="Nome completo"
            value={values.full_name}
            onChange={handleChange}
            onBlur={handleBlur("full_name")}
            isInvalid={!!errors.full_name && touched.full_name}
            isLoading={isSubmitting}
          />
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
          <Textfield
            id="phone_number"
            message={errors.phone_number}
            placeholder="Digite seu número de celular"
            label="Número de celular"
            value={values.phone_number}
            onChange={(e) => setFieldValue("phone_number", formatPhone(e.target.value))}
            onBlur={handleBlur("phone_number")}
            isInvalid={!!errors.phone_number && touched.phone_number}
            isLoading={isSubmitting}
            maxLength={15}
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

          <Passfield
            id="confirm_password"
            message={errors.confirm_password}
            placeholder="Confirme sua senha"
            label="Confirmar senha"
            value={values.confirm_password}
            onChange={handleChange}
            onBlur={handleBlur("confirm_password")}
            isInvalid={!!errors.confirm_password && touched.confirm_password}
            isLoading={isSubmitting}
          />

          <Checkbox
            id="terms"
            message={errors.terms}
            checked={values.terms[0]}
            isInvalid={!!errors.terms && touched.terms}
            onChange={() => setFieldValue("terms", [!values.terms[0]])}
            label="Estou ciente dos termos de uso e política de privacidade"
          />

          <div className="flex flex-col gap-4 divide-y-2 divide-ternary-400">
            <div className="flex flex-col gap-4">
              <Button variant="button" className="bg-ternary-800 text-fontsColor-200" isLoading={isSubmitting}>
                Criar conta
              </Button>
              <Button className="bg-gray-500 text-fontsColor-200" variant="link" href="/login">
                Fazer login
              </Button>
            </div>

            <Button variant="link" href="/" className="bg-transparent justify-center rounded-none shadow-none text-fontsColor-600">
              Quero cadastrar meus pontos
            </Button>
          </div>
        </form>
      </Container>
    </Fragment>
  );
};
