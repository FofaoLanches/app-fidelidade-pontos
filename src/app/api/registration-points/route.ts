import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { getEndpointBaseUrlAPIS } from "@/helpers";
import { ErrorResponseEndpointInterface } from "@/types";

export async function GET() {
  const token = headers().get("authorization");

  const req = await fetch(`${getEndpointBaseUrlAPIS()}/admin/registration-points-requests`, {
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

export async function POST(request: Request) {
  const data = await request.json();
  const token = headers().get("authorization");

  const req = await fetch(`${getEndpointBaseUrlAPIS()}/customer/registration-points-requests`, {
    method: "POST",
    headers: {
      "api-key": process.env.API_KEY,
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      value_spent: Number(data.value_spent.replace(",", ".")),
    }),
  });

  const res: ErrorResponseEndpointInterface = await req.json();

  if (req.status === 500) {
    throw new Error("Error");
  }

  return NextResponse.json(res);
}

export async function PUT(request: Request) {
  const data = await request.json();

  const req = await fetch(`${getEndpointBaseUrlAPIS()}/admin/registration-points-requests/${data.requestId}/update-approval`, {
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

  const req = await fetch(`${getEndpointBaseUrlAPIS()}/admin/registration-points-requests/${data.requestId}`, {
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
