import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { getEndpointBaseUrlAPIS } from "@/helpers";

export async function GET() {
  const token = headers().get("authorization");

  const req = await fetch(`${getEndpointBaseUrlAPIS()}/admin/whatsapp/connection-info`, {
    cache: "no-store",
    method: "GET",
    headers: {
      "api-key": process.env.API_KEY,
      Authorization: `Bearer ${token}`,
    },
  });

  const res = await req.json();
  console.log("🚀 ~ GET ~ res:", res);

  return NextResponse.json(res);
}
