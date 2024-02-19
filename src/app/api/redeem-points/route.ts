import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { getEndpointBaseUrlAPIS } from "@/helpers";
import { ErrorResponseEndpointInterface } from "@/types";

export async function GET() {
  const token = headers().get("authorization");

  const req = await fetch(`${getEndpointBaseUrlAPIS()}/admin/redeem-points`, {
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

export async function POST(request: NextRequest) {
  const data = await request.json();

  const req = await fetch(`${getEndpointBaseUrlAPIS()}/customer/redeem-points/products`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${data.token}`,
      "Content-type": "application/json",
    },
    body: JSON.stringify({ product_ids: data.value }),
  });

  const res: ErrorResponseEndpointInterface = await req.json();

  if (res.success === false) {
    throw new Error("Error");
  }

  return NextResponse.json({ success: true });
}

export async function PUT(request: NextRequest) {
  const data = await request.json();

  const req = await fetch(`${getEndpointBaseUrlAPIS()}/admin/redeem-points/${data.requestId}/cancel`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${data.token}`,
      "Content-type": "application/json",
    },
  });

  const res: ErrorResponseEndpointInterface = await req.json();

  if (res.success === false) {
    throw new Error("Error");
  }

  return NextResponse.json({ success: true });
}

export async function DELETE(request: Request) {
  const data = await request.json();

  const req = await fetch(`${getEndpointBaseUrlAPIS()}/admin/redeem-points/${data.requestId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${data.token}`,
      "Content-type": "application/json",
    },
  });
  if (req.status !== 204) {
    return Promise.reject();
  }

  return NextResponse.json({ success: true });
}
