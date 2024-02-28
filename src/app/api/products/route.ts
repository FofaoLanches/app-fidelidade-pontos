import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { contentTypeImage } from "@/constants";
import { getEndpointBaseUrlAPIS } from "@/helpers";
import { ErrorResponseEndpointInterface, ReqProductWithUploadFieldInterface } from "@/types";

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

  const parsedData = Object.fromEntries(data);
  // eslint-disable-next-line no-unused-vars
  const { image, ...rest } = parsedData;
  const auxImage = image as File;

  const reqProduct = await fetch(`${getEndpointBaseUrlAPIS()}/admin/products`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    },
    body: JSON.stringify({ ...rest, ...(image && { file_type: auxImage.type }) }),
  });

  const resProduct: ReqProductWithUploadFieldInterface = await reqProduct.json();

  if (resProduct.data.image_upload_url) {
    await fetch(`${resProduct.data.image_upload_url}`, {
      method: "PUT",
      headers: {
        "Content-type": auxImage.type,
      },
      body: image,
    });
  }

  if (resProduct.success === false) {
    throw new Error("Error");
  }

  return NextResponse.json({ success: true });
}

export async function PUT(request: Request) {
  const data = await request.formData();
  const token = headers().get("authorization");
  const requestId = data.get("id");

  const parsedData = Object.fromEntries(data);
  // eslint-disable-next-line no-unused-vars
  const { image, ...rest } = parsedData;
  const auxImage = image as File;
  const validPathUploadImageUrl = contentTypeImage.includes(auxImage.type);
  let res = {} as ReqProductWithUploadFieldInterface;

  if (validPathUploadImageUrl && image) {
    const req = await fetch(`${getEndpointBaseUrlAPIS()}/admin/products/${requestId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify({ ...rest, file_type: auxImage.type }),
    });

    res = await req.json();

    await fetch(`${res.data.image_upload_url}`, {
      method: "PUT",
      headers: {
        "Content-type": auxImage.type,
      },
      body: image,
    });
  } else {
    const req = await fetch(`${getEndpointBaseUrlAPIS()}/admin/products/${requestId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify({ ...rest }),
    });

    res = await req.json();
  }

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
