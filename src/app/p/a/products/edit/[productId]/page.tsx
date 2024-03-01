import React from "react";

import { LoadingPage } from "@/components";
import { getEndpointBaseUrlClient } from "@/helpers";
import { useServerSession } from "@/hooks";
import { EditProductIdPageInterface, GetProductsInterface } from "@/types";

import { ClientPage } from "./clientPage";

export default async function Page(props: EditProductIdPageInterface) {
  const {
    searchParams: { productId },
  } = props;
  const session = await useServerSession();

  if (session.user?.token && productId) {
    const req = await fetch(`${getEndpointBaseUrlClient()}/products/${productId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session.user?.token}`,
      },
    });

    const res: GetProductsInterface = await req.json();

    return <ClientPage product={res} token={session.user?.token} />;
  }

  return <LoadingPage />;
}
