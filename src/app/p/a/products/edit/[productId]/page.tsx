"use client";
import { isEmpty } from "lodash";
import { useSession } from "next-auth/react";
import React, { useCallback, useEffect, useState } from "react";

import { EditProductIdPageInterface, GetProductsInterface } from "@/types";

import { ClientPage } from "./clientPage";

export default function Page(props: EditProductIdPageInterface) {
  const { searchParams } = props;
  const [product, setProduct] = useState({} as GetProductsInterface);
  const session = useSession();

  const teste = useCallback(async () => {
    if (session.data?.user.token) {
      const req = await fetch(`https://api-fidelidade-pontos.vercel.app/api/products/${searchParams.productId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${session.data?.user.token}`,
        },
      });

      const res: GetProductsInterface = await req.json();
      setProduct(res);
    }
  }, [session]);

  useEffect(() => {
    teste();
  }, []);

  if (isEmpty(product)) return <></>;

  return <ClientPage product={product} token={session.data?.user.token} />;
}
