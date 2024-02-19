import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { getEndpointBaseUrlAPIS } from "@/helpers";
import { ErrorResponseEndpointInterface } from "@/types";

export async function GET() {
  const token = headers().get("authorization");

  const req = await fetch(`${getEndpointBaseUrlAPIS()}/products`, {
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
  const data = await request.formData();
  const token = headers().get("authorization");

  const req = await fetch(`${getEndpointBaseUrlAPIS()}/admin/products`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: data,
  });

  const res: ErrorResponseEndpointInterface = await req.json();

  if (res.success === false) {
    throw new Error("Error");
  }

  return NextResponse.json({ success: true });
}

export async function PUT(request: Request) {
  const data = await request.formData();
  const token = headers().get("authorization");

  const requestId = data.get("id");

  const req = await fetch(`${getEndpointBaseUrlAPIS()}/admin/products/${requestId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: data,
  });

  const res: ErrorResponseEndpointInterface = await req.json();

  if (res.success === false) {
    throw new Error("Error");
  }

  return NextResponse.json({ success: true });
}

export async function DELETE(request: Request) {
  const data = await request.json();

  const req = await fetch(`${getEndpointBaseUrlAPIS()}/admin/products/${data.requestId}`, {
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
