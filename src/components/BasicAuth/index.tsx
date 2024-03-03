"use client";

import { Fragment, useCallback, useEffect, useState } from "react";

import { BasicAuthInterface, ResponseGetMaintenanceStatusInterface } from "@/types";

const STORAGE_KEY = "basic-auth-password";

export const BasicAuth = ({ clientBaseUrl, children }: BasicAuthInterface) => {
  const [authenticated, setAuthenticated] = useState(false);

  const verifyMaintenanceStatus = useCallback(async () => {
    try {
      const request = await fetch(`${clientBaseUrl}/api/maintenance`, {
        method: "GET",
      });

      const response: ResponseGetMaintenanceStatusInterface = await request.json();

      return response.enabled;
    } catch (error) {
      return false;
    }
  }, [clientBaseUrl]);

  const getCorrectPassword = useCallback(async () => {
    try {
      const request = await fetch(`${clientBaseUrl}/api/basic-auth`, {
        method: "GET",
        cache: "no-store",
      });

      const response = await request.json();

      return response.password;
    } catch (error) {
      return null;
    }
  }, [clientBaseUrl]);

  const handleBasicAuth = useCallback(async () => {
    const [isMaintenanceEnabled, correctPassword] = await Promise.all([verifyMaintenanceStatus(), getCorrectPassword()]);

    if (isMaintenanceEnabled) {
      const previousPassword = window.localStorage.getItem(STORAGE_KEY);

      if (previousPassword === correctPassword) {
        setAuthenticated(true);
        return Promise.resolve();
      }

      let typedPassword = null;

      while (typedPassword !== correctPassword) {
        typedPassword = window.prompt("Estamos em manutenção, digite a senha: ") ?? "";
      }

      window.localStorage.setItem(STORAGE_KEY, correctPassword);
      setAuthenticated(true);
    } else {
      sessionStorage.removeItem(STORAGE_KEY);
      setAuthenticated(true);
    }
  }, [getCorrectPassword, verifyMaintenanceStatus]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      handleBasicAuth();
    }
  }, [handleBasicAuth]);

  if (!authenticated && process.env.NODE_ENV === "production") {
    return <Fragment />;
  }

  return <Fragment>{children}</Fragment>;
};
