import { NextResponse } from "next/server";

import { getEndpointBaseUrlAPIS } from "@/helpers";
import { ResponseGetMaintenanceStatusInterface } from "@/types";

export async function GET() {
  const req = await fetch(`${getEndpointBaseUrlAPIS()}/maintenance`, {
    method: "GET",
    headers: {
      "api-key": process.env.API_KEY,
    },
    cache: "no-store",
  });

  const res: ResponseGetMaintenanceStatusInterface = await req.json();

  if (req.status !== 200) {
    return NextResponse.json({ enabled: false });
  }

  return NextResponse.json(res);
}
