import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { getEndpointBaseUrlAPIS } from "@/helpers";
import { ErrorResponseEndpointInterface } from "@/types";

export async function GET(request: Request) {
  const token = headers().get("authorization");

  const { searchParams } = new URL(request.url);
  const customer_id = searchParams.get("customer_id");

  const req = await fetch(`${getEndpointBaseUrlAPIS()}/customer/${customer_id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const res: ErrorResponseEndpointInterface = await req.json();

  return NextResponse.json(res);
}
