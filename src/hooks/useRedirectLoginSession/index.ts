"use client";
import { isEmpty } from "lodash";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useCallback, useEffect } from "react";

export const useRedirectLoginSession = () => {
  const session = useSession();
  const router = useRouter();

  const handleRedirectPage = useCallback(() => {
    const { data } = session;
    if (!isEmpty(data)) {
      if (data?.user.role === "CUSTOMER") {
        return router.push("/p/gotched-points");
      }

      return router.push("/p/a/registration-points-req");
    }
  }, [router, session]);

  useEffect(() => {
    handleRedirectPage();
  }, [handleRedirectPage]);
};
