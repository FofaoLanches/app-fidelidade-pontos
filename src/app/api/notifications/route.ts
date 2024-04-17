
import { NextResponse } from "next/server";

import { getEndpointBaseUrlAPIS } from "@/helpers";

export async function GET() {
  const publicKey = process.env.WEB_PUSH_PUBLIC_KEY ?? "";
  
  return NextResponse.json({
    publicKey
  });
}

export async function POST(request: Request) {
    try {
        const data = await request.json();

        const req = await fetch(`${getEndpointBaseUrlAPIS()}/notifications/push/register`, {
            method: "POST",
            headers: {
                "api-key": process.env.API_KEY,
                "Content-type": "application/json",
            },
            body: JSON.stringify(data),
      });

      const res = await req.json();
    
      return NextResponse.json(res);
    } catch(error) {
        return NextResponse.json(error);
    }
}