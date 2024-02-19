import React from "react";

import { getEndpointBaseUrlAPIS } from "@/helpers";
import { useServerSession } from "@/hooks";
import { EditProductIdPageInterface, GetProductsInterface } from "@/types";

import { ClientPage } from "./clientPage";

export default async function Page(props: EditProductIdPageInterface) {
  const { searchParams } = props;
  const session = await useServerSession();

  const req = await fetch(`${getEndpointBaseUrlAPIS()}/products/${searchParams.productId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${session.user?.token}`,
    },
  });

  const res: GetProductsInterface = await req.json();

  return <ClientPage product={res} token={session.user?.token} />;
}
