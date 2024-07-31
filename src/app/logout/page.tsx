"use client";

import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { useEffect } from "react";

export default function LogoutPage() {
  const navigate = useRouter();

  useEffect(() => {
    (async () => {
      await signOut();
      navigate.push("/");
    })();
  }, [navigate]);

  return <></>;
}
