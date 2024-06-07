"use server";
import { cookies } from "next/headers";

export async function hasCookie(value: string) {
  const cookie = cookies().has(value);

  return cookie;
}
export async function delCookie(value: string) {
  const cookie = cookies().delete(value);

  return cookie;
}
