import { NextRequest, NextResponse } from "next/server";

import { getEndpointBaseUrlAPIS } from "@/helpers";

export async function POST(request: NextRequest) {
  const data = await request.json();

  const req = await fetch(`${getEndpointBaseUrlAPIS()}/user`, {
    method: "POST",
    headers: {
      "api-key": process.env.API_KEY,
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      full_name: data.full_name,
      email: data.email,
      password: data.password,
      phone_number: data.phone_number.replace(/\D/g, ""),
      customer_accepted_terms: data.terms[0],
      verification_code: data.verification_code,
      role: "CUSTOMER",
    }),
  });

  const res = await req.json();

  return NextResponse.json(res);
}
