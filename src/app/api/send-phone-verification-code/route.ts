import { NextResponse } from "next/server";

import { getEndpointBaseUrlAPIS } from "@/helpers";
import { ErrorResponseEndpointInterface, SendPhoneVerificationCodeRequestInterface } from "@/types";

export async function POST(request: Request) {
  const data: SendPhoneVerificationCodeRequestInterface = await request.json();

  // add this to not send SMS (?devMode=true)

  const req = await fetch(`${getEndpointBaseUrlAPIS()}/user/send-phone-verification-code`, {
    method: "POST",
    headers: {
      "api-key": process.env.API_KEY,
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      phone_number: data.phone_number.replace(/\D/g, ""),
    }),
  });

  const res: ErrorResponseEndpointInterface = await req.json();

  if (res.success === false) {
    throw new Error("Error");
  }

  return NextResponse.json([]);
}
