import { NextResponse } from "next/server";

import { getEndpointBaseUrlAPIS } from "@/helpers";
import { ErrorResponseEndpointInterface } from "@/types";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const period = searchParams.get("period");

  const req = await fetch(`${getEndpointBaseUrlAPIS()}/ranking-customers-points?period=${period}&minimumTargetCount=30`, {
    method: "GET",
    headers: {
      "api-key": process.env.API_KEY,
    },
  });

  const res: ErrorResponseEndpointInterface = await req.json();

  return NextResponse.json(res);
}
