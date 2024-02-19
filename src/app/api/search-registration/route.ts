import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { getEndpointBaseUrlAPIS } from "@/helpers";
import { ErrorResponseEndpointInterface } from "@/types";

export async function GET(request: Request) {
  const token = headers().get("authorization");

  const { searchParams } = new URL(request.url);
  const phone_number = searchParams.get("phone_number");

  const req = await fetch(`${getEndpointBaseUrlAPIS()}/admin/registration-points-requests/search?phone_number=${phone_number}`, {
    method: "GET",
    headers: {
      "api-key": process.env.API_KEY,
      Authorization: `Bearer ${token}`,
    },
  });

  const res: ErrorResponseEndpointInterface = await req.json();

  return NextResponse.json(res);
}
