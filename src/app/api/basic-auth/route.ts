import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    password: process.env.BASIC_AUTH_PASSWORD,
  });
}
