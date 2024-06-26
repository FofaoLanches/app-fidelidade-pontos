"use client";
import { Form, Formik } from "formik";
import { isEmpty } from "lodash";
import { useRouter } from "next/navigation";
import { Fragment } from "react";
import toast from "react-hot-toast";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { twMerge } from "tailwind-merge";

import { Button, Container, Header, Textfield } from "@/components";
import { formatCurrencyInput } from "@/helpers";
import { useCustomer } from "@/hooks";
import { RegisterPointsInitialValuesInterface, RegisterPointsInterface } from "@/types";
import { PointsRegistrationSchema } from "@/yupConfigs";

export const ClientPage: React.FC<RegisterPointsInterface> = (props) => {
  const { session } = props;
  const { onRegistrationPoint } = useCustomer();
  const navigate = useRouter();
  const hasSession = !isEmpty(session?.user);

  const initialValues: RegisterPointsInitialValuesInterface = {
    value_spent: "",
    token: session.user?.token!,
  };

  const handleRegistrationPoint = async (values: RegisterPointsInitialValuesInterface) => {
    const formattedValues: RegisterPointsInitialValuesInterface = {
      ...values,
    };

    const res = await onRegistrationPoint(formattedValues);

    if (isEmpty(res)) {
      return toast.error("Erro ao solicitar pontos!", {
        style: {
          minWidth: "250px",
        },
      });
    }

    if (res.success === false) {
      return toast.error(`${res.message}`, {
        style: {
          minWidth: "250px",
        },
      });
    }

    toast.success(`Solicitação de valor R$ ${values.value_spent} enviado!`, {
      duration: 5000,
      icon: <BsFillCheckCircleFill className="text-ternary-800 w-10 h-10" />,
      style: {
        minWidth: "250px",
      },
    });

    if (hasSession) {
      navigate.push("/p/dashboard");
    } else {
      navigate.push("/");
    }
  };

  if (session?.user?.role === "ADMIN") {
    return (
      <Fragment>
        <Header variant={hasSession ? "with" : "without"} className="bg-ternary-900" />
        <Container className="justify-center items-center h-screen px-[10%] lg:p-0">
          <img src="/mascote_sem_fundo.png" alt="Logo fofão" className="mt-6 w-[50%] lg:w-[200px] animate-bounce" />
          <Button variant="link" hasType={false} href="/p/a/registration-points-req" className="max-w-md text-fontsColor-100">
            Ver solicitações
          </Button>
        </Container>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <Header variant={hasSession ? "with" : "without"} className="bg-ternary-900" />
      <Container>
        <section className={twMerge("flex justify-center flex-col w-full items-center gap-5", hasSession && "mt-8")}>
          <img src="/logo_vermelho.jpg" alt="Logo fofão" className="w-[50%] lg:w-[200px] rounded-[50%] shadow-3xl" />
          <h1 className="text-2xl font-extrabold text-fontsColor-800">Cadastre seus Pontos</h1>
        </section>

        <section className="flex items-center w-full px-[10%] lg:px-[20%]">
          <Formik
            initialValues={initialValues}
            onSubmit={(values) => handleRegistrationPoint(values)}
            validationSchema={PointsRegistrationSchema}
            validateOnBlur={true}
            validateOnChange={false}
          >
            {({ errors, touched, values, handleBlur, setFieldValue, isSubmitting }) => (
              <Form className="w-full">
                <Textfield
                  id="value_spent"
                  prefix="R$"
                  message={errors.value_spent}
                  placeholder="Valor gasto na loja"
                  label="Digite o valor"
                  value={values.value_spent}
                  onChange={(e) => setFieldValue("value_spent", formatCurrencyInput(e))}
                  onBlur={handleBlur("value_spent")}
                  isInvalid={!!errors.value_spent && touched.value_spent}
                />

                <div className="flex flex-col gap-4 divide-y-2 divide-ternary-400">
                  <Button variant="button" className="bg-ternary-800 text-fontsColor-200" isLoading={isSubmitting}>
                    Cadastrar meus pontos
                  </Button>
                  {!hasSession && (
                    <div className="pt-4 flex">
                      <Button variant="link" href="/" className="bg-gray-500 text-fontsColor-200">
                        Fazer login
                      </Button>
                    </div>
                  )}
                </div>
              </Form>
            )}
          </Formik>
        </section>
      </Container>
    </Fragment>
  );
};
