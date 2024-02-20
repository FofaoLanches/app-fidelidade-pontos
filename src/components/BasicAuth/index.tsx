"use client";

import { Fragment, useCallback, useEffect, useState } from "react";

import { BasicAuthInterface } from "@/types";

export const BasicAuth = ({ clientBaseUrl, children }: BasicAuthInterface) => {
  const [authenticated, setAuthenticated] = useState(false);

  const getCorrectPassword = useCallback(async () => {
    try {
      const request = await fetch(`${clientBaseUrl}/api/basic-auth`, {
        method: "GET",
      });

      const response = await request.json();

      return response.password;
    } catch (error) {
      return null;
    }
  }, [clientBaseUrl]);

  const handleBasicAuth = useCallback(async () => {
    if (typeof window !== "undefined") {
      const STORAGE_KEY = "basic-auth-password";

      const correctPassword = await getCorrectPassword();

      if (sessionStorage.getItem(STORAGE_KEY) === correctPassword) {
        setAuthenticated(true);
        return Promise.resolve();
      }

      const typedPassword = window.prompt("Digite a senha: ") ?? "";

      if (typedPassword !== correctPassword) {
        window.location.href = "/";
      } else {
        sessionStorage.setItem(STORAGE_KEY, typedPassword);
        setAuthenticated(true);
      }
    }
  }, [getCorrectPassword]);

  useEffect(() => {
    handleBasicAuth();
  }, [handleBasicAuth]);

  if (authenticated) {
    return <Fragment>{children}</Fragment>;
  }

  return <Fragment />;
};
