import { signIn } from "next-auth/react";

import { LoginInitialValuesInterface } from "@/types";

export function useLogin() {
  const onLogin = async (values: LoginInitialValuesInterface) => {
    const { email, password } = values;

    const res = await signIn<"credentials">("credentials", {
      email: email.toLowerCase().trim(),
      password: password.trim(),
      redirect: false,
      callbackUrl: `${window.location.origin}`,
    });

    return res;
  };

  return {
    onLogin,
  };
}
