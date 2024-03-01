"use client";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import React, { useCallback, useEffect, useState } from "react";

import { LoadingPage } from "@/components";
import { GetProductsInterface } from "@/types";

import { ClientPage } from "./clientPage";

export default function Page() {
  const searchParams = useSearchParams();
  const productId = searchParams.get("productId");
  const session = useSession();
  const [product, setProduct] = useState<GetProductsInterface>();

  const getProduct = useCallback(async () => {
    if (session.data?.user.token && productId) {
      const req = await fetch(`/api/product?productId=${productId}`, {
        method: "GET",
        headers: {
          Authorization: `${session.data?.user.token}`,
        },
      });

      const res: GetProductsInterface = await req.json();
      setProduct(res);
    }
  }, [productId, session.data?.user.token]);

  useEffect(() => {
    getProduct();
  }, [getProduct]);

  if (!product && !session.data?.user.token) return <LoadingPage />;

  return <ClientPage product={product} token={session.data?.user.token} />;
}
