import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { getEndpointBaseUrlAPIS } from "@/helpers";
import { ErrorResponseEndpointInterface } from "@/types";

export async function GET(request: Request) {
  const token = headers().get("authorization");
  const { searchParams } = new URL(request.url);
  const productId = searchParams.get("productId");

  const req = await fetch(`${getEndpointBaseUrlAPIS()}/products/${productId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const res: ErrorResponseEndpointInterface = await req.json();

  if (req.status !== 200) {
    throw new Error("Error");
  }

  return NextResponse.json(res);
}
